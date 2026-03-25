const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const VARIANTS = ['1', '2'];
const EVENTS = ['pageview', 'modal_open', 'email_capture', 'booking', 'scroll_50', 'scroll_75', 'scroll_100', 'time_30s', 'time_60s', 'time_120s'];

async function redisMGet(keys) {
  if (!keys.length) return [];
  // Upstash REST MGET: /mget/key1/key2/...
  const parts = keys.map(encodeURIComponent).join('/');
  const url = `${process.env.UPSTASH_REDIS_URL}/mget/${parts}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_TOKEN}` },
  });
  const json = await res.json();
  // Returns { result: [val1, val2, ...] }
  return json.result || [];
}

async function redisGet(key) {
  const url = `${process.env.UPSTASH_REDIS_URL}/get/${encodeURIComponent(key)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_TOKEN}` },
  });
  const json = await res.json();
  return json.result || null;
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).set(CORS_HEADERS).end();
  }

  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

  try {
    // Build all keys we need
    const statKeys = [];
    for (const variant of VARIANTS) {
      for (const event of EVENTS) {
        statKeys.push(`rk:v:${variant}:${event}`);
      }
    }

    // Headline keys (only numeric variants)
    const headlineKeys = ['1', '2'].map(v => `rk:headline:${v}`);
    // Kalkulator tracking keys (stored as variant 'kalkulator')
    const kalkulatorKeys = ['pageview', 'email_capture', 'booking'].map(e => `rk:v:kalkulator:${e}`);

    // Fetch all in parallel
    const [statValues, headlineValues, kalkulatorValues] = await Promise.all([
      redisMGet(statKeys),
      redisMGet(headlineKeys),
      redisMGet(kalkulatorKeys),
    ]);

    // Parse results into structured data
    const variants = {};
    let keyIndex = 0;

    for (const variant of VARIANTS) {
      const obj = {};
      for (const event of EVENTS) {
        const raw = statValues[keyIndex++];
        obj[event] = raw ? parseInt(raw, 10) : 0;
      }
      const pageviews = obj.pageview || 0;
      const bookings = obj.booking || 0;
      obj.conversion_rate = pageviews > 0
        ? parseFloat(((bookings / pageviews) * 100).toFixed(2))
        : 0;
      variants[variant] = obj;
    }

    // Headlines
    const headlines = {};
    ['1', '2'].forEach((v, i) => {
      headlines[v] = headlineValues[i] || null;
    });

    // Totals
    const total = {
      pageview: VARIANTS.reduce((s, v) => s + (variants[v].pageview || 0), 0),
      booking: VARIANTS.reduce((s, v) => s + (variants[v].booking || 0), 0),
      email_capture: VARIANTS.reduce((s, v) => s + (variants[v].email_capture || 0), 0),
    };

    // Find best converting variant — tiebreak by pageviews if CR is equal
    let bestVariant = null;
    let bestRate = -1;
    let bestPageviews = -1;
    for (const v of ['1', '2']) {
      const cr = variants[v].conversion_rate;
      const pv = variants[v].pageview || 0;
      if (pv === 0) continue;
      if (cr > bestRate || (cr === bestRate && pv > bestPageviews)) {
        bestRate = cr;
        bestPageviews = pv;
        bestVariant = v;
      }
    }
    // No winner if no bookings at all (can't determine real winner)
    if (bestRate === 0 && total.booking === 0) bestVariant = null;

    // Kalkulator stats
    const kalkulator = {
      pageview: kalkulatorValues[0] ? parseInt(kalkulatorValues[0], 10) : 0,
      email_capture: kalkulatorValues[1] ? parseInt(kalkulatorValues[1], 10) : 0,
      booking: kalkulatorValues[2] ? parseInt(kalkulatorValues[2], 10) : 0,
    };

    return res.status(200).json({
      ok: true,
      variants,
      total,
      headlines,
      bestVariant,
      kalkulator,
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
