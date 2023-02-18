import './App.css'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

function App() {
  return (
    <Router>
      <StyledEngineProvider injectFirst>
        <Header />
        <Routes>
          <Route exact path="/"></Route>
          <Route exact path="/about"></Route>
          <Route exact path="/contact"></Route>
        </Routes>
        <Footer />
      </StyledEngineProvider>
    </Router>
  );
}

export default App;
