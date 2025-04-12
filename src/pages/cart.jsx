import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LoadingPage from "../components/loading-page";

const user = JSON.parse(Cookies.get("user") || "{}");

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, [user.id]);

  const fetchCart = () => {
    fetch("http://localhost/api-zalpe-komputer/api/showCart.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_user: user.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data.cart || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data keranjang:", err);
        setLoading(false);
      });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    fetch("http://localhost/api-zalpe-komputer/api/updateCart.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, quantity }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCart((prevCart) =>
            prevCart.map((item) =>
              item.id === id
                ? { ...item, quantity, total_harga: item.price * quantity }
                : item
            )
          );
        }
      })
      .catch((err) => {
        console.error("Gagal update quantity:", err);
      });
  };

  const subtotal = cart.reduce((acc, item) => acc + item.total_harga, 0);

  if (loading) return <LoadingPage />;

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mt-3">
        <ol className="breadcrumb text-truncate">
          <li className="breadcrumb-item">
            <a href="/" className="text-success text-decoration-none">Home</a>
          </li>
          <li className="breadcrumb-item active">
            <a href="/cart" className="text-success text-decoration-none">Cart</a>
          </li>
        </ol>
      </nav>

      {/* Cart Table */}
      <div className="container">
        {cart.length === 0 ? (
          <p>Keranjang kamu kosong.</p>
          // Trigger No Data
        ) : (
          <div className="table-responsive">
            <table className="table table-borderless align-middle">
              <thead className="table-light">
                <tr>
                  <th>Gambar</th>
                  <th>Nama Produk</th>
                  <th>Harga</th>
                  <th>Jumlah</th>
                  <th>Total Harga</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.photo}
                        alt={item.name}
                        width="80"
                        className="img-thumbnail"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>Rp {item.price.toLocaleString()}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>Rp {item.total_harga.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-end mt-3">
              <h5>Subtotal: Rp {subtotal.toLocaleString()}</h5>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
