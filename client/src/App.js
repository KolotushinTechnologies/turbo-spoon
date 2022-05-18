// Import Engine
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Import Styles
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <h1>Hello, World!</h1>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
