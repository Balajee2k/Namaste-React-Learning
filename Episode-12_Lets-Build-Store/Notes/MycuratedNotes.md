# Episode 11 - Playing with Data

## Overview
In this episode, we explore three fundamental React concepts:
1. **Higher Order Components (HOCs)** - Advanced component composition patterns
2. **Controlled and Uncontrolled Components** - State management strategies and lifting state up
3. **createContext and useContext Hook** - Context API for global state management

---

## Part 1: Higher Order Components (HOCs)

### What are Higher Order Components?
- **Higher Order Components (HOCs)** are functions that take a component and return a new component with enhanced functionality
- They enable code reuse and separation of concerns in React applications
- HOCs follow the pattern: `Component → Enhanced Component`

### Simple Explanation from React.dev Principles
Think of HOCs like a **wrapper** or **decorator** for your components:
- **Analogy**: If you have a basic car (component), an HOC is like adding features (air conditioning, GPS, etc.) without changing the original car
- **In React**: You take an existing component and "wrap" it with additional functionality
- **Result**: A new component that has all the original features plus the new ones

### Why Use HOCs?
- **Code Reusability**: Share common functionality across multiple components
- **Separation of Concerns**: Keep components focused on their primary responsibility
- **Enhanced Features**: Add features like authentication, logging, or styling without modifying original components

### Practical Implementation: Restaurant Card Promotion Feature

#### The Problem
We need to display some restaurant cards as "promoted" without duplicating the existing `RestaurantCard` component code.

#### The Solution: HOC Pattern
- **Input**: `RestaurantCard` → **Output**: `RestaurantCardPromoted`
- **Note**: In current Swiggy API, the "promoted" field has been removed, so we'll simulate this feature

#### Step 1: Create the HOC in RestaurantCard.js
```javascript
// Higher Order Component that adds promotion label
export const withPromotedLabel = (RestaurantCard) => {
    return (props) => {
        return (
            <div className="bg-yellow-100 p-2 m-2 rounded-lg">
                <label className="font-bold text-xl">Promoted</label>
                <RestaurantCard {...props} />
            </div>
        );
    };
};
```

#### Step 2: Use the HOC in Body.js
```javascript
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";

// Create enhanced component using HOC
const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

const Body = () => {
    return (
        <div className="res-container flex flex-wrap">
            {filteredRestaurant.map((restaurant) => (
                <Link 
                    to={"/restaurant/" + restaurant.info.id}
                    key={restaurant.info.id}
                >
                    {restaurant.info.promoted ? 
                        (<RestaurantCardPromoted resData={restaurant} />) : 
                        (<RestaurantCard resData={restaurant} />)
                    }
                </Link>
            ))}
        </div>
    );
};
```

#### Understanding the HOC Implementation
- **`withPromotedLabel`**: A function that takes `RestaurantCard` as an argument and returns a new enhanced component
- **`{...props}`**: Spreads all props to the original `RestaurantCard`, ensuring it receives all necessary data
- **Conditional Rendering**: In `Body.js`, we conditionally render the promoted version based on the restaurant's promotion status
- **Code Reuse**: The original `RestaurantCard` logic is completely reused without modification

#### Benefits of This Approach
- **No Code Duplication**: Original component remains unchanged
- **Flexible Enhancement**: Can easily add/remove promotion feature
- **Maintainable**: Changes to base component automatically reflect in enhanced version
- **Composable**: Can chain multiple HOCs for different enhancements

---

## Part 2: Controlled and Uncontrolled Components

### Understanding the Concepts - Simple Explanation

#### From React.dev Principles:

**Controlled Components**:
- **Simple Definition**: A component where React controls the value through state
- **Analogy**: Like a remote-controlled car - the parent (remote controller) decides what the car (component) does
- **In Practice**: The parent component owns the state and passes it down as props

**Uncontrolled Components**:
- **Simple Definition**: A component that manages its own state internally
- **Analogy**: Like a wind-up toy car - once you wind it up, it controls itself
- **In Practice**: Each component has its own `useState` and manages its own behavior

### Practical Implementation: Restaurant Menu Accordion

#### The Goal
Create an accordion menu where:
1. Categories can be expanded/collapsed
2. Only one category can be open at a time
3. Opening a new category closes the previously opened one

