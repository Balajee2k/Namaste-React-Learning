### Q.Monolithic vs Microservices
- **Monolithic Architecture**: A single, unified codebase where all components are interconnected and interdependent. Easier to develop initially but harder to scale and maintain as the application grows.
- **Microservices Architecture**: An approach where the application is divided into smaller, independent services that communicate over a network. Each service can be developed, deployed, and scaled independently, allowing for greater flexibility and resilience.

  **Key Differences**
- **Development**: Monolithic applications are easier to develop initially due to their simplicity, while microservices require more upfront design and architecture planning.
- **Scalability**: Microservices allow for independent scaling of services, while monolithic applications require scaling the entire application.
- **Deployment**: Microservices can be deployed independently, allowing for faster updates and rollbacks. Monolithic applications require redeploying the entire application for any change.
- **Fault Isolation**: In microservices, if one service fails, it does not necessarily bring down the entire application. In a monolithic architecture, a failure in one part can affect the whole system.

  **When to Use Each**
- **Monolithic**: Best for small to medium-sized applications where rapid development is needed, and the team is small. It can be easier to manage and deploy.
- **Microservices**: Ideal for large, complex applications that require scalability, flexibility, and independent deployment. It is suitable for teams that can manage the complexity of distributed systems.

### 2.Two ways to fetch the data in the UI
- First way: Load -> API -> Render: In this approach, the UI fetches data from the API and then renders it. This is a straightforward method but can lead to performance issues if the API is slow or if there are many requests.
- Second way: Load -> Render -> API -> Re-Render: In this approach, the UI renders first and then fetches data from the API. This can improve perceived performance as the UI is responsive while data is being fetched, but it requires careful handling of loading states and potential data inconsistencies.
- In React, we are using the second way.

### Before going to the next topic (that is dynamically taking data from API and creating and all), let's see useEffect() hooks.
- **useEffect()**: Is called after the component renders (means after the render cycle). It takes two arguments: one is an arrow function and the second is a dependency array.
Eg:
```javascript
import React, { useState, useEffect } from 'react';
function ExampleComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // This code runs after the component mounts
    console.log("useEffect has been called");
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (  
    <div>
      {data ? <p>{data}</p> : <p>Loading...</p>}
    </div>
  );
}
```
Now you see here why we use the useEffect() hook, because it is called after the component render cycle. If we put the API call inside the component, then it will be called before the render cycle and we will not get the data in the UI.
So basically, for using the second way of fetching the data, we need to use the useEffect() hook.

### Q.What is CORS?
- **CORS (Cross-Origin Resource Sharing)**: A security feature implemented by web browsers to prevent malicious websites from making requests to a different domain than the one that served the web page. It allows servers to specify who can access their resources and how.

- **How CORS Works**: When a web page makes a request to a different domain (cross-origin), the browser sends an HTTP request with an `Origin` header. The server can respond with specific headers (`Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, etc.) to indicate whether the request is allowed. If the response does not include the appropriate headers, the browser will block the request.

### Optimising the UI
- Now we did render the data from API, but if we don't have mock data, then for a few seconds React has an empty resList, which means it shows a blank screen for a few seconds. So for optimising the UI, we can use a loading spinner, but this is still not good, so we can use **skeleton loading**, which is a placeholder that mimics the structure of the content that will be loaded. It provides a better user experience by giving users a visual indication that content is being loaded, rather than showing a blank screen or a loading spinner.
- Now how do we do this? We use Shimmer UI, which means making fake cards just to show fake UI before loading the actual data. This is done by creating a skeleton component that resembles the final content but is styled to look like a loading state.

### Let's understand the depth of useState() hook, like when we need it?
- Let's understand this by making a feature in our food store app, and that feature is: I create a login button, and when I click on it, it shows Logout. Initially, it's Login, but when we click, it should change to Logout, and when we click on Logout, it should change to Login.
```javascript
// see in header.js file
```
So, but from this many questions can be asked like:
- **How does const variable change btnName** when you click on it? Because this is a powerful React function. So, when you call this useState, then this time it calls the whole return again, meaning it re-renders everything again, and this time btnName value is changed, like a new variable of btnName is seen with a new value.
- See, what React does is just use this hook and they do everything about reconciliation and all is working behind the scene.

- Rendering is done again because of the hook if you update or want to, but in the actual DOM, if anything is changed, then only it will re-render the DOM.

- Whenever a state variable updates, React triggers a reconciliation cycle (React re-rendering).
Eg: See, I made a search bar on our App. So, type each keyword and at each key press, React renders the UI each time, so the whole body is rendered again and again.

### A bug solving in filter out restaurant:
- If we filter once the restaurant either by search or clicking on Top restaurant, and when we next time want to search again, then from only filtered cards it's searched, not from all cards.
- **How do we fix?**:
- Just make another copy of listOfRestaurant that is filteredRestaurant, so that when filtered, the filtered data is stored in filteredRestaurant, but the main listOfRestaurant is not changed. See code for better understanding (body.js).