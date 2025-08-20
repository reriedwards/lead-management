# App Reviews - React App

A React app for accepting and managing leads . This project was set up Next.js [https://nextjs.org/docs] for fast development and modern build tooling.

## Prerequisites

Before getting started, make sure you have:

- [Node.js](https://nodejs.org/) (version 22.17.0 or higher)
- npm (comes with Node.js)

---

## Getting Started

1. **Download** the `.zip` file and **extract** it.
2. Open a terminal in the project folder.
3. Install the dependencies:

```
npm install
```

### Setting up the DB

1. Create a local file named `.env.local`
2. Paste this string to access as a temporary guest

`MONGODB_URI=mongodb+srv://guest:guest@cluster0.7kz52zw.mongodb.net/leads-db?retryWrites=true&w=majority&appName=Cluster0`

### Running the App

```
npm run dev

```

Then open http://localhost:3000 in your browser.

### Running the Tests

```
npm test

```

This will execute all unit and integration tests using Jest + React Testing Library.

### Project Structure
```

lead-management/
├─ app/
│  ├─ layout.tsx           # Foundational layout for entire app
│  ├─ page.tsx             # Entry point; holds the form
│  ├─ thank-you/
│  │  └─ page.tsx          # Page shown after form submission
│  └─ api/
│     └─ leads/
│        ├─ [id].ts        # API route for specific lead (PATCH)
│        └─ route.ts       # API route for all leads (GET, POST)
├─ components/
│  └─ test/
│     ├─ LeadForm.tsx
│     ├─ LeadHeader.tsx
│     └─ LeadBanner.tsx
├─ lib/
│  └─ dbConnect.ts         # DB connection utility
├─ models/
│  └─ lead.ts
├─ types/
│  └─ lead.ts
├─ theme/
│  └─ theme.ts             # App theme
├─ public/
│  ├─ dice.png
│  └─ heart.png
├─ package.json
└─ tsconfig.json
```


### Technologies Used

- [React](https://react.dev/) — UI library for building components  
  **Why we use it:** React makes creating reusable components simple and helps manage state efficiently. Its virtual DOM keeps the app fast, which is especially handy for this simple lead management form/hub.  
  **Considerations:** There’s a learning curve if you’re new to hooks or component lifecycle. It also adds some bundle size compared to vanilla JS, but the benefits of its ecosystem and modularity usually outweigh that.

- [TypeScript](https://www.typescriptlang.org/) — static typing for JavaScript  
  **Why we use it:** TypeScript catches errors during development, helps keep code maintainable, and improves autocompletion in editors.  
  **Considerations:** It adds a compilation step and a bit of upfront learning, and prototyping can feel slower than plain JS, but it prevents many runtime bugs.

- [MUI](https://mui.com/) — UI components & styling  
  **Why we use it:** MUI gives a rich set of ready-to-use, accessible components that speed up development and keep design consistent.  
  **Considerations:** It can increase bundle size, but its mature ecosystem makes it a good choice. Alternatives like Tailwind offer more flexibility but require more manual styling.

- [Native React State] — state management  
  **Why we use it:** this application required very lighteweight state management; hence the decision to use vanilla out of the box state management.  
  **Considerations:** There were other options such as useReducer, Zustand, Recoil etc; but those were too complex for this simple app.

- [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) — testing  
  **Why we use it:** Jest offers powerful testing with mocks and snapshots, while React Testing Library encourages testing based on user interactions rather than implementation details.  
  **Considerations:** Writing tests takes extra time upfront, but it prevents bugs and regressions as the app grows.

- [date-fns](https://date-fns.org/) — date utilities  
  **Why we use it:** date-fns is lightweight and makes formatting, parsing, and manipulating dates simple without adding a heavy dependency.  
  **Considerations:** It’s not as feature-rich as Moment.js or Luxon, but it’s smaller, tree-shakable, and keeps the app performant.

- [react-hook-form](https://react-hook-form.com/) is a form management for React
  **Why we use it:** It simplified building and validating forms in React with minimal re-renders. It works well with TypeScript and integrates easily with UI libraries like Material-UI.
  **Considerations:** Considerations: You need to wrap custom components with Controller for controlled components. Validation logic is flexible but sometimes requires more setup for complex forms.

- [axios](https://axios-http.com/) is a form management for React
  **Why we use it:** Makes sending HTTP requests easier than using fetch, with built-in support for JSON, request/response interceptors, and cancellation.
  **Considerations:** Considerations: You need to wrap custom components with Controller for controlled components. Adds a small dependency, but provides a more consistent API than the native fetch. For SSR in Next.js, sometimes fetch is sufficient.

- [next/navigation](https://nextjs.org/docs/app/building-your-application/routing/navigation-and-routing) this is a library of utilities for Next.app router
  **Why we use it:** Provides client-side navigation in the App Router (useRouter().push()), replaces the old next/router in pages directory, and supports URL state management.
  **Considerations:** Only works in client components. Using useRouter outside a client component will throw an error.

- [vitest][https://vitest.dev/] this is a native testing library for vite.
  **Why we use it:** although I did not use vite, I found this simpler to use in this prototyping excercise. I adopted it because of its simplicity.
  **Considerations:** Some Jest-specific APIs need minor adjustments (like vi instead of jest). Snapshot testing works differently but was not a major concern for this project.

- [mongodb/mongoose][https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/] - MongoDB object modeling for Node.js
  Why we use it: Provides schema validation, type safety, and helpers for working with MongoDB. Makes CRUD operations more predictable and maintainable. Super easy to setup and use.
  Considerations: Adds an extra layer on top of MongoDB, which might be unnecessary for very simple queries. Connection caching is important in serverless environments to prevent multiple connections.

### Challenges Experienced

[File/Upload] - This was one of the requirements listed. However, due to time constraints, I did not manage to accomplish setting it up. I ran into isses with multipart form data and testing, which took a significant amount of time to debug.

[JsonForms] - This was one of the requirements listed. However I found the setup similar to react-hook-form in terms of their declarative setups. I chose react-hook-form because of its superior flexibility.
