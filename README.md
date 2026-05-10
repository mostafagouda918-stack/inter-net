# Digital Store 🛍️

## Project Structure
```
digital-store/
├── index.html        → Main store page
├── checkout.html     → Checkout page
├── CSS/style.css     → All styles
├── JS/
│   ├── products.js   → Product data
│   ├── cart.js       → Cart logic (localStorage)
│   ├── main.js       → Product rendering & filtering
│   └── checkout.js   → Checkout form & backend
├── Code.gs           → Google Apps Script backend
└── img/              → Add your images here
```

## Backend Setup (Google Sheets)

1. Create a new **Google Spreadsheet**
2. Go to **Extensions → Apps Script**
3. Paste the contents of `Code.gs`
4. Run `initialSetup()` once (authorise permissions)
5. Click **Deploy → New Deployment → Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the deployment URL
7. Paste it in `JS/checkout.js` replacing `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE`

## Features
- ✅ Product grid with category filtering & search
- ✅ Cart drawer with quantity controls (saved in localStorage)
- ✅ Checkout form with order summary
- ✅ Orders saved to Google Sheets automatically
- ✅ Responsive design (mobile-friendly)
