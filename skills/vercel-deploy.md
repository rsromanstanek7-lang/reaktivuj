# Vercel Deploy — Static Sites

## Kategorie: Tech / Deploy

Workflow pro nasazení statických HTML stránek na Vercel s vlastní doménou.

---

## Základní nasazení
```bash
cd /cesta/k/projektu
vercel --prod
```
Pokud projekt neexistuje, Vercel se zeptá na název. Pokud existuje, automaticky se napojí.

## Napojení na existující projekt
```bash
vercel link --project nazev-projektu --yes
```

## Nasazení s konkrétním názvem
```bash
vercel --prod --name nazev-projektu
# (--name je deprecated, ale stále funguje)
```

---

## Domény a subdomény

### Zjistit stav domény
```bash
vercel domains inspect domena.cz
vercel domains ls
vercel alias ls
```

### Přidat doménu na projekt
```bash
cd /cesta/k/projektu  # musí být linked na správný projekt
vercel domains add subdomena.domena.cz
```

### Přesunout doménu z jiného projektu
```bash
# 1. Přejít do starého projektu
mkdir /tmp/temp && cd /tmp/temp
vercel link --project stary-projekt --yes
vercel domains rm domena.cz --yes

# 2. Přejít do nového projektu
cd /cesta/k/novemu-projektu
vercel domains add domena.cz
```

### Manuálně nastavit alias (nejspolehlivější)
```bash
vercel alias set [deployment-url] subdomena.domena.cz
```
⚠️ `vercel domains add` nestačí — je potřeba i `vercel alias set` na konkrétní deployment.

---

## DNS nastavení (Websupport / třetí strana)
Vercel používá nameservery třetí strany → přidat A záznamy ručně:

| Typ | Název | Hodnota | TTL |
|-----|-------|---------|-----|
| A | @ | 76.76.21.21 | 600 |
| A | subdomena | 76.76.21.21 | 600 |

⚠️ TTL vždy 600 (ne 3600) pro rychlejší propagaci.

---

## Routing (vercel.json)
Pro host-based routing (různé subdomény → různé soubory) je nejspolehlivější **oddělený projekt**.

Host-based rewrite (`has: host`) nefunguje spolehlivě pro root `/`.

### Doporučený přístup pro více subdomén:
```
projekt-A/  → reaktivuj.cz (landing page)
projekt-B/  → kalkulator.reaktivuj.cz (kalkulačka)
```

Každý projekt = samostatný Vercel projekt s vlastním aliasem.

---

## Časté problémy

| Problém | Příčina | Řešení |
|---------|---------|--------|
| 404 DEPLOYMENT_NOT_FOUND | Domain přidána ale alias chybí | `vercel alias set [url] domena.cz` |
| Cannot add domain — alias conflict | Doména je na jiném projektu | Přesunout přes temp dir |
| Subdoména přesměrovává na root | Host rewrite nefunguje | Oddělený projekt |
| SSL chyba | Certifikát ještě nebyl vygenerován | Počkat nebo znovu spustit alias |

---

## Existující projekty (Roman Staněk)
| Projekt | Doména | Obsah |
|---------|--------|-------|
| reaktivuj | reaktivuj.cz | Landing page + popup |
| kalkulator-reaktivuj | kalkulator.reaktivuj.cz | Kalkulačka |
| dashboard-vercel | dashboard.reaktivuj.cz | Interní dashboard |
