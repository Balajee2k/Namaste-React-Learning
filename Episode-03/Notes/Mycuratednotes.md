-   The JavaScript engine only understands ECMAScript (like ES6, ES5, etc.)
    so it does   not understand JSX and all React code.
-   So how does the JavaScript engine understand this JSX? Basically, with the help of
    bundlers like Parcel (which we use here). Parcel is doing all this behind the scenes. Parcel transpiles (converts) the JSX code before it goes to the browser. Does Parcel do this by itself? No. Parcel actually gives the transpilation work to Babel (a package).

## Q. What is Babel?
    A: Babel is a JavaScript transpiler. It primarily converts modern JavaScript code (ECMAScript 2015+ or ES6+) into a backward-compatible version (ES5) that older JavaScript engines can understand. This allows developers to use the latest language features without worrying about browser compatibility. 
    In more detail:
    Transpilation:
    - Babel transforms code from one language version into another, in this case, modern JavaScript into older JavaScript. 
    ES6+ to ES5:
    - Babel converts features like arrow functions, class syntax, and other ES6+ features into their ES5 equivalents. 
    Browser Compatibility:
    This ensures that your JavaScript code can run in older browsers that may not fully support ES6+ features. 
    JSX:
    - Babel also converts JSX (a syntax extension used by React) into regular JavaScript. 
    Polyfills:
    - Babel can include polyfills, which are code that adds missing features or methods to older browsers, ensuring that modern code functions correctly. 
    
## Q. How does Babel work with ReactJS?
    A: Babel works through a series of transformations that take your modern JavaScript (including JSX) and convert it into backwards-compatible JavaScript. This process typically involves three main stages:

    Parsing: Babel parses the JavaScript code into an Abstract Syntax Tree (AST), which is a structured representation of the code.
    Transformation: Babel applies various plugins to the AST to convert the code into a desired format. For example, it converts JSX into React.createElement() calls or converts ES6 arrow functions into regular functions.
    Code Generation: Finally, Babel generates JavaScript code from the transformed AST. This is the final JavaScript output that browsers can execute.

## Q. React component
A; Building blocks of user interfaces in React applications. They are reusable, independent pieces of code that encapsulate a specific part of
  the UI. Components can be thought of as JavaScript functions or classes that take in data (props) and return React elements that describe
  what should be displayed on the screen.

- **There are two primary types of components in React**: 
    -Function Components (newer):
    These are JavaScript functions that accept props as input and return JSX elements. They are often used for simpler, stateless components.
    -Class Components (older):
    These are ES6 classes that extend from React.Component. They can manage their own internal state and have lifecycle methods.

## Difference between React Element and React Component

| **Element** | **Component** |
|-------------|---------------|
| An element is always returned by a component. | A component can be functional or a class that optionally takes input and returns an element. |
| The element does not have any methods. | Each component has its lifecycle methods (mounting, updating, unmounting). |
| A React element is an object representation of a DOM node. | A component encapsulates a DOM tree. |
| Elements are immutable, i.e., once created, they cannot be changed. | The state in a component is mutable. |
| An element can be created using `React.createElement()` with a type property. | A component can be declared in different ways, like as a class with a `render()` method or as a function. |
| We cannot use React Hooks with elements as elements are immutable. | React hooks can be used only with functional components. |
| Elements are light, stateless, and hence faster. | It is comparatively slower than elements. |

## How do you do JavaScript operations inside JSX?

See how we inject JavaScript into JSX:

```js
const number = 97;
const jsxWithJs = (
    <div>
        <h1>Welcome to React using JSX</h1>
        <h2>Number is: {number}</h2> {/* inject JS inside JSX using curly brackets {} */}
        {100 + 452}
    </div>
);
```
- Similarly, if we have to inject a React element into a component, we also do it by using {parent} because it's a normal JavaScript variable, as a React element is a JS object.