#### Step 1: Initial Setup in RestaurantMenu.js
```javascript
import { useState } from "react";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
    const [showIndex, setShowIndex] = useState(null);

    return (
        <div className="menu text-center">
            <h1 className="text-2xl font-bold my-6">{name}</h1>
            <h2 className="text-lg">{cuisines.join(", ")}</h2>
            <h2 className="text-lg">{costForTwoMessage}</h2>
            
            {/* Categories Accordion UI */}
            {categories.map((category, index) => (
                <RestaurantCategory 
                    key={category?.card?.card?.title} 
                    data={category?.card?.card} 
                    showItems={index === showIndex} 
                    setShowIndex={() => setShowIndex(index)} 
                />
            ))}
        </div>
    );
};

export default RestaurantMenu;
```

#### Understanding the State Management
- **`showIndex`**: State variable that tracks which category is currently expanded (by index)
- **`useState(null)`**: Initially, no category is expanded
- **`index === showIndex`**: Determines if current category should show its items
- **`setShowIndex(() => setShowIndex(index))`**: Function passed to child to update parent state

#### Step 2: The Challenge - Single Accordion Behavior
**Problem**: When we click on an accordion, we want:
- The clicked accordion to open
- All other accordions to close automatically
- Only one accordion open at a time

**Solution**: Control the state from the parent component (RestaurantMenu) instead of letting each child (RestaurantCategory) manage its own state.

#### Step 3: Implementing Controlled Component Pattern

##### Why This Approach Works:
1. **Centralized State**: Parent controls which accordion is open
2. **Single Source of Truth**: Only one state variable (`showIndex`) manages all accordions
3. **Automatic Closing**: When a new index is set, previous accordion automatically closes

#### Step 4: RestaurantCategory.js Implementation
```javascript
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
    const handleClick = () => {
        setShowIndex(); // Calls parent's function to update state
    };

    return (
        <div className="mx-auto my-4 w-6/12 bg-gray-50 shadow-lg p-4">
            {/* Accordion Header */}
            <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                <span className="font-bold">
                    {data?.title} ({data?.itemCards?.length || 0})
                </span>
                <span>{showItems ? "⬆️" : "⬇️"}</span>
            </div>

            {/* Accordion Body - Conditionally Rendered */}
            {showItems && <ItemList items={data?.itemCards} />}
        </div>
    );
};

export default RestaurantCategory;
```

#### Understanding Controlled vs Uncontrolled Components

##### Controlled Component (Current Implementation):
- **State Location**: Parent component (`RestaurantMenu`)
- **State Control**: Parent decides when to show/hide content
- **Communication**: Child calls parent function to trigger state changes
- **Benefits**: Centralized control, predictable behavior, easy to coordinate multiple components

##### Uncontrolled Component (Alternative):
- **State Location**: Each child component manages its own state
- **State Control**: Each component independently decides its behavior
- **Communication**: Minimal parent-child communication
- **Drawbacks**: Difficult to coordinate behavior across components

---

### The Key Concept: Lifting State Up (React.dev Explanation)

#### What is "Lifting State Up"?

#### Simple Definition from React.dev:
**"Sometimes, you want the state of two components to always change together. To do it, remove state from both of them, move it to their closest common parent, and then pass it down via props."**

#### Real-World Analogy:
Think of it like a **TV remote control**:
- **Before Lifting State**: Each family member has their own remote (each component has its own state)
- **Problem**: Everyone changes channels independently, causing chaos
- **After Lifting State**: One main remote controlled by the parent (state moved to parent component)
- **Result**: Coordinated behavior, one person controls what everyone watches

### Why Do We Lift State Up?

#### From React.dev Principles:
1. **Shared State**: When two or more components need to reflect the same changing data
2. **Coordination**: When components need to work together in a synchronized way
3. **Single Source of Truth**: Prevent inconsistencies between components

### Step-by-Step Process of Lifting State Up:

#### Step 1: Identify the Problem
- Multiple components need to share or coordinate state
- Components are acting independently when they should work together

#### Step 2: Find the Common Parent
- Locate the closest component that contains all the components that need to share state
- This will be where you move the state

#### Step 3: Move State to Parent
- Remove `useState` from child components
- Add `useState` to the common parent component

#### Step 4: Pass State Down as Props
- Parent passes current state values to children as props
- Parent passes state setter functions to children as props

#### Step 5: Update Through Parent
- Children call parent's functions to update state
- Parent's state change triggers re-render of all children

### Our Accordion Example - Lifting State Up in Action:

#### Before (Uncontrolled - Each Accordion Independent):
```javascript
// Each RestaurantCategory has its own state
const RestaurantCategory = ({ data }) => {
    const [showItems, setShowItems] = useState(false); // Own state
    
    const handleClick = () => {
        setShowItems(!showItems); // Controls own state
    };
    // ... rest of component
};
```
**Problem**: Multiple accordions can be open at the same time

