import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

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
          localStorage.removeItem("user");
          navigate("/login");
        });
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom fixed-top">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          Zalpe Komputer
        </Link>

        {/* Navbar Toggle Button (Mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Search Bar */}
          <form
            action="/zalpekomputer/search/"
            method="GET"
            className="d-flex w-50 w-md-50 mx-md-auto my-auto"
          >
            <input
              className="form-control me-2"
              type="search"
              id="search-input"
              placeholder="What are you looking for?"
              aria-label="Search"
            />
            <button className="btn btn-outline-secondary" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>

          <div className="ms-auto d-flex align-items-center">
            {user ? (
              <>
                <Link to="#" className="text-dark me-2 fs-4">
                  <i className="bi bi-heart"></i>
                </Link>
                <Link to="/zalpekomputer/cart" className="text-dark me-2 fs-4">
                  <i className="bi bi-cart"></i>
                </Link>
                <div className="dropdown">
                  <Link
                    to="#"
                    className="text-dark fs-4 dropdown-toggle text-decoration-none"
                    id="profileDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person"></i>
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-start">
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/zalpekomputer/user/profile"
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/zalpekomputer/user/transaction"
                      >
                        Transaction
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/zalpekomputer/mobile-banking"
                      >
                        M-Bank
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/zalpekomputer/user/wishlist"
                      >
                        Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/zalpekomputer/user/review"
                      >
                        Reviews
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/zalpekomputer/user/address"
                      >
                        Address
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item disabled" to="#">
                        Help & Support
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item disabled" to="#">
                        Setting
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item disabled" to="#">
                        Admin Panel
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right m-2"></i> Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-primary" to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-primary" to="/login">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
