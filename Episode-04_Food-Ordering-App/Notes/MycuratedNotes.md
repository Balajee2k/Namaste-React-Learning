## Q. How we make card or component in react dynamic?
**A:** In React, you can make a card or component dynamic by using props and state to render content based on data.  
- **Config driven UI:** Use props to pass data to components, allowing them to render different content based on the data received.  
- **Never Use index as key:** When rendering lists of components, always use a unique identifier as the key prop instead of the index. This helps React optimize rendering and avoid unnecessary re-renders.

---

## Important Concepts Used in This Project

- **Component-based architecture:** The UI is split into reusable components like `Header`, `Body`, and `RestaurantCard`.
- **Props:** Data is passed from parent to child components using props (e.g., `resData` in `RestaurantCard`).
- **Mapping over arrays:** Used `.map()` to render a list of restaurant cards dynamically from `resList`.
- **Keys in lists:** Used a unique `id` as the `key` prop when rendering lists to help React identify each element.
- **Mock data/config-driven UI:** Used a mock array (`resList`) to drive the UI, making it easy to update or scale.
- **Separation of concerns:** CSS is kept in a separate file for styling, and logic/UI is in JS/JSX files.
- **Conditional rendering:** (Can be added later for features like loading, error, or empty states.)

---

## React Interview Questions & Answers (Relevant to This Project)

### 1. What are props in React? How are they different from state?
**A:** Props are inputs to components, passed from parent to child, and are read-only. State is managed within the component and can change over time.

### 2. Why should you not use array index as a key in React lists?
**A:** Using index as a key can cause issues with component identity and lead to bugs or unnecessary re-renders. Always use a unique id.

### 3. How do you render a list of components dynamically in React?
**A:** By using the `.map()` function on an array and returning a component for each item, passing data via props.

### 4. What is the purpose of the `key` prop in React?
**A:** The `key` prop helps React identify which items have changed, are added, or are removed, optimizing rendering.

### 5. What is a component in React? Explain functional vs class components.
**A:** A component is a reusable piece of UI. Functional components are functions returning JSX; class components use ES6 classes and can have lifecycle methods.

### 6. How does React handle re-rendering when data changes?
**A:** React uses a virtual DOM to efficiently update only the parts of the UI that changed, based on state or props updates.

### 7. What is config-driven UI and why is it useful?
**A:** Config-driven UI uses data/configuration objects to generate UI, making it scalable and easy to update.

### 8. How do you handle CSS in React projects?
**A:** CSS can be handled using external stylesheets, CSS modules, styled-components, or inline styles.

### 9. How do you pass data from parent to child components?
**A:** By using props: `<ChildComponent someProp={value} />`.

### 10. What is the virtual DOM and how does React use it?
**A:** The virtual DOM is a lightweight copy of the real DOM. React updates the virtual DOM first, then efficiently updates the real DOM to match.


## Theory Assignment:
- Is `JSX` mandatory for React?
- Is `ES6` mandatory for React?
- `{TitleComponent}` vs `{<TitleComponent/>}` vs `{<TitleComponent></TitleComponent>}` in `JSX`.
- How can I write `comments` in JSX?
- What is `<React.Fragment></React.Fragment>` and `<></>`?
- What is `Reconciliation` in React?
- What is `React Fiber`?
- Why do we need `keys` in React?
- Can we use `index as keys` in React?
- What is `props in React`? Ways to.
- What is `Config Driven UI`?

## References:
- [Akshay Saini Code Link](https://bitbucket.org/namastedev/namaste-react-live/src/master/)
- [React without JSX](https://reactjs.org/docs/react-without-jsx.html)
- [Virtual DOM](https://reactjs.org/docs/faq-internals.html)
- [Reconciliation](https://reactjs.org/docs/reconciliation.html)
- [React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)
- [React Without ES6](https://reactjs.org/docs/react-without-es6.html)
- [Index Keys as Anti-Pattern](https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/)