import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const SideBar = () => {
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
    <div>
      <div className="d-md-none">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="search product"
        />
      </div>
      <ul class="list-group">
        <li class="list-group-item border-0 d-flex justify-content-between align-items-center">
          <a
            href="/products"
            class="text-decoration-none text-black"
          >
            Product
          </a>
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="list-group-item border-0 d-flex justify-content-between align-items-center">
          <a
            href="/brands"
            class="text-decoration-none text-black"
          >
            Brand
          </a>
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="list-group-item border-0 d-flex justify-content-between align-items-center">
          <a
            href="/categories"
            class="text-decoration-none text-black"
          >
            Categories
          </a>
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="list-group-item border-0 d-flex justify-content-between align-items-center">
          <a
            href="/flash-sale"
            class="text-decoration-none text-black"
          >
            Discount
          </a>
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="list-group-item border-0 d-flex justify-content-between align-items-center">
          <a
            href="/flash-sale"
            class="text-decoration-none text-black"
          >
            New Arrivals
          </a>
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="list-group-item border-0 d-flex justify-content-between align-items-center">
          <a
            href="/flash-sale"
            class="text-decoration-none text-black"
          >
            Best Seller
          </a>
          <i class="bi bi-chevron-right"></i>
        </li>
        
      </ul>
    </div>
  );
};

export default SideBar;
