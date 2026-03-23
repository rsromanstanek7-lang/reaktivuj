# Calculator Funnel — Lead Generation

## Kategorie: Funnel / Landing Page

Skill pro tvorbu "curiosity gate" kalkulačkového funnelu. Použito pro reaktivuj.cz (kalkulator.reaktivuj.cz → reaktivuj.cz).

---

## Psychologie funnelu
- **Loss aversion > gain seeking** — "přicházíš o X" funguje 2× lépe než "mohl bys vydělat X"
- **Curiosity gate** — email se sbírá AŽ po vyplnění kalkulačky (lidi chtějí vidět SVOJE číslo)
- **Personalizace** = důvěra (výsledek je jejich, ne generický)
- Produkt = marketing (jako free masáž 15 minut → 90 % zůstane na placenou)

---

## Flow (3 kroky)

```
Reklama
   ↓
Kalkulačka (3 pole)
   ↓ klik "Vyhodnotit"
Email gate ("Výsledky jsou připravené")
   ↓ zadají email → MailerLite API
Spinner 1,8s ("Vyhodnocujeme...")
   ↓ redirect s URL parametry
Landing page + Popup s jejich číslem
   ↓
CTA → video / hovor
```

---

## Kalkulačka — vstupy (max 3 pole)
1. Počet kontaktů v databázi
2. Typ byznysu (E-shop / Kouč & kurzy) — radio tlačítka
3. Průměrná objednávka / cena kurzu (Kč)

## Výpočet
```javascript
// 1 teplý kontakt = 20–25 Kč/měsíc (Klaviyo & Omnisend 2024)
const low  = contacts * 20;   // konzervativní
const mid  = contacts * 25;   // realistický
const high = contacts * 38;   // optimistický (plná automatizace)
const yearly = mid * 12;
```

**Průměrná objednávka** se zobrazuje v textu jako kontext, ale neovlivňuje výpočet.

---

## Email Gate — copy
```
Headline: "Výsledky jsou připravené 🎯"
Sub: "Zadej svůj email a zobrazíme ti přesný výpočet"

Co dostaneš:
✅ Konkrétní číslo tvého potenciálu (Kč/měsíc)
✅ Kde přicházíš nejvíc o peníze
✅ Co udělat jako první krok

Fine print: "Žádný spam — posíláme jen věci, které mají smysl."
```

---

## URL parametry (redirect na landing page)
```
?kontakty=1500&typ=coach&objednavka=600
&potencial_low=30000&potencial_mid=37500
&potencial_high=57000&rocni_ztrata=450000
```

---

## Popup na landing page
- Zobrazí se **jen** při příchodu z kalkulačky (detekuje `potencial_mid` v URL)
- Po zobrazení smaže URL parametry (`history.replaceState`)
- Obsah:
  - Velké číslo (mid): "Každý měsíc přicházíš o 37 500 Kč"
  - Rozsah: "30 000 – 57 000 Kč / měsíc"
  - Vzorec: "1 500 kontaktů × 25 Kč = 37 500 Kč/měsíc"
  - Roční ztráta: "Za rok to dělá 450 000 Kč"
- Tlačítka:
  - Oranžové → scrollne k videu + spustí play
  - Šedé → zavře popup

---

## MailerLite integrace
```javascript
// API endpoint
POST https://connect.mailerlite.com/api/subscribers

// Body
{
  email: "...",
  groups: ["GROUP_ID"],
  fields: {
    kontakty: "1500",
    biz_typ: "coach",
    avg_objednavka: "600",
    potencial_low: "30000"
  }
}
```

---

## Technický stack
- Pure HTML/JS — žádné frameworky
- MailerLite API (direct fetch z frontendu — pouze pro přidávání subskriberů)
- Vercel hosting
- Oddělený projekt pro kalkulačku (vlastní subdoména)

---

## Nasazení (Vercel)
- Kalkulačka = samostatný projekt (`kalkulator-reaktivuj`)
- Landing page = hlavní projekt (`reaktivuj`)
- Subdoména `kalkulator.reaktivuj.cz` → alias na kalkulator projekt
- DNS: A záznam `kalkulator` → `76.76.21.21` (Vercel IP)
- Po přidání domény: `vercel alias set [deployment-url] kalkulator.domena.cz`

---

## Ad copy hooks (Meta statics)
- "Máš 2 000 kontaktů? Přicházíš o 40 000–76 000 Kč měsíčně."
- "1 kontakt = 25 Kč/měsíc. Kolik máš kontaktů?"
- "Posíláš emaily své databázi? Pokud ne — někdo jiný vydělává peníze, které jsou tvoje."
- "Tvoje databáze umírá. Každý měsíc bez emailu = lidi zapomínají kdo jsi."
