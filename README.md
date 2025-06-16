### 🛍️ Modern Product Dashboard

A clean, responsive, and interactive product catalog dashboard built with **Next.js 13+ (App Router)**, **Tailwind CSS**, **TypeScript**, and **React Query**. This project demonstrates strong frontend architecture, reusable components, responsive design, and modern state management practices.

> 👨‍💻 Developed by [Philemon Victor ](https://www.linkedin.com/in/engineer-philemon/)  
> 📫 Email: victorphilemon001@gmail.com | 🌐 GitHub: [PhilTech-Hub](https://github.com/PhilTech-Hub)

---

## 🚀 Features

- 🧩 Component-based design
- 🔍 Live search and filtering by category
- 🛒 Product cards with images, titles, prices, and ratings
- 📄 Dynamic product detail page using App Router
- 📡 Data fetching with React Query
- ⌛ Smooth loading states using skeleton loaders and spinners
- ❌ Error state handling
- 📱 Fully responsive and mobile-friendly design
- 🌘 Ready for dark mode integration (optional)

---

## ⚙️ Tech Stack

| Technology       | Purpose                                  |
|------------------|-------------------------------------------|
| Next.js 13+      | Routing, rendering, and file structure    |
| TypeScript       | Static typing and developer confidence    |
| Tailwind CSS     | Rapid and responsive styling              |
| React Query      | API data fetching and caching             |
| DummyJSON API    | Mock product data                         |

---

## 📦 Installation & Setup

1. **Clone the Repository**

```bash
git clone https://github.com/PhilTech-Hub/modern-product-dashboard.git
cd modern-product-dashboard
Install Dependencies

bash
Copy
Edit
npm install
# or
yarn install
Run the Development Server

bash
Copy
Edit
npm run dev
Open in Browser

Go to http://localhost:3000 to view the app.

🧱 Project Structure
bash
Copy
Edit
.
├── app/
│   ├── page.tsx               # Product listing (home)
│   └── product/[id]/page.tsx  # Dynamic product detail
├── components/
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── SearchBar.tsx
│   ├── FilterDropdown.tsx
│   ├── SkeletonCard.tsx
│   └── Spinner.tsx
├── styles/                    # Tailwind and global CSS
└── public/                    # Static assets
🧠 Architecture Decisions
App Router used for modern, flexible routing.

React Query enables powerful data-fetching features like caching and re-fetching.

Skeleton Loaders improve perceived performance during data fetch.

Functional components + TypeScript ensure readability and scalability.

Minimal external libraries for speed and control over the UI.

✨ Future Improvements
Add dark mode toggle using Tailwind’s dark: classes.

Implement server-side pagination with skip and limit.

Add unit testing using Jest and React Testing Library.

Deploy to Vercel or Netlify.

📄 License
This project is licensed under the MIT License.

🙋‍♂️ About the Developer
Philemon Victor
AI Developer | Full-stack Developer | Frontend Developer
🎯 Passionate about clean UIs, DX, and scalable design systems
🌍 Based in Nairobi, Kenya
📫 Reach me at victorphilemon001@gmail.com
🔗 LinkedIn Profile

If you find this project useful, feel free to ⭐️ the repo or connect with me!
