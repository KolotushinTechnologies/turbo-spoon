// Import Engine
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { getMyUserProfile } from "./actions/users";
import { LOGOUT } from "./actions/types";
import setAuthToken from "./utils/setAuthToken";

// Import Components
import Header from "./components/layout/Header/Header";
import Alert from "./components/alert/Alert";
import Footer from "./components/layout/Footer/Footer";
import MainPage from "./components/mainPage/MainPage";
import ProductsPage from "./components/products/ProductsPage";
import ProductPage from "./components/product/ProductPage";
import MyProfile from "./components/dashboard/MyProfile";
import FavoritesPage from "./components/favorites/FavoritesPage";
import BasketPage from "./components/basket/BasketPage";

// Import Styles
import "./App.css";

function App() {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(getMyUserProfile());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <Alert />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route
              path="dashboard"
              element={<PrivateRoute component={MyProfile} />}
            />
            <Route
              path="favorites"
              element={<PrivateRoute component={FavoritesPage} />}
            />
            <Route
              path="my-basket"
              element={<PrivateRoute component={BasketPage} />}
            />
          </Routes>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
