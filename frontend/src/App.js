import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import Home from "./components/Body/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <StyledEngineProvider injectFirst>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about"></Route>
          <Route exact path="/contact"></Route>
        </Routes>
        <Footer />
      </StyledEngineProvider>
    </Router>
  );
}

export default App;
