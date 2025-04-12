import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const discountedPrice =
    product.discount_status === 1
      ? product.price?.toLocaleString()
      : product.price_default?.toLocaleString();
  const originalPrice =
    product.discount_status === 1
      ? product.price_default?.toLocaleString()
      : null;

  return (
    <div className="card card-product border-1 rounded-3">
      {/* Badge Diskon */}
      {product.discount_status === 1 && (
        <div
          className="badge bg-danger text-white position-absolute px-2 py-1"
          style={{ top: "0.5rem", right: "0.5rem", fontSize: "0.9rem" }}
        >
          -{product.discount}%
        </div>
      )}

      {/* Gambar Produk */}
      <a href={`/product/${product.slug}`} className="text-decoration-none">
        <img
          src={product.photo}
          className="card-img-top rounded-top-3"
          data-bs-toggle="tooltip"
          title={product.name}
          alt={product.name}
        />
      </a>

      {/* Konten Card */}
      <div
        className="card-body d-flex flex-column justify-content-between"
        style={{ minHeight: "175px" }}
      >
        {/* Nama Produk */}
        <h5
          className="card-title fw-semibold mb-0"
          style={{
            fontSize: "0.8rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {product.name}
        </h5>

        {/* Kategori dan ID */}
        <p className="text-muted text-truncate mb-0">
          {product.categories} | {product.subcategories}
        </p>

        {/* Harga dan Diskon */}
        <div>
          <span className="text-success fw-bold" style={{ fontSize: "1rem" }}>
            Rp {discountedPrice}
          </span>
          {originalPrice && (
            <>
              <br />
              <span
                className="text-muted text-decoration-line-through"
                style={{ fontSize: "0.9rem" }}
              >
                Rp {originalPrice}
              </span>
            </>
          )}
        </div>
        <div>
          <div className="d-block d-md-none">
            <span style={{ fontSize: "0.9rem" }}>
              {product.average_rating} ({product.rated_user_count})
            </span>
            &nbsp;-&nbsp;
            <span style={{ fontSize: "0.9rem" }}>
              {product.transaction_count} Sold
            </span>
          </div>
          <div className="d-none d-md-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <i className="bi bi-star-fill text-warning me-1"></i>
              <span style={{ fontSize: "0.9rem" }}>
                {product.average_rating} ({product.rated_user_count})
              </span>
            </div>
            <span style={{ fontSize: "0.9rem" }}>
              {product.transaction_count} Sold
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
