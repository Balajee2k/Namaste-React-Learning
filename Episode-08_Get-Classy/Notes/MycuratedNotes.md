# Episode 08: Get Classy - Class Components in React

## Overview
In this episode, we dive deep into React class components to build a solid foundation for understanding React fundamentals. Class components are frequently featured in technical interviews, making this knowledge essential for developers.

## Key Learning Points

### What are Class Components?
- **Definition**: ES6 classes that extend from `React.Component`
- **Requirement**: Must contain a `render()` method
- **Purpose**: Provide a way to create stateful components with lifecycle methods

### Practical Implementation
We'll build an **About Page** using class components that includes:
- **API Integration**: Fetching data from GitHub API
- **Team Information**: Displaying developer profiles and details
- **Real-world Application**: Creating a functional team showcase page

## Why This Matters
- Foundation for understanding React's evolution
- Essential knowledge for technical interviews
- Understanding legacy codebases
- Comparison point for modern functional components with hooks

## Let's see how we create a class component
```javascript
import React, { Component } from 'react';

class UserClass extends Component {
    render() {
        return (
            <div>
                <h2>User Class Component</h2>
                <h2>Balajee</h2>
                <p>Age: 30</p>
            </div>
        );
    }
}
export default UserClass; 
```
- The difference between a functional component and a class component is that the class component extends from `React.Component` and must implement a `render()` method to return JSX.

### Key Features of Class Components
- **State Management**: Class components can hold and manage their own state.
- **Lifecycle Methods**: Class components can utilize lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

### Q. How do I pass a prop to a class component?
```javascript
import React, { Component } from 'react';

class UserClass extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h2>User Class Component</h2>
                <h2>{this.props.name}</h2>
                <p>Age: {this.props.age}</p>
            </div>
        );
    }
}
```

### Example Usage
```javascript
<UserClass name="Balajee" age={30} location="Bihar" />
``` 

### Q. Why do we need to use `super(props)` in the constructor?
- **`super(props)`**: This calls the constructor of the parent class (`React.Component`) and allows us to access `this.props` within the class component. It is necessary to ensure that the component is properly initialized with the props passed to it.

### Q. How do we manage state variables in a class component?
```javascript
import React from 'react';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        // Here we create state variables
        this.state = {
            count: 0
        };
    }
    // Here we can update state variables
    increment = () => {
        this.setState({ count: this.state.count + 1 });
    }

    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.increment}>Increment</button>
            </div>
        );
    }
}

export default Counter;
```
- Never directly modify the state variable, always use `this.setState()` to ensure React knows about the change and can re-render the component accordingly (see in UserClass component).

- If we have to update any one state variable in `this.state = {count: 0, count2: 2}` from two, then we just need to pass the object with the state variable we want to update.
```javascript
this.setState({
    count: 3
});
```
React doesn't touch `count2`.

### Q. How do we use lifecycle methods in class components?
```javascript
import React from 'react';

class LifecycleExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
        console.log('Constructor called');
    }

    componentDidMount() {
        // This method is called after the component is mounted
        // Ideal for fetching data
        fetch('https://api.example.com/data')
            .then(response => response.json())
            .then(data => this.setState({ data }));
        console.log('Component did mount');
    }

    componentDidUpdate(prevProps, prevState) {
        // This method is called after the component updates
        // Ideal for responding to prop or state changes
        if (prevState.data !== this.state.data) {
            // Handle the update
        }
    }

    componentWillUnmount() {
        // This method is called before the component is unmounted
        // Ideal for cleanup (e.g., cancelling network requests)
    }

    render() {
        console.log('Parent rendered');
        return (
            <div>
                <h1>Lifecycle Methods Example</h1>
                {this.state.data ? (
                    <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        );
    }
}

export default LifecycleExample;
```

### Lifecycle Methods Explained:

1. **Constructor**: Called first when the component is created.
2. **componentDidMount**: Called after the component is mounted.
3. **componentDidUpdate**: Called after the component updates.
4. **componentWillUnmount**: Called before the component is unmounted.
5. **render**: Called whenever the component needs to be rendered or re-rendered.

So in the above code, it's like this: Constructor called → Parent rendered → Component did mount.

If any child component is there, then it goes like this. Take an example: `<UserClass />` is there (inside parent render) in the `render()` method. Then the lifecycle goes like this: Parent Constructor called → Parent rendered → UserClass Constructor called → UserClass rendered → UserClass component did mount → Parent component did mount.

## React Component Lifecycle Flow Diagram

```
📱 MOUNTING PHASE (Component Creation)
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  1️⃣ constructor()                                          │
│     ├─ Initialize state                                     │
│     └─ Bind methods                                         │
│                        ⬇️                                   │
│  2️⃣ render()                                               │
│     ├─ Return JSX                                           │
│     └─ Create Virtual DOM                                   │
│                        ⬇️                                   │
│  3️⃣ componentDidMount()                                    │
│     ├─ API calls                                            │
│     ├─ DOM manipulation                                     │
│     └─ Set up subscriptions                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘

🔄 UPDATING PHASE (Component Changes)
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  1️⃣ render()                                               │
│     └─ Re-render with new props/state                       │
│                        ⬇️                                   │
│  2️⃣ componentDidUpdate()                                   │
│     └─ Handle side effects after update                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

💀 UNMOUNTING PHASE (Component Removal)
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  1️⃣ componentWillUnmount()                                 │
│     ├─ Clean up subscriptions                               │
│     ├─ Cancel network requests                              │
│     └─ Remove event listeners                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Parent-Child Lifecycle Execution Order

```
🏠 Parent Component with Child Component
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  1️⃣ Parent constructor()                                   │
│  2️⃣ Parent render()                                        │
│     │                                                       │
│     └─ 3️⃣ Child constructor()                              │
│        4️⃣ Child render()                                   │
│        5️⃣ Child componentDidMount()                        │
│                                                             │
│  6️⃣ Parent componentDidMount()                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Example: See how we can use this in our About component
```javascript
class About extends React.Component {
    constructor(props) {
        super(props);
        // Constructor is called when the component is created
        console.log("Parent component constructor called");
    }
    
    componentDidMount() {
        // This method is called when the component is mounted
        console.log("Parent component did mount called");
    }

    render() {
        console.log("Parent component render called");
        return (
            <div>
                <UserClass name="First" age={22} location="Kolkata" />
                {/* Let's Add This Class to Understand React Lifecycle */}
                <UserClass name="Second" />
            </div>
        );
    }
}
```

📝 Console Output Example:
```
------------Mounting Phase------------
    Parent Constructor called
    Parent rendered
    Child1 Constructor called  
    Child1 rendered
    Child2 Constructor called
    Child2 rendered
    Child1 Component Did Mount
    Child2 Component Did Mount
    Parent Component Did Mount
------------Updating Phase------------
Only render called and componentDidUpdate called after state change
```
Example: See in About component
