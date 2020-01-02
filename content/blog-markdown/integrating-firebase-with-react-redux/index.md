---
title: Integrating Firebase with React-Redux
published: true
date: "2020-01-02"
tags: ["technology", "firebase", "react", "redux"]
unsplash-image-id: "f9bkzNQyylg"
description: "User authentication is a key pillar in most modern applications today. Setting it up, however, can sometimes be a bit tricky. In this post, I'll walk you through how to set up authentication with Google's Firebase using React with Redux."
---

Google's Firebase is a "_platform that helps you quickly develop high-quality apps and grow your business_". One of it's capabilities includes user authentication. Google makes setting this auth up within your application relatively straightforward, but their can be some quirks, which we'll discuss throughout this post. I will also be using [React-Redux](https://react-redux.js.org/) for global state management, showing some of the benefits there as well. With that said, let's start building our app!

> As a side note, you can always view the application we'll be creating in it's entirety here on my Github: https://github.com/thefrugaldev/firebase-react-redux

## Register your application

The first thing you'll want to do is create your firebase project. Assuming you're logged into a valid Google account, head over to the [Firebase console](https://console.firebase.google.com/) and create a new project. Once you've completed the setup process and given your project a name, click the _Authentication_ option on the left and then the _Sign-in method_ tab after that.

As you can see, Firebase offer a wide array of options to choose from when it comes to user authentication. To keep this post relatively simple, we're going to enable the Email/Password option. Once that's enabled, click the _Project Overview_ link on the left sidebar, and look for the Web icon (</>) on the center of the page.

Clicking this icon will walk you through the setup process for registering your application. After giving your app a nickname and selecting _Register App_, Google will give you a block of code to add their SDK to your application. You can ignore the majority of this as we'll be integrating Firebase into our app later on, but do take note of everything within the `firebaseConfig` variable, as we'll need this later on. It should look something like this:

```javascript
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqLJWJh7Y8RoX5R35lcLW6e2HND6HP094",
  authDomain: "test-app-c6570.firebaseapp.com",
  databaseURL: "https://test-app-c6570.firebaseio.com",
  projectId: "test-app-c6570",
  storageBucket: "test-app-c6570.appspot.com",
  messagingSenderId: "922987846764",
  appId: "1:922987846764:web:15fdbdd9611049f7090c49",
  measurementId: "G-5BNM7SLY03",
}
```

Now that we've got the registration process behind us, the fun can begin. Let's get to coding!

## Project Initialization

If you're not familiar with [create-react-app](https://github.com/facebook/create-react-app), it's an awesome command-line tool that quickly sets up a boilerplate react application for you in seconds. Assuming you have Node >= 8.10 and npm >= 5.6 on your machine, run the following command to create our firebase react application `npx create-react-app firebase-react-redux`

Once that process has completed, if you run `cd firebase-react-redux`, you should see quite a bit of files and directories that **create-react-app** generated for us. Let's test out our newly created application by running `yarn start` in the console. If everything works as expected, you should now see the following page boot up in your browser:

![React Application](./create-react-app.gif "react boilerplate application")

## Initial Components

With our React app up-and-running, we can start building out our application. We'll need to install a few dependencies first, so lets do that by stopping the application and running the following command in your terminal:

```bash
yarn add bulma firebase redux react-redux redux-thunk react-router-dom react-toastify
```

[Bulma](https://bulma.io/documentation/) is the styling framework we're going to be using with our application. Firebase is necessary to integrate with their auth platform. Redux and react-redux will allow us to manage global user state. Redux-thunk allows for asynchronous operations within redux. React-router-dom will allow for more declarative routing within our application, and react-toastify gives us a lightweight notification on successful actions performed by the user.

With those packages installed, let's create three components. One will require authentication, one will be public, and we'll also create the homepage. Inside of your `src` folder, create a new directory called `components` and create the following three files in that directory:

`gist:f6e4effc67086a888e45d228450060e0#private.js`
`gist:f6e4effc67086a888e45d228450060e0#public.js`
`gist:f6e4effc67086a888e45d228450060e0#home.js`

We'll also create a header component (`header.js`) inside the same directory that will link to our newly created pages.

```javascript
import React from "react"
import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <>
      <nav className="level">
        <NavLink to="/" exact className="link is-info">
          Home
        </NavLink>
        <NavLink to="/public" exact className="link is-info">
          Public
        </NavLink>
        <NavLink to="/private" exact className="link is-info">
          Private
        </NavLink>
      </nav>
    </>
  )
}

export default Header
```

Now we can update our App.js file and add some routes to our new components:

```javascript
import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "bulma/css/bulma.css"
// Components
import Home from "./components/home"
import Header from "./components/header"
import Public from "./components/public"
import Private from "./components/private"

function App() {
  return (
    <Router>
      <section className="section">
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/public" component={Public} />
            <Route path="/private" component={Private} />
          </Switch>
        </div>
      </section>
    </Router>
  )
}

export default App
```

If we boot up our app again (`yarn start`) you should see a very generic, styled application with working links to our new components!

## Firebase

Now that we've got a functioning application, let's start integrating it with Firebase so we can allow users to register and login to our application.

Under our `src` directory, create a new folder called `auth`. We're going to create two files here. The first will utilize the configuration object that Firebase gave us when we originally registered our application (we'll call it `config.js`). You'll want to make sure you add this file to your `.gitignore` since it will contain sensitive information that you wouldn't want stored in source control. This file should look something like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBqLJWJh7Y8RoX5R35lcLW6e2HND6HP094",
  authDomain: "test-app-c6570.firebaseapp.com",
  databaseURL: "https://test-app-c6570.firebaseio.com",
  projectId: "test-app-c6570",
  storageBucket: "test-app-c6570.appspot.com",
  messagingSenderId: "922987846764",
  appId: "1:922987846764:web:15fdbdd9611049f7090c49",
  measurementId: "G-5BNM7SLY03",
}

