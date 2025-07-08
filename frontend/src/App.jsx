import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
    <div className="min-h-screen w-full [background:radial-gradient(125%_125%_at_50%_100%,#000_40%,#29536E_100%)]">
      <header className="sticky top-0">
        <Navbar />
      </header>
      <main className="p-2">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<PaymentSuccess />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
