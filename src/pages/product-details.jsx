import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingPage from "../components/loading-page";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ReviewProduct from "../components/product/review-product";
import RecomendationBrand from "../components/product/recomendation-brand";
import RecomendationCategories from "../components/product/recomendation-categories";
import RecomendationRandom from "../components/product/recomendation-random";
import AddToCart from "../components/add-to-cart";
import Cookies from "js-cookie";
const user = JSON.parse(Cookies.get("user") || "{}");

const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState("review");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost/api-zalpe-komputer/api/productBySlug.php?slug=${slug}`
        );
        const data = await response.json();

        if (response.ok) {
          setProduct(data);
        } else {
          setError(data.error || "Produk tidak ditemukan");
        }
      } catch (err) {
        setError("Gagal mengambil data produk");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <LoadingPage />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-5 border-end">
              <div
                className="card border-0"
                style={{ position: "sticky", top: "50px", zIndex: 100 }}
              >
                <div className="card-body text-center">
                  {product?.discount_status === 1 && (
                    <div
                      className="badge bg-danger text-white position-absolute px-2 py-1"
                      style={{
                        top: "1.5rem",
                        right: "1.5rem",
                        fontSize: "0.9rem",
                      }}
                    >
                      -{product.discount}%
                    </div>
                  )}
                  <img
                    src={product?.photo}
                    alt={product?.name}
                    className="img-fluid rounded"
                    style={{
                      width: "500px",
                      display: "block",
                      margin: "0",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <nav aria-label="breadcrumb" className="mt-3">
                <ol className="breadcrumb text-truncate">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-success text-decoration-none">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link
                      to="/products"
                      className="text-success text-decoration-none"
                    >
                      Product
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active text-black w-100 text-truncate d-none d-md-inline"
                    title={product.name}
                    style={{
                      maxWidth: "400px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.name}
                  </li>
                </ol>
              </nav>
              <div>
                <h3 className="card-title mb-1">{product.name}</h3>
                {product.discount_status === 1 ? (
                  <>
                    <h5 className="mb-1 text-success">
                      Rp {new Intl.NumberFormat("id-ID").format(product.price)}
                    </h5>
                    <del className="mb-2">
                      Rp{" "}
                      {new Intl.NumberFormat("id-ID").format(
                        product.price_default
                      )}
                    </del>
                  </>
                ) : (
                  <h5 className="mb-1 text-success">
                    Rp {new Intl.NumberFormat("id-ID").format(product.price)}
                  </h5>
                )}
                <p className="d-flex align-items-center gap-1">
                  {product.average_rating}
                  <i className="bi bi-star-fill text-warning"></i>
                  <span className="text-muted">
                    ({product.rated_user_count}) • {product.transaction_count}{" "}
                    sold
                  </span>
                </p>
                <Tabs
                  defaultActiveKey="details"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="details" title="Details">
                    <table className="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td className="fw-bold">Product ID:</td>
                          <td>{product.id}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Availability:</td>
                          <td>In Stock</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Brand:</td>
                          <td>{product.brand}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Categories:</td>
                          <td>
                            {product.categories} - {product.subcategories}
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Weight:</td>
                          <td>{product.weight} Grams</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Shipping:</td>
                          <td>
                            <small>
                              01 day shipping.{" "}
                              <span className="text-muted">
                                (Free pickup today)
                              </span>
                            </small>
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Created At:</td>
                          <td className="text-muted">
                            {formatDate(product.created_at)}
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Updated At:</td>
                          <td className="text-muted">
                            {formatDate(product.updated_at)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Tab>
                  <Tab eventKey="description" title="Description">
                    {product.description ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      />
                    ) : (
                      <div className="text-muted text-center mt-3">
                        <i className="bi bi-file-earmark-text fs-4"></i>
                        <p className="mt-2">Deskripsi belum tersedia</p>
                      </div>
                    )}
                  </Tab>
                </Tabs>
              </div>
              <div className="col-12 d-none d-md-block">
                <div className="card border-0 shadow-none my-2">
                  <div className="row g-0 align-items-center">
                    <div className="col-md-6">
                      <div className="card-body text-center">
                        <h5 className="card-title">
                          Beli di aplikasi, makin banyak promo!
                        </h5>
                        <p className="card-text">
                          Scan QR-nya untuk lihat barang ini di aplikasi
                          ZalpeKomputer. Bebas ongkir, lho~
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card-body text-center">
                        <img
                          src={
                            "https://upload.wikimedia.org/wikipedia/commons/4/41/QR_Code_Example.svg"
                          }
                          alt="Scan QR"
                          className="img-fluid"
                          style={{ maxWidth: "150px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="card shadow-none border-1 my-2">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <p className="card-title text-muted mb-0">
                      Ada masalah dengan produk ini?
                    </p>
                    <a
                      href={`/laporkan.php?product_id=${product.id}`}
                      className="btn btn-sm btn-danger"
                    >
                      Laporkan
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div
                className="position-sticky border-top border-bottom z-1 bg-white"
                style={{ top: "56px" }}
              >
                <ul
                  className="nav nav-pills border-0 shadow-none flex-nowrap overflow-scroll px-2 py-2"
                  style={{
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none", // Firefox
                    msOverflowStyle: "none", // IE/Edge
                  }}
                  // Tambahkan class CSS custom untuk scrollbar hilang di Chrome
                >
                  <li className="nav-item me-2">
                    <button
                      className={`nav-link ${
                        activeTab === "review"
                          ? "text-success fw-bold"
                          : "text-black"
                      }`}
                      onClick={() => setActiveTab("review")}
                    >
                      Review
                    </button>
                  </li>
                  <li className="nav-item me-2">
                    <button
                      className={`nav-link ${
                        activeTab === "recomendation-brand"
                          ? "text-success fw-bold"
                          : "text-black"
                      }`}
                      onClick={() => setActiveTab("recomendation-brand")}
                    >
                      {product.brand}
                    </button>
                  </li>
                  <li className="nav-item me-2">
                    <button
                      className={`nav-link ${
                        activeTab === "recomendation-categories"
                          ? "text-success fw-bold"
                          : "text-black"
                      }`}
                      onClick={() => setActiveTab("recomendation-categories")}
                    >
                      {product.categories}
                    </button>
                  </li>
                  <li className="nav-item me-2">
                    <button
                      className={`nav-link ${
                        activeTab === "recomendation"
                          ? "text-success fw-bold"
                          : "text-black"
                      }`}
                      onClick={() => setActiveTab("recomendation")}
                    >
                      Rekomendasi
                    </button>
                  </li>
                </ul>
              </div>

              {/* Tab Content */}
              <div>
                {activeTab === "review" && (
                  <div>
                    <ReviewProduct
                      productId={product.id}
                      total_rating={product.rated_user_count}
                    />
                  </div>
                )}
                {activeTab === "recomendation-brand" && (
                  <div>
                    <RecomendationBrand brandName={product.brand} />
                  </div>
                )}
                {activeTab === "recomendation-categories" && (
                  <div>
                    <RecomendationCategories
                      categoriesName={product.categories}
                    />
                  </div>
                )}
                {activeTab === "recomendation" && (
                  <div>
                    <RecomendationRandom />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="card border-0"
            style={{
              position: "sticky",
              top: "50px",
              zIndex: 100,
            }}
          >
            <div className="card-body text-center">
              <AddToCart idUser={user.id} idProduct={product.id} priceProduct={product.price} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
