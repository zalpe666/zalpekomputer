import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import CategoriesList from "./pages/categories-list";
import NotFound from "./pages/notfound";
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import Swal from "sweetalert2"; // Import SweetAlert2
import Navbar from "./components/navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Footer from "./components/footer";
import Products from "./pages/products";
import ProductDetail from "./pages/product-details";
import CategoriesAll from "./pages/categories-all";
import BrandAll from "./pages/brands-all";
import ScrollToTopButton from "./components/scrool-to-top";
import Faqs from "./pages/info/faqs";
import Shipping from "./pages/info/shipping";
import ReturnPolicy from "./pages/info/return-policy";
import Warranty from "./pages/info/warranty";
import TrackOrder from "./pages/info/track-order";
import BrandList from "./pages/brand-list";
import Cart from "./pages/cart";
import Search from "./pages/search";

const App = () => {
  const handleLogout = async () => {
    Swal.fire({
      title: "Anda yakin ingin logout?",
      text: "Anda harus login kembali untuk mengakses akun.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Logout!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch("http://localhost/api-zalpe-komputer/api/logout.php", {
          credentials: "include",
        });

        localStorage.removeItem("user");

        Swal.fire({
          title: "Logout Berhasil!",
          text: "Anda telah keluar dari akun.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/login";
        });
      }
    });
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route path="/categories/:name" element={<CategoriesList />} />
          <Route path="/categories" element={<CategoriesAll />} />
          <Route path="/brands" element={<BrandAll />} />
          <Route path="/brands/:name" element={<BrandList />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/search" element={<Search />} />
          {/* Transaction  */}
          <Route path="/cart" element={<Cart />} />
          {/* User Info */}
          <Route path="/info/faqs" element={<Faqs />} />
          <Route path="/info/shipping" element={<Shipping />} />
          <Route path="/info/return-policy" element={<ReturnPolicy />} />
          <Route path="/info/warranty" element={<Warranty />} />
          <Route path="/info/track-order" element={<TrackOrder />} />
          

          {/* Exception */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ScrollToTopButton />
      <Footer />
    </>
  );
};

export default App;
