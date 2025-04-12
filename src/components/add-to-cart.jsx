import { useState } from "react";
import Swal from "sweetalert2";
import api from "../../axios"; // pastikan path sesuai

const AddToCart = ({ idUser, idProduct, priceProduct }) => {
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("addToCart.php", {
        id_user: idUser,
        id_product: idProduct,
        quantity,
      })
      .then((res) => {
        Swal.fire({
          title: "Berhasil!",
          text: res.data.message || "Berhasil ditambahkan ke keranjang!",
          icon: "success",
          confirmButtonText: "OK",
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Gagal:", err);
        Swal.fire({
          title: "Gagal!",
          text: "Terjadi kesalahan saat menambahkan ke keranjang.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const increment = () => setQuantity((prev) => (prev < 10 ? prev + 1 : 10));
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const totalPrice = quantity * priceProduct;

  return (
    <>
      <div className="mb-3">
        <strong>Total Harga: </strong>
        Rp {totalPrice.toLocaleString("id-ID")}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex align-items-center">
          <button
            type="button"
            onClick={decrement}
            className="btn btn-outline-secondary"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setQuantity(isNaN(val) || val < 1 ? 1 : val);
            }}
            className="form-control mx-2 text-center"
            style={{ width: "60px" }}
            min="1"
            max="10"
            required
          />
          <button
            type="button"
            onClick={increment}
            className="btn btn-outline-secondary"
          >
            +
          </button>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Tambah ke Keranjang
        </button>
      </form>
    </>
  );
};

export default AddToCart;
