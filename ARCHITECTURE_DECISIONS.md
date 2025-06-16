###Product Dashboard – Architecture Decision Document
##📌 Project Overview
This project is a Product Dashboard built to display, search, filter, and view detailed product data retrieved from a public API (https://dummyjson.com/products). The application is developed using Next.js 13+ with App Router, styled using Tailwind CSS, and utilizes React Query for API data fetching, caching, and management.

##🧱 1. Core Architectural Decisions
#A. Framework: Next.js 13+ with App Router
Why?

Provides built-in file-based routing with support for dynamic routes (/product/[id]).

Enables server-side rendering (SSR), static site generation (SSG), and incremental static regeneration (ISR), crucial for modern performant apps.

App Router provides a more scalable and modular way of building components and routes using colocated page.tsx, layout.tsx, and metadata.

Benefits:

Fast navigation via client-side routing.

SEO-optimized.

Component-level route files = better scalability and separation of concerns.

#B. Data Management: React Query
Why?

Efficiently handles data fetching, caching, refetching, and synchronizing server state.

Automatically tracks loading, success, and error states.

Reduces boilerplate compared to manual useEffect + fetch logic.

Benefits:

Centralized, scalable data logic.

Enhanced performance through caching.

Optimized UX with background updates and loading fallbacks.

#C. Styling: Tailwind CSS
Why?

Utility-first approach allows rapid UI development without writing much custom CSS.

Excellent integration with dark mode and responsiveness out of the box.

Benefits:

Consistent, scalable design.

Clean, maintainable code with minimal stylesheet overhead.

Modern UI patterns (cards, shadows, borders, rounded corners) achieved with simple classes.

##🗂️ 2. Folder Structure
/app
 ├─ /components             → Reusable UI components
 │   ├─ ProductCard.tsx
 │   ├─ SearchBar.tsx
 │   ├─ FilterDropdown.tsx
 │   ├─ SkeletonCard.tsx
 │   └─ Spinner.tsx
 ├─ /[id]/page.tsx          → Dynamic route for product detail
 └─ page.tsx                → Homepage with all product listings
Why this structure?

Keeps the application modular and easy to scale.

Pages are colocated with logic (App Router).

Components are abstracted to reduce duplication and improve reusability.

##📊 3. Feature Implementation Decisions
#A. Client-Side Filtering and Pagination
Why client-side instead of server-side?

The API doesn't support query parameters for pagination or filtering.

We fetch all products once (limit=200) and implement local filtering/sorting.

Client-side Logic Includes:

searchTerm for product name search.

selectedCategory for filtering by product category.

sortOrder for price/rating sorting.

Pagination using currentPage and PRODUCTS_PER_PAGE.


const paginatedProducts = filteredProducts.slice(
  (currentPage - 1) * PRODUCTS_PER_PAGE,
  currentPage * PRODUCTS_PER_PAGE
);

#B. Skeleton Loader & Spinner
Why both?

Spinner for quick API fetches.

Skeleton loader shown only if fetching exceeds 300ms, preventing UI flicker and improving user perception of performance.


useEffect(() => {
  let timeout: NodeJS.Timeout;
  if (isLoading) {
    timeout = setTimeout(() => setShowSkeletons(true), 300);
  } else {
    setShowSkeletons(false);
  }
  return () => clearTimeout(timeout);
}, [isLoading]);
#C. Error Handling

At the list level (Home Page):

{error ? (
  <div className="text-center text-red-500 mt-6">
    <p className="font-semibold text-lg">Oops! Something went wrong.</p>
    <p className="text-sm">{(error as Error).message || 'Unable to fetch products.'}</p>
  </div>
) : (...)}

At the detail level (/product/[id]):

if (!res.ok) {
  notFound(); // Automatically triggers Next.js 404 page
}

#D. Dynamic Routing (/product/[id])
Why?

Allows users to navigate to individual product detail pages.

generateStaticParams() pre-generates paths at build time for fast navigation.

generateMetadata() uses product data to dynamically set meta title/description (SEO benefit).

NotFound Handling

If a product ID doesn’t exist (e.g., /product/999), notFound() returns a 404 page.

This is cleaner and more informative than showing a broken or empty screen.

##💡 4. UX Decisions
Responsive layout (mobile-first via Tailwind).

Dark mode-ready (default Tailwind config supports this).

Products are shown in a grid that adapts based on screen size (1, 2, 3, or 4 columns).

Filters and sorting in flex layout to stack vertically on mobile and horizontally on desktop.

Footer is always pinned to the bottom using spacing utilities like mt-12.

##🔍 5. Potential Enhancements
Persistent filters via URL query params (e.g., ?category=smartphones&sort=rating).

Infinite scroll instead of paginated view.

Dark mode toggle using localStorage and Tailwind’s class-based dark theme.

Unit tests for components using Jest or React Testing Library.

Type-safe API layer using Zod or TypeScript interfaces.

###📦 Dependencies
Package	Purpose
next	React framework
@tanstack/react-query	Server state management (data fetching)
tailwindcss	Utility-first CSS
react-icons	Icon system for UI elements

###✅ Conclusion
The architecture choices reflect a modern, scalable, performant frontend that is:

User-focused (feedback on loading/errors).

Modular and maintainable (components, hooks, routing).

Efficient (cached data fetching, minimal re-renders).

Developer-friendly (minimal boilerplate, easy to extend).