#### After (Controlled - State Lifted Up):
```javascript
// Parent (RestaurantMenu) controls all accordion states
const RestaurantMenu = () => {
    const [showIndex, setShowIndex] = useState(null); // Lifted state
    
    return (
        <div>
            {categories.map((category, index) => (
                <RestaurantCategory 
                    showItems={index === showIndex}     // State passed down
                    setShowIndex={() => setShowIndex(index)} // Function passed down
                />
            ))}
        </div>
    );
};

// Child (RestaurantCategory) receives state via props
const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
    const handleClick = () => {
        setShowIndex(); // Calls parent's function
    };
    // ... rest of component
};
```
**Solution**: Only one accordion can be open, coordinated behavior

### Key Benefits of Lifting State Up:

1. **Coordination**: Components can work together seamlessly
2. **Single Source of Truth**: One place controls the state
3. **Predictable Behavior**: Easier to understand and debug
4. **Data Flow**: Clear parent-to-child communication

### When to Lift State Up:

- **Multiple components need the same data**
- **Components need to stay in sync**
- **You want to coordinate behavior between components**
- **You need a single source of truth**

#### How State Communication Works:
1. **Parent → Child**: Props carry state and functions down
2. **Child → Parent**: Child calls parent function to trigger state changes
3. **Indirect Updates**: Child cannot directly modify parent state, only request changes
4. **Re-rendering**: When parent state changes, all children re-render with new props

#### Important Notes:
- **Props are Read-Only**: Child components cannot directly modify props from parent
- **Function Props**: Parent passes functions to children for state updates
- **State Ownership**: The component that owns the state is responsible for updating it
- **Unidirectional Data Flow**: Data flows down, events flow up

---

## Part 3: createContext and useContext Hook

### Understanding the Problem: Prop Drilling

In React applications, passing props/data through many layers can lead to **"prop drilling"**. This means when you want to pass data from a parent component to a deeply nested child component, you have to pass it through every intermediate component. As React applications grow, this can become cumbersome and hard to manage.

### What is createContext and useContext?

- **`createContext`**: Function that allows you to create a context object that can be accessed by any component within its provider, making it easier to manage global state or shared data
- **`useContext`**: Hook that allows you to consume the context value in any functional component, making it easy to access shared data without prop drilling

### Simple Explanation from React.dev Principles

#### Real-World Analogy:
Think of it like a **building-wide intercom system**:
- **Without Context (Prop Drilling)**: You need to pass a message from the 10th floor to the 1st floor through every floor (9th, 8th, 7th...) even though those floors don't need the message
- **With Context**: Like having a building-wide intercom system - direct communication without involving middle floors

### Practical Implementation: User Authentication Context

#### Step 1: Create a Context - UserContext.js
```javascript
import { createContext } from "react";

// Create context with default values
const UserContext = createContext({
    loggedInUser: "Default User",
});

export default UserContext;
```

#### Step 2: Provide Context in App.js
If we want to manipulate/change the Default User anywhere or wherever we use it, we need to create a `UserContext.Provider` (wrap around the main App.js layer). This way, we get access to `loggedInUser` and `setUserName` throughout our application.

```javascript
import { useState, useEffect } from "react";
import UserContext from "./utils/UserContext";
import Header from "./components/Header";
import Body from "./components/Body";

const AppLayout = () => {
    const [userName, setUserName] = useState();

    // Authentication logic - simulate API call
    useEffect(() => {
        // API call to get user data
        const data = {
            name: "Akshay Saini",
        };
        setUserName(data.name);
    }, []);

    return (
        // Provide context to all child components
        <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
            <div className="app">
                <Header />
                <Body />
            </div>
        </UserContext.Provider>
    );
};

export default AppLayout;
```

#### Understanding the Provider Code:
- **`UserContext.Provider`**: Wraps the entire app to provide context values
- **`value` prop**: Contains the data and functions we want to share
- **`loggedInUser`**: Current user data accessible to all child components
- **`setUserName`**: Function to update user data from any child component

#### Step 3: Consume Context in Child Components

##### In Header.js:
```javascript
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const Header = () => {
    const { loggedInUser } = useContext(UserContext);

    return (
        <div className="header">
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                    <li className="font-bold">{loggedInUser}</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
```

##### In Body.js - Live Username Changing Feature:
Suppose we want to change the `loggedInUser` value from any component, we can use the `setUserName` function provided by the context.

