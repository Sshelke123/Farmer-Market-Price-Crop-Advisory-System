# Farmer Sathi – शेतकरी साथी

Know the Price • Know Your Crop • Calculate Your Profit

A small college prototype website for Indian farmers (focus: rural Maharashtra).
Plain HTML, CSS and JavaScript. No frameworks, no build step. Works in Marathi and English.

## Files
index.html, style.css, script.js, sw.js, manifest.json, README.md

## How to run (local server needed)
The service worker and PWA features do not work when you open index.html by double-clicking. Use a local server.

Option 1 – Python (any OS):
    cd farmer-sathi
    python -m http.server 8000
Open http://localhost:8000 in Chrome or Edge.

Option 2 – Node.js:
    cd farmer-sathi
    npx serve .

Option 3 – VS Code: install "Live Server", right-click index.html, choose "Open with Live Server".

To test on an Android phone: connect it to the same Wi-Fi, run the server, open http://<your-computer-IP>:8000.
(Installing as an app on a phone needs HTTPS, which localhost provides only on the computer.)

## What works without any setup
- Marathi/English toggle across all sections (choice is saved)
- Village/city, state and crop selection (saved in localStorage)
- Mandi price table with crop and state filters, using DEMO sample data
  (always labelled "DEMO DATA — NOT LIVE PRICES")
- Profit/loss calculator: revenue, total expenses, net profit/loss, break-even price,
  target price for wanted profit (% over cost), with input validation
- Crop information for Onion, Tomato, Soybean, Cotton, Wheat, Maize
- Offline notice, and offline use of the calculator and crop info after the first visit
- Weather (Open-Meteo needs no key, but needs internet)

## What needs internet or configuration
| Feature | Needs |
|---|---|
| Live mandi prices | Free API key from https://data.gov.in, pasted into `CONFIG.API_KEY` in script.js. Without it, the "Get live prices" button explains this and demo data stays. |
| Weather | Internet only. No key. Shows an error message if offline or the API fails. No fake weather is ever shown. |
| Agmarknet / footer links | Internet |

Note: the data.gov.in resource ID and field names in script.js (`CONFIG.RESOURCE`, `min_price`, etc.) should be checked against the current API documentation before relying on them.

## Test checklist
1. Language: click the header button. All sections, buttons, placeholders, table headers and results change language.
2. Calculator: quantity 20, price 2000, expenses 5000+8000+10000+4000+2000+1000 = 30000.
   Expected: revenue 40,000; expenses 30,000; profit 10,000; break-even 1,500; target at 20% = 1,800.
   Try price 1000 to see a loss. Try empty or negative values to see validation messages.
3. Filters: change crop and state in Mandi Prices; rows change.
4. Responsive: use browser DevTools device mode (e.g. 360 px wide).
5. Offline: load the page once via the server, then in DevTools > Network choose "Offline" and reload.
   The offline notice appears; calculator, crop info and language switch still work.
6. Saved settings: save a place and crop, reload, values return.

## Notes and limits
- Prices are in ₹ per quintal. Sample numbers are invented for demonstration only.
- The state list has 10 major farming states to keep the prototype small.
- Crop advice is general. Ask a local agriculture officer or Krishi Vigyan Kendra (KVK) for your area.
- Marathi text was written for this prototype; have a native speaker proofread before real use.
- After changing any cached file, increase `CACHE` version in sw.js (e.g. farmer-sathi-v2).


## New features in this updated version
- Season-wise crop suggestions for Kharif, Rabi and Zaid seasons, filtered by soil and water availability.
- Header tabs open one section at a time as simple dynamic pages.
- English, Marathi and Hindi language toggle.
- Team page with Shruti Shelke, Vaishnavi Mohite, Janhavi Pawar and Vaishnavi Kekan.
- Service worker cache updated to version 2.
