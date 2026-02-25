# Star Wars Characters App

A pragmatic Star Wars API (SWAPI) explorer built with Next.js 15, TypeScript, and Tailwind CSS.

##  Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run the development server:
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000) in the browser.

## Architecture

### Framework: Next.js (App Router)
I chose **Next.js with the App Router** for those reasons:
- **Server Components**: Data fetching happens on the server, reducing the JavaScript bundle sent to the client and improving performance (LCP).
- **Streaming & Suspense**: The app uses React Suspense to stream the UI, showing skeleton loaders while data is being fetched.
- **Built-in Caching**: Leveraging Next.js `fetch` extensions for easy revalidation and caching.

### State Management: URL-based
Instead of using Redux or complex client-side state, pagination and search are handled via **URL Search Parameters**.
- **Benefits**: Shareable links, working browser back/forward buttons, and simpler logic without synchronization issues.

### Styling: Tailwind CSS
Used for a rapid, pragmatic design approach.

### API Layer
- **Typed Responses**: All API responses are strictly typed to ensure developer productivity and catch errors early.
- **Service Layer**: Decoupled fetching logic in `src/lib/swapi.ts` for easy maintenance.

### Testing
- **Playwright** 2 tests are added ("display main title" + character search)

## Trade-offs & Pragmatic Choices

Given the 4-8 hour timeframe, some intentional trade-offs were made:
- **No Global State**: For an app of this size, `useContext` or Redux was not necessary. URL params and Server Component state are sufficient.
- **Minimal Animations**: Focused on core functionality and responsive layout over fancy transitions.
- **Basic Search**: The SWAPI search is performed on the server. For a production app with millions of records, I would implement a debounced client-side search or a more robust search index.
- **No Filtering**
The SWAPI doesn't support filtering through the API-query, that's filtering would only work in the current page, or we would have to preload the whole dataset. This would be a bad choice.


## What I would do differently for Production
- **Image Optimization**: SWAPI doesn't provide images. I would integrate with a service like `starwars-visualguide.com` or a custom S3 bucket for character portraits.
- **Analytics & SEO**: Add metadata dynamic generation for each character page and integrate tracking (GTM/Segment).
- **CI/CD**: Set up GitHub Actions for automated linting, type-checking, and deployments.
