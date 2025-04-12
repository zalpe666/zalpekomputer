import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import SideBar from "./side-bar";

const Navbar = () => {
  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Ambil user dari localStorage atau cookies
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    const cookieUser = Cookies.get("user");
    if (cookieUser) {
      user = JSON.parse(cookieUser);
      localStorage.setItem("user", cookieUser); // Optional: Simpan ulang ke localStorage
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Yakin ingin logout?",
      text: "Anda harus login kembali untuk mengakses fitur.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost/api-zalpe-komputer/api/logout.php", {
          credentials: "include",
        }).then(() => {
          Cookies.remove("user");
          localStorage.removeItem("user");
          navigate("/login");
          window.location.reload(); // Refresh agar Navbar re-render
        });
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom fixed-top">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          Zalpe Komputer
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="d-flex w-50 mx-auto my-auto">
          <input
            className="form-control me-2"
            type="search"
            placeholder="What are you looking for?"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>

        {/* Icons & Login/Logout */}
        <div className="d-flex align-items-center gap-3">
          {user ? (
            <>
              {/* Cart Icon */}
              <Link to="/cart" className="text-dark fs-4">
                <i className="bi bi-cart"></i>
              </Link>

              {/* Dropdown Profile */}
              <div className="dropdown">
                <a
                  href="#"
                  className="text-dark fs-4 dropdown-toggle text-decoration-none"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/zalpekomputer/user/profile"
                    >
                      <i className="bi bi-person-circle me-2"></i> My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/zalpekomputer/user/transaction"
                    >
                      <i className="bi bi-receipt me-2"></i> Transactions
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/zalpekomputer/mobile-banking"
                    >
                      <i className="bi bi-bank me-2"></i> M-Bank
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/zalpekomputer/user/wishlist"
                    >
                      <i className="bi bi-heart me-2"></i> Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/zalpekomputer/user/review"
                    >
                      <i className="bi bi-star me-2"></i> Reviews
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/zalpekomputer/user/address"
                    >
                      <i className="bi bi-geo-alt me-2"></i> Address
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item disabled" href="#">
                      <i className="bi bi-question-circle me-2"></i> Help &
                      Support
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item disabled" href="#">
                      <i className="bi bi-gear me-2"></i> Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item disabled" href="#">
                      <i className="bi bi-shield-lock me-2"></i> Admin Panel
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item text-danger"
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> Log Out
                    </button>
                  </li>
                </ul>
              </div>

              {/* Offcanvas for Mobile */}
              <a
                href="#offcanvasExample"
                className="text-dark fs-4 d-lg-none"
                data-bs-toggle="offcanvas"
                aria-controls="offcanvasExample"
              >
                <i className="bi bi-list"></i>
              </a>
              <div
                className="offcanvas offcanvas-start d-lg-none"
                tabIndex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                    Zalpe Komputer
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <SideBar />
                </div>
              </div>
            </>
          ) : (
            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-outline-primary btn-sm">
                <i className="bi bi-box-arrow-in-right me-1"></i> Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                <i className="bi bi-person-plus me-1"></i> Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
