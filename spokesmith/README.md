# Spokesmith: Responsive Service Business Website

A responsive, single-page website for **Spokesmith**, a fictional mobile bike repair service. Built for Inovegen Internship, Task 3 (Web Development, Front-End).

## Description

Spokesmith sends a mechanic to the customer's location to fix their bike. The site explains what the business does, lists prices, tells its story, answers common questions and lets visitors send a booking request.

### Sections
1. **Home**: hero with headline, calls to action and an animated bike wheel
2. **Services**: four services with fixed prices and typical durations
3. **About**: the story behind the business and what the van carries
4. **FAQ**: accordion with four common questions
5. **Contact**: booking form with front-end validation

## Features

- Semantic HTML5: `header`, `nav`, `main`, `section`, `address`, `footer`, `dialog`
- Responsive layout with CSS Grid and Flexbox (desktop, tablet, mobile)
- Mobile menu with `aria-expanded`, closes on link click or `Esc`
- FAQ accordion, one item open at a time
- Contact form validation: required fields, email format, optional phone format, minimum message length, live character counter, inline error messages
- Success modal built on the native `<dialog>` element (no backend, form data is not sent anywhere)
- Active nav link updates as you scroll (`IntersectionObserver`)
- Accessibility: skip link, visible focus states, labelled inputs, `aria-live` errors, `prefers-reduced-motion` respected

## Technologies

- HTML5
- CSS3 (custom properties, Grid, Flexbox, media queries)
- Vanilla JavaScript (ES6)
- Google Fonts: Bricolage Grotesque and Atkinson Hyperlegible
- GitHub Pages for hosting

## Project structure

```
spokesmith/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Run locally

No build step. Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy on GitHub Pages

1. Create a new public repository named `spokesmith` and push these files to the `main` branch.
2. In the repository, go to **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose `main` and `/ (root)`, then **Save**.
4. After a minute, the site is live at `https://YOUR-USERNAME.github.io/spokesmith/`.

## Note

Spokesmith is a fictional business. The phone number, email address and prices are sample content.