export { firebaseConfig }
```

The second file will be a wrapper to integrate with Firebase's SDK, and we'll name it `auth-service.js`:

```javascript
import firebase from "firebase/app"
import "firebase/auth"
import { firebaseConfig } from "./config"

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

// Helper method for initial load of site
// Firebase takes a second to determine currentUser object
// So we can use local storage for initial UI purposes
const getAuthenticationStatus = () => {
  return localStorage.getItem("isAuthenticated")
}

export { auth, getAuthenticationStatus }
```

We are exporting two things here, the first (`auth`) will give us direct integration into Firebase's SDK so we can utilize some of their methods for things like login, logout, and registration. The second is a helper method that will set a flag in localStorage, and you'll see later why that's necessary.

With Firebase ready to go, let's get Redux setup within our application.

## Redux

[Redux](https://redux.js.org/) is a library that assists with controlling and maintaining global state within an application. The `react-redux` dependency we installed earlier lets us use certain bindings for Redux within our React application. For the scope of this article, I'm going to assume you are somewhat familiar with Redux, as we'll be using it to maintain state in the context of users.

Lets create another directory under the `src` folder, and call it `redux`. We're going to drop four files in here.

The first is going to set up our global store within redux, we'll call this `configure-store.js`.

```javascript
import { createStore, applyMiddleware } from "redux"
import combinedReducers from "./combined-reducers"
import thunk from "redux-thunk"

export default function configureStore(initialState) {
  return createStore(combinedReducers, initialState, applyMiddleware(thunk))
}
```

Next, we'll create a file called `combined-reducers.js` to aggregate all reducers into one object that Redux can use. This will come in handy if we decide to add any future reducers outside the context of Firebase in the future.

```javascript
import { combineReducers } from "redux"
import currentUser from "./firebase-reducer"

const combinedReducers = combineReducers({
  currentUser,
})

export default combinedReducers
```

Now lets set up some actions. According to the [redux docs](https://redux.js.org/basics/actions), **_actions_** are _"payloads of information that send data from your application to your store."_ Let's start by creating a few actions (`firebase-actions.js`) to register and login to our application.

```javascript
import { auth } from "../auth/auth-service"

export const loginSuccess = () => {
  return {
    type: "LOGIN_SUCCESS",
    currentUser: auth.currentUser.toJSON(),
  }
}

export const registerSuccess = () => {
  return {
    type: "REGISTER_SUCCESS",
    currentUser: auth.currentUser.toJSON(),
  }
}

export const register = (email, password) => async dispatch => {
  try {
    await auth.createUserWithEmailAndPassword(email, password)
    dispatch(registerSuccess())
  } catch (error) {
    throw error
  }
}

