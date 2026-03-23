# Klient — reaktivuj.cz

## Kategorie: Klienti

Vše o projektu reaktivuj.cz — emailingová agentura Romana Staňka.

---

## O byznysu
- **Název:** reaktivuj.cz
- **Zakladatel:** Roman Staněk
- **Služba:** Email marketing pro e-shopy a online kouče / tvůrce kurzů
- **Model:** Agentura — klienti platí retainer za správu emailingu
- **USP:** "Do 72 hodin přivedeme zpět zákazníky, kteří přestali nakupovat. Jinak nic neplatíte."

## Cílová skupina (avatar)
1. **E-shop:** 2–30M Kč/rok, má Ecomail/SmartEmailing, neposílá nebo posílá špatně
2. **Kouč / tvůrce kurzů / konzultant:** má odběratele, neposílá sekvence
- Minimum: 1 500 kontaktů v databázi
- Strach: spam, obtěžování, neví co psát, "nechci být ten co spamuje"

---

## Klíčová čísla (pro ads, VSL, copy)
- 49 700 aktivních e-shopů v ČR
- 43–51 % e-shopů má databázi ale neposílá nic
- 1 kontakt = 25 Kč/měsíc (realistický benchmark, teplá databáze)
- Konzervativní: 20 Kč/kontakt | Optimistický: 38 Kč/kontakt
- ROI emailového marketingu v retailu: 42 Kč za každou 1 Kč
- Opakující se zákazník je 6–7× levnější než nový

## Case studies (české, reálné)
- **JB Sport** — sportovní e-shop, 3 měsíce: **4 349 % ROI**
- **SEVT** — papírnictví, 5 měsíců: **+176 % email revenue**
- **Grizly.cz** — email tvoří **15 % celého obratu** e-shopu

---

## Technický stack
- ESP klientů: Ecomail, SmartEmailing
- MailerLite: vlastní seznam reaktivuj.cz
  - Group "Reaktivuj": ID `182614679389996933`
  - API Key: uložen v kalkulator.html (JWT token)
- Calendly: pro booking hovorů (`calendly.com/reaktivuj/45min`)

## Vercel projekty
| Projekt | URL | Popis |
|---------|-----|-------|
| reaktivuj | reaktivuj.cz | Landing page + popup z kalkulačky |
| kalkulator-reaktivuj | kalkulator.reaktivuj.cz | Lead kalkulačka |
| dashboard-vercel | dashboard.reaktivuj.cz | Interní dashboard |

## Soubory (lokální)
```
/Users/romanstanek/Youtube emails/
├── index.html              # Landing page reaktivuj.cz
├── kalkulator.html         # Kalkulačka (zdrojový soubor)
├── styles.css
├── script.js
├── vsl_reaktivuj_v2.md     # VSL skript v2 (finální)
├── vsl_reaktivuj.md        # VSL skript v1
└── skills/
    ├── vsl-framework.md
    ├── calculator-funnel.md
    ├── vercel-deploy.md
    └── reaktivuj-client.md

/Users/romanstanek/kalkulator-reaktivuj/
└── index.html              # Deploy copy kalkulačky
```

---

## Funnel (aktuální)
```
Meta reklama (static image)
   ↓
kalkulator.reaktivuj.cz
   ↓ (email → MailerLite skupina "Reaktivuj")
reaktivuj.cz + popup s výsledkem
   ↓
VSL video
   ↓
CTA → Bezplatná analýza (Calendly)
```

## Ad hooks (testovat v tomto pořadí)
1. "Máš 2 000 kontaktů? Přicházíš o 40 000–76 000 Kč měsíčně." (loss)
2. "Posíláš emaily své databázi? Pokud ne — někdo jiný vydělává peníze, které jsou tvoje." (otázka)
3. "JB Sport vydělal z emailů 4 349 % ROI." (social proof — retargeting)

---

## Služba reaktivuj.cz — co dělají
1. Segmentace databáze (nedávní, jednorází, neaktivní)
2. Welcome sekvence pro nové odběratele
3. Post-purchase sekvence (nejlepší čas prodat znovu)
4. Reaktivační sekvence (neaktivní 6+ měsíců)
5. Pravidelné kampaně — segmentované, osobní, s příběhem
