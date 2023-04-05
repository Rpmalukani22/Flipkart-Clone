/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import { StyledEngineProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import BecomeSeller from "./components/Body/BecomeSeller/BecomeSeller";
import CategoryProducts from "./components/Body/CategoryProducts/CategoryProducts";
import Home from "./components/Body/Home/Home";
import ProductDetails from "./components/Body/ProductDetails/ProductDetails";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Admin from "./components/Body/Admin/Admin";

function App() {
  return (
    <div className="App">
      <Router>
        <StyledEngineProvider injectFirst>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route
              exact
              path="/categories"
              element={<CategoryProducts />}
            ></Route>
            <Route
              exact
              path="/become-a-seller"
              element={<BecomeSeller />}
            ></Route>
            <Route exact path="/about"></Route>
            <Route exact path="/contact"></Route>
            <Route exact path="/admin" element={<Admin />}></Route>
            <Route
              exact
              path="/:productSlug"
              element={<ProductDetails />}
            ></Route>
          </Routes>
          <Footer />
        </StyledEngineProvider>
      </Router>
    </div>
  );
}

export default App;