```javascript
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const Body = () => {
    const { loggedInUser, setUserName } = useContext(UserContext);

    return (
        <div className="body">
            {/* Search section with live user name editing */}
            <div className="search">
                <label>UserName: </label>
                <input 
                    className="border border-black p-2 m-2"
                    value={loggedInUser}
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>
            
            {/* Restaurant container */}
            <div className="res-container flex flex-wrap">
                {/* Restaurant cards */}
            </div>
        </div>
    );
};

export default Body;
```

##### In RestaurantCard.js:
```javascript
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
    const { loggedInUser } = useContext(UserContext);
    const { resData } = props;
    const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } = resData?.info;

    return (
        <div className="res-card">
            <img src={CDN_URL + cloudinaryImageId} />
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{costForTwo}</h4>
            <h4>{sla?.deliveryTime} minutes</h4>
            <h4>User: {loggedInUser}</h4>
        </div>
    );
};

export default RestaurantCard;
```

### How Context Works:

1. **Create Context**: Define what data will be shared using `createContext()`
2. **Provide Context**: Wrap components that need access to the data with `Provider`
3. **Consume Context**: Use `useContext()` hook to access the data in any child component

### Key Benefits of useContext:

1. **Eliminates Prop Drilling**: Direct access to data without passing through intermediate components
2. **Global State Management**: Share data across multiple components easily
3. **Clean Code**: Reduces props clutter in intermediate components
4. **Dynamic Updates**: Changes in context automatically update all consuming components

### When to Use useContext:

#### Good Use Cases:
- **User Authentication**: Current user info needed across the app
- **Theme Settings**: Dark/light mode throughout the application
- **Language Preferences**: Internationalization data
- **Shopping Cart**: Cart items accessible from multiple components
- **Configuration Settings**: App-wide settings and preferences

#### When NOT to Use useContext:
- **Frequently Changing Data**: Context re-renders all consumers
- **Local Component State**: Data that only one component needs
- **Complex State Logic**: Use Redux or Zustand for complex state management
- **Performance-Critical Updates**: For high-frequency updates, consider other solutions

### Context vs Other State Management Solutions:

#### useContext (React Built-in):
- **Best For**: Simple global state, theme, user auth
- **Pros**: Built-in, simple to use, no extra dependencies
- **Cons**: Re-renders all consumers, limited optimization

#### Redux (External Library):
- **Best For**: Complex applications with intricate state logic
- **Pros**: Advanced features, time-travel debugging, middleware
- **Cons**: Boilerplate code, learning curve, external dependency

#### Zustand (External Library):
- **Best For**: Medium complexity apps, modern alternative to Redux
- **Pros**: Minimal boilerplate, TypeScript support, good performance
- **Cons**: External dependency, newer ecosystem

### Important Notes About Context:

- **Provider Scope**: Only components inside the Provider can access the context
- **Default Values**: Context uses default values when no Provider is found above in the tree
- **Re-rendering Behavior**: All components consuming the context re-render when context value changes
- **Performance Considerations**: For frequently changing data, consider optimization techniques like `useMemo` or splitting contexts

---

## Key Takeaways

### Higher Order Components:
- **Pattern**: Function that takes a component and returns an enhanced component
- **Use Cases**: Adding common functionality, authentication, logging, styling
- **Benefits**: Code reuse, separation of concerns, composability
- **Think Of It As**: A wrapper that adds features to existing components

### Controlled Components:
- **Definition**: Components whose state is managed by parent
- **Benefits**: Centralized control, predictable behavior, easy coordination
- **Implementation**: Pass state and updater functions as props
- **Think Of It As**: Remote-controlled components

### Lifting State Up:
- **When**: Multiple components need to share or coordinate state
- **How**: Move state to the nearest common ancestor
- **Result**: Single source of truth, better control over component behavior
- **Think Of It As**: Moving the TV remote from individual family members to the parent

### useContext Hook:
- **When**: Data needed by many components across the tree
- **How**: Create context, provide it, and consume with useContext hook
- **Result**: Avoid prop drilling, clean global state management
- **Think Of It As**: Building-wide intercom system for component communication

### React's Core Principles:
- **"Data flows down, events flow up"** - This principle applies to props
- **Context provides global access** - Direct communication without prop drilling
- **Choose the right tool** - Props for local, Context for global, Redux for complex state

This episode demonstrates how React's component composition patterns and state management tools enable building complex, interactive UIs while maintaining clean, maintainable code architecture. We can also use Redux for central data repository similar to how useContext works, providing even more advanced state management capabilities for larger applications.