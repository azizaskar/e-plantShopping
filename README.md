# e-plantShopping — Paradise Nursery Shopping Application

Paradise Nursery is a responsive React + Redux Toolkit shopping cart application for an online houseplant shop, built for the IBM / Coursera *Developing Front-End Apps with React* final project.

## Features

- A welcoming landing page with a background image, company name, description, and **Get Started** button.
- 18 unique plants grouped into **three categories**, six plants per category.
- Every plant has a thumbnail, name, description, price, and **Add to Cart** button.
- Adding an item disables that plant's button and updates the navigation cart quantity in real time.
- A shared navigation bar with **Home**, **Plants**, and **Cart** on both product and cart pages.
- Shopping cart with per-item unit price, adjustable quantity, delete button, line total, item count, and overall total amount.
- **Checkout** displays a **Coming Soon!** message; **Continue shopping** returns to the products page.

## Technology

React, Redux Toolkit, React Redux, Vite, JavaScript (JSX), CSS, SVG.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`.

## Main assignment files

| Task | File | Purpose |
| --- | --- | --- |
| 1 | `README.md` | Project name and description |
| 2 | `src/AboutUs.jsx` | Company details |
| 3 | `src/App.css` | Landing background image and styling |
| 4 | `src/App.jsx` | Paradise Nursery landing page and Get Started button |
| 5 | `src/CartSlice.jsx` | `addItem`, `removeItem`, `updateQuantity` reducers |
| 6 | `src/ProductList.jsx` | 18 products, three categories, disabled Add to Cart, shared navbar |
| 7 | `src/CartItem.jsx` | Shopping cart calculations and controls |

## How to submit on Coursera

Create a **public** GitHub repository named exactly **`e-plantShopping`** under your own account and push these files. For each question, open the matching file on GitHub and copy its **file-page URL** (`https://github.com/YOUR_USERNAME/YOUR_REPOSITORY/blob/main/...`). Do not submit the repository homepage or a link to another person's project.

## Test checklist

1. Open the site and verify the background image, company information, and Get Started button.
2. Click Get Started and check all 18 products under their three categories.
3. Add two plants, confirm that their Add to Cart buttons disable and the cart badge reads **2**.
4. Go to Cart and increase one plant's quantity. Confirm the badge, line total, and order total change.
5. Decrease quantity, remove an item, and check totals update again.
6. Click Continue shopping and verify navigation to Plants.
7. Click Checkout (with items in the cart) and verify the Coming Soon message.
8. Navigate Home, Plants, and Cart with the shared navigation bar.

This project contains locally generated plant illustration SVGs in `public/images/plants/`, so thumbnails do not depend on a third-party image service.
