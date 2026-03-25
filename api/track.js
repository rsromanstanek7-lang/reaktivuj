const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function redisIncr(key) {
  const url = `${process.env.UPSTASH_REDIS_URL}/incr/${encodeURIComponent(key)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_TOKEN}` },
  });
  return res.json();
}

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).set(CORS_HEADERS).end();
  }

  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { event, variant, headline } = req.body || {};

    if (!event || !variant) {
      return res.status(400).json({ error: 'Missing event or variant' });
    }

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    // Increment global variant counter
    const globalKey = `rk:v:${variant}:${event}`;
    // Increment daily counter
    const dailyKey = `rk:daily:${today}:${variant}:${event}`;

    await Promise.all([
      redisIncr(globalKey),
      redisIncr(dailyKey),
    ]);

    // Store headline for this variant (only once per variant, use SET NX)
    if (headline && variant !== 'direct') {
      const headlineKey = `rk:headline:${variant}`;
      const setUrl = `${process.env.UPSTASH_REDIS_URL}/set/${encodeURIComponent(headlineKey)}/${encodeURIComponent(headline)}/nx`;
      await fetch(setUrl, {
        headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_TOKEN}` },
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
