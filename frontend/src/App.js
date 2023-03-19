import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { StyledEngineProvider } from "@mui/material/styles";
import Home from "./components/Body/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import BecomeSeller from "./components/Body/BecomeSeller/BecomeSeller";
import CategoryProducts from "./components/Body/CategoryProducts/CategoryProducts";
import ProductDetails from "./components/Body/ProductDetails/ProductDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <StyledEngineProvider injectFirst>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/categories" element={<CategoryProducts />}></Route>
            <Route exact path="/become-a-seller" element={<BecomeSeller />}></Route>
            <Route exact path="/about"></Route>
            <Route exact path="/contact"></Route>
            <Route exact path="/:productSlug" element={<ProductDetails />}></Route>
          </Routes>
          <Footer />
        </StyledEngineProvider>
      </Router>
    </div>
  );
}

export default App;
