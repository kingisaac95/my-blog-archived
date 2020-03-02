---
title: Cleaner and Modular Routing in React
date: 2019-10-10
---

![Interconnected Bubbles](./react-bubble.png)
[Image source](https://www.segment-routing.net/)


TL;DR: This is an article I wrote in preparation for my talk at [This Dot Media](https://www.thisdot.co/) meetup on October 10, 2019. Just stick with me and read the whole thing 😅

### Talk abstract:

Routing in a React application is usually straightforward and easy until it’s not. Creating and maintaining a modular routing pattern can ease the challenges that occur when the application grows larger and the routes that you have to manage increase like the speed of light. How can you maintain a clean and modular routing pattern? In this talk, we’ll answer that question by looking at real-world situations and applying the concepts we’ll learn to it.

Talk Demo: [Here](https://codesandbox.io/s/modular-routing-in-react-ww1og)

### Assumptions

* You understand what routing is, maybe even done routing in React before.

### Routing in React

We’re going to use `react-router` library, a popular routing tool for routing in React. It allows us to change the navigation of our web application without reloading the whole page(I know you know this 😜).

### Basic routing example

Let’s look at a basic routing example. Here we create routes for home, about and topics pages.

```javascript
<Router>
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
        </ul>
        <hr />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
    </div>
</Router>
```

Looking closely there’s nothing much going on here, so our routes are fine as is.

### When routing gets complex

When we start building larger components and the requirements for accessing them grows, we will start seeing ourselves do a lot of work(most times repetitive) like in the example below.

Below, we create routes for `Component1, Component2...ComponentN` and pass in required props including props passed directly to the component.

```javascript
<Route
  path="/path-to-wherever"
  render={compProps => (
    <Component1
      {...compProps}
      navAction={navAction}
      getCompletedStages={getCompletedStages}
    />
  )}
/>
<Route
  path="/another-path"
  render={compProps => (
    <Component2
      {...compProps}
      navAction={navAction}
      getCompletedStages={getCompletedStages}
      handleActorToggle={handleActorToggle}
    />
  )}
/>
<Route
  path="/yet-another-path"
  render={compProps => (
    <Component3
      {...compProps}
      navAction={navAction}
      deactivateInputs={deactivateInputs}
      handleActorToggle={handleActorToggle}
    />
  )}
/>
<Route
  path="/yet-another-path-to-wherever"
  render={compProps => (
    <Component4
      {...compProps}
      navAction={navAction}
    />
  )}
/>
```

There’s constant repetition done here. If we have 50 of those routes, our file will grow larger along with the repetitions we do. Over time, this file might end up being hard to read or follow. Also, if for any reason the methods like `deactivateInputs`, `navAction` or `handleActorToggle` have a unique function for each route, the list of props that this route file receives will scale geometrically.

```javascript
const {
  navActionRoute1,
  navActionRoute2,
  navActionRoute3...
  handleActorToggleRoute1,
  handleActorToggleRoute2,
  handleActorToggleRoute3...
} = props;
```

To avoid having to deal with that, we need to think differently about our routing and break it down to simpler modules that are more maintainable.

### Simplifying routing with modules

A CommonJS/ES6 module is essentially a reusable piece of JavaScript that exports specific objects, making them available for other modules to require in their programs.

Thinking of routes like modules, we can decide to create a structure where each route becomes a module and ‘cooks’ its own data requirements then export them.

### All tribes bear their father’s name

Each route will be represented by a folder(the father) and the route properties will be stored inside that folder(as a tribe bearing the father’s name).

```
- routes
    |- register.js
    |- login.js
    |- account
      - index.js
      - other-children
    |- not-found.js
    |- index.js
```

We’ll have these individual routes look like:

```javascript
import { Signup } from 'views/signup';
export default {
  title: 'Register Account',
  component: Signup,
  url: '/signup',
  exact: true,
  requirePermission: false,
};
```

In case we have some route-specific computations, we can easily handle them inside these individual route files. These routes(files) will then be imported into the `routes/index` file from where we export them as a single list of routes. It’ll look something like this:

```javascript
import login from 'views/login';
import register from 'views/register';
import account from 'views/account';
import notFound from 'views/not-found';
export default [
  login,
  register,
  account,
  notFound,
];
```

What we’ve basically done is:

1. Make each route an object(`{}`) that contains all the routes properties and export that object
2. Import all routes(route objects) into the base routes file
3. Export all the routes as an array(`[{}, {}, {}, ...]`) of route objects

With that, rendering our routes becomes a lot cleaner

```javascript
import routes from 'routes';
...
<Router>
  {
    routes.map(({
      title,
      component: Component,
      url,
      exact,
    }) => {
      return (
        <Route
          key={url}
          path={url}
          exact={exact}
          render={(compProps) => <Component {...compProps} title={title} />}
        />
      )
    })
  }
</Router>
```

### Handling authentication

Should we need to handle authentication in our routes, we can create a higher-order component(HOC) that renders any given component for each route. In the HOC we’ll determine if the user can visit a page or should be redirected to another page.

Here’s an example:

```javascript
const RoleBasedRoute = ({
  component: Component,
  userRoles,
  requiredPermissionRole,
  isSubscriptionExpired,
  ...rest
}) => {
  const hasAccessToRoute = false; // not real!
  const isSysAdmin = false; // not real!
if (!isSysAdmin && isSubscriptionExpired) {
    return (<Redirect to='/where-admins-go-😎' />);
  }
return (
    <Route
      {...rest}
      render={(props) => {
        if (hasAccessToRoute) {
          return (
            <Component {...props} />
          );
        }
        return (
          <Redirect
            to={{
              pathname: '/where-you-should-be',
            }}
          />
        );
      }}
    />
  );
};
```

### Conclusion

With modules, we are not limited to just one level of simplification. We can create as many sub-modules as we need to keep our routing simple.
For example, the /account route might render a dashboard, which in itself has many routes rendered in a sidebar component. We can create modules for the sidebar routes and neatly render them inside the accounts page, while still rendering our accounts page as a single module inside its parent component.

> “Simple can be harder than complex: You have to work hard to get your thinking clean to make it simple. But it’s worth it in the end because once you get there, you can move mountains.” — Steve Jobs