export const login = (email, password) => async dispatch => {
  try {
    await auth.signInWithEmailAndPassword(email, password)
    dispatch(loginSuccess())
  } catch (error) {
    throw error
  }
}
```

As you can see, were importing the `auth` object we created earlier that gives us access to the Firebase SDK. We also have two methods, `register` and `login` that utilize this SDK. Assuming everything goes smoothly, we dispatch an action `loginSuccess` and `registerSuccess` and grab the current user from the same SDK. These actions will then be picked up by our reducer, which we'll create now (`firebase-reducer.js`):

```javascript
export default function firebaseReducer(state = null, action) {
  switch (action.type) {
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      return action.currentUser
    default:
      return state
  }
}
```

This reducer is relatively straightforward. It simply listens for either the `REGISTER_SUCCESS` or `LOGIN_SUCCESS` action, and returns the current user to our redux global state. Now that we are listening for these actions, let's create a few components to take advantage of these new capabilities.

## Login and Register Pages

We'll create two new files under our `components` directory, one to login (`login.js`) and one to register (`register.js`).

```javascript
import React, { createRef } from "react"
import { toast } from "react-toastify"
// Redux
import { connect } from "react-redux"
import { login } from "../redux/firebase-actions"

const Login = ({ login, history }) => {
  const email = createRef()
  const password = createRef()

  const handleSubmit = event => {
    event.preventDefault()
    login(email.current.value, password.current.value)
      .then(() => {
        toast.success("Login successful")
        history.push("/")
      })
      .catch(error => {
        toast.error("Login failed")
        console.error(error)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className="control">
        <input
          name="name"
          type="email"
          ref={email}
          placeholder="Email"
          className="input is-primary"
        />
      </div>

      <div className="control">
        <input
          name="password"
          type="password"
          ref={password}
          placeholder="Password"
          autoComplete="none"
          className="input is-primary"
        />
      </div>

      <div className="control">
        <button type="submit" className="button is-link">
          Submit
        </button>
      </div>
    </form>
  )
}

export default connect(
  null,
  { login }
)(Login)
```

Our login page may look intimidating at first, but let's digest it a bit. We're using the `createRef` method from react to gain access to the current values of the email and password input elements. We're also using `connect` from react-redux to pass our login action we just created in as a component prop. When the form is submitted, assuming everything looks ok, we're using the react-toastify library we installed earlier to notify the user that they successfully logged into the application, and then we are redirecting them back to the homepage via the `history` prop.

Our register component will look pretty similar:

```javascript
import React, { createRef } from "react"
import { toast } from "react-toastify"
// Redux
import { connect } from "react-redux"
import { register } from "../redux/firebase-actions"

const Register = ({ register, history }) => {
  const email = createRef()
  const password = createRef()

  const handleSubmit = event => {
    event.preventDefault()
    register(email.current.value, password.current.value)
      .then(() => {
        toast.success("Registration successful")
        history.push("/")
      })
      .catch(error => {
        toast.error("Registration failed")
        console.error(error)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <div className="control">
        <input
          name="name"
          type="email"
          ref={email}
          placeholder="Email"
          className="input is-primary"
        />
      </div>

      <div className="control">
        <input
          name="password"
          type="password"
          ref={password}
          placeholder="Password"
          autoComplete="none"
          className="input is-primary"
        />
      </div>

      <div className="control">
        <button type="submit" className="button is-link">
          Submit
        </button>
      </div>
    </form>
  )
}

export default connect(
  null,
  { register }
)(Register)
```

With both of these components ready to go, let's add them into our header, so users can navigate to the register and login pages:

```javascript
import React from "react"
import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <>
      <nav className="level">
        <NavLink to="/" exact className="link is-info">
          Home
        </NavLink>
        <NavLink to="/public" exact className="link is-info">
          Public
        </NavLink>
        <NavLink to="/private" exact className="link is-info">
          Private
        </NavLink>
        <NavLink to="/login" className="link is-info">
          Login
        </NavLink>
        <NavLink to="/register" className="link is-info">
          Register
        </NavLink>
      </nav>
    </>
  )
}

export default Header
```

We'll also want to make sure we add our Routes, as well as a ToastContainer and ReactToastify.css (to show toast notifications) to our application's `App.js` file:

```javascript
import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "bulma/css/bulma.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// Components
import Home from "./components/home"
import Header from "./components/header"
import Public from "./components/public"
import Private from "./components/private"
import Login from "./components/login"
import Register from "./components/register"

function App() {
  return (
    <Router>
      <section className="section">
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/public" component={Public} />
            <Route path="/private" component={Private} />

            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>

          <ToastContainer autoClose={3000} hideProgressBar />
        </div>
      </section>
    </Router>
  )
}

export default App
```

In order to wire up redux, we'll want to add a ReduxProvider to the `index.js` file at the root of our `src` directory:

```javascript
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
//Redux
import configureStore from "./redux/configure-store"
import { Provider as ReduxProvider } from "react-redux"

const store = configureStore()

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById("root")
)

serviceWorker.unregister()
```

We've done a lot so far. Let's stop our application (if it's currently running) and reboot using the `yarn start` command to test it out. If you navigate to the Registration page using the link in the header, and submit a fake email and password, you should be redirected to the homepage and a green toast notification should confirm your registration!

If you navigate to the Login page and attempt to login using the same email and password, you should see the same behavior there as well. Our application is still not where we want it, however.

You'll notice after logging in that you still have a login and register link at the top. From a logged-in user's perspective, they really should be seeing a logout link instead. We also haven't prevented users who aren't logged in from seeing the private page we created at the beginning of this tutorial. We should fix that as well.

> Quick note, you can also view information about registered users in the [Firebase console](https://console.firebase.google.com/) by clicking on the `Authentication` tab we looked at earlier.

![Firebase Console](./registered-users.png "firebase console registered users")

## Additional Components

Let's give our users the ability to logout when they're finished using our application. We're going to update our `firebase-actions.js` file to include two new methods, one to allow the user to logout and another to fetch the `currentUser` object using the `onAuthStateChanged` method, which is the preferred method according to [Firebase's documentation](https://firebase.google.com/docs/auth/web/manage-users).

```javascript
import { auth } from "../auth/auth-service"

export const loginSuccess = () => {
  return {
    type: "LOGIN_SUCCESS",
    currentUser: auth.currentUser.toJSON(),
  }
}

export const registerSuccess = () => {
  return {
    type: "REGISTER_SUCCESS",
    currentUser: auth.currentUser.toJSON(),
  }
}

export const register = (email, password) => async dispatch => {
  try {
    await auth.createUserWithEmailAndPassword(email, password)
    dispatch(registerSuccess())
  } catch (error) {
    throw error
  }
}

export const login = (email, password) => async dispatch => {
  try {
    await auth.signInWithEmailAndPassword(email, password)
    dispatch(loginSuccess())
  } catch (error) {
    throw error
  }
}

export const logout = () => async dispatch => {
  try {
    await auth.signOut()
    dispatch({ type: "LOGOUT", currentUser: auth.currentUser })
  } catch (error) {
    throw error
  }
}

export const fetchUser = () => async dispatch => {
  try {
    await auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        localStorage.setItem("isAuthenticated", true)
        dispatch({
          type: "FETCH_USER",
          currentUser: currentUser.toJSON(),
        })
      } else {
        localStorage.removeItem("isAuthenticated")
        dispatch({
          type: "FETCH_USER",
          currentUser: null,
        })
      }
    })
  } catch (error) {
    throw error
  }
}
```

One thing to note in the `fetchUser` method is that we are setting a boolean flag in localStorage when a user authenticates or logs out. This will help us quickly determine whether a user is logged in for UI purposes, which we'll discuss in just a bit.

We'll also need to update `firebase-reducer.js` to make sure the store is updated when these new actions are dispatched:

```javascript
export default function firebaseReducer(state = null, action) {
  switch (action.type) {
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
    case "LOGOUT":
    case "FETCH_USER":
      return action.currentUser
    default:
      return state
  }
}
```

Let's ensure the `fetchUser` method is called when our application is first loaded in the browser by adding it to our `App.js` file:

```javascript
import React, { useLayoutEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "bulma/css/bulma.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// Redux
import { connect } from "react-redux"
import { fetchUser } from "./redux/firebase-actions"
// Components
import Home from "./components/home"
import Header from "./components/header"
import Public from "./components/public"
import Private from "./components/private"
import Login from "./components/login"
import Register from "./components/register"

function App({ fetchUser }) {
  useLayoutEffect(() => {
    fetchUser()
  }, [])

  return (
    <Router>
      <section className="section">
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/public" component={Public} />
            <Route path="/private" component={Private} />

            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>

          <ToastContainer autoClose={3000} hideProgressBar />
        </div>
      </section>
    </Router>
  )
}

export default connect(
  null,
  { fetchUser }
)(App)
```

Finally, lets update our `header.js` file to ensure that a user does not see the Login or Register links once they are logged in, and instead see a link to Log Out.

```javascript
import React, { useLayoutEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { toast } from "react-toastify"
import { getAuthenticationStatus } from "../auth/auth-service"
// Redux
import { connect } from "react-redux"
import { logout } from "../redux/firebase-actions"

const Header = ({ logout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useLayoutEffect(() => {
    setIsAuthenticated(getAuthenticationStatus())
  })

  const handleLogout = event => {
    event.preventDefault()
    logout()
    toast.success("Logout successful")
  }

  return (
    <>
      <nav className="level">
        <NavLink to="/" exact className="link is-info">
          Home
        </NavLink>
        <NavLink to="/public" exact className="link is-info">
          Public
        </NavLink>
        <NavLink to="/private" exact className="link is-info">
          Private
        </NavLink>
        {isAuthenticated ? (
          <>
            <NavLink onClick={handleLogout} to="/" className="link is-info">
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login" className="link is-info">
              Login
            </NavLink>
            <NavLink to="/register" className="link is-info">
              Register
            </NavLink>
          </>
        )}
      </nav>
    </>
  )
}

const mapStateToProps = ({ currentUser }) => {
  return { currentUser }
}

export default connect(
  mapStateToProps,
  { logout }
)(Header)
```

If you're logged into the application, our nav menu should now only display a logout link. Click this link and you should now see the navigation menu update, displaying our original login and register links from before. Looks like it's working, good job!

## Private Routes

Our users are now able to log into and out of the application at will. We still have one more thing to do, however. If you recall at the beginning of this tutorial, we created a private component that we only wanted logged-in users to access. That's not working at the moment, so let's see if we can fix that.

Let's create a new component under the `components` directory and call it `private-route.js`. This will serve as an additional route we can use for pages that we don't want un-authenticated users to see.

```javascript
import React from "react"
import { getAuthenticationStatus } from "../auth/auth-service"
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        getAuthenticationStatus() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
```

[Firebase's documentation](https://firebase.google.com/docs/auth/web/manage-users) recommends using the `onAuthStateChanged` method to determine whether a current user is logged in or not. However, there are some quirks that happen under the hood that make this a bit of a nuisance in this scenario.

Essentially, the method that they recommend first returns an **_initializing_** status before ultimately returning the **_currentUser_** object. If we went this direction, our navigation and private-route components would first assume the user is not logged in during the **_initializing_** phase, showing the incorrect nav menu, and then re-render after the `currentUser` object is returned. This would create a negative user experience for our end users.

With that being said, we'll instead check whether a user is logged in by using the `getAuthenticationStatus` method we created earlier, which checks the localStorage behind the scenes.

With this private route component in place, lets update our `App.js` file to ensure our `private.js` component is only accessible if a user is logged in:

```javascript
import React, { useLayoutEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "bulma/css/bulma.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// Redux
import { connect } from "react-redux"
import { fetchUser } from "./redux/firebase-actions"
// Components
import Home from "./components/home"
import Header from "./components/header"
import Public from "./components/public"
import Private from "./components/private"
import Login from "./components/login"
import Register from "./components/register"
import PrivateRoute from "./components/private-route"

function App({ fetchUser }) {
  useLayoutEffect(() => {
    fetchUser()
  }, [])

  return (
    <Router>
      <section className="section">
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/public" component={Public} />
            <PrivateRoute path="/private" component={Private} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>

          <ToastContainer autoClose={3000} hideProgressBar />
        </div>
      </section>
    </Router>
  )
}

export default connect(
  null,
  { fetchUser }
)(App)
```

If you log out of the application and try accessing our private component from the navigation menu, you'll notice that you are redirected back to the home page. If you log in, however, you'll see that you can access it just as we could before!

## Conclusion

That should do it! You're app should now be up and running with the ability to register, log in, and log out users utilizing Redux with Firebase authentication. I hope you learned a bit as you followed along, and make sure to come back and check out other articles similar to this one on [my blog](https://thefrugal.dev/blog) :smile:
