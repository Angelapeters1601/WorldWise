import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./PageNotFound";
import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
