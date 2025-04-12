import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2"; // SweetAlert2

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Cek apakah user sudah login dari cookie
  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost/api-zalpe-komputer/api/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include", // Supaya cookie session terbaca dari server
        }
      );
      const data = await response.json();

      if (response.ok && data.user) {
        // Simpan session di cookie agar tidak hilang saat tab ditutup
        Cookies.set("user", JSON.stringify(data.user), { expires: 1 }); // 1 hari

        Swal.fire({
          title: "Login Berhasil!",
          text: `Selamat datang, ${data.user.name || "User"}!`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/"); // Redirect setelah user klik OK
        });
      } else {
        Swal.fire({
          title: "Login Gagal!",
          text: data.message || "Login failed, please try again",
          icon: "error",
          confirmButtonText: "Coba Lagi",
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Network error, please check your connection");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
