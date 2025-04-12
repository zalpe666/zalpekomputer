import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../render/productCard";
import ProductSortList from "../components/product-sort-list";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LoadingPage from "../components/loading-page";

const BrandList = () => {
  const { name } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sortParam = searchParams.get("sort") || "";

    // Mapping parameter `sort` ke API
    let sortQuery = "";
    switch (sortParam) {
      case "price-asc":
        sortQuery = "sort=price-asc";
        break;
      case "price-desc":
        sortQuery = "sort=price-desc";
        break;
      case "sold":
        sortQuery = "sort=sold";
        break;
      case "rating":
        sortQuery = "sort=rating";
        break;
      case "name-asc":
        sortQuery = "sort=name-asc";
        break;
      case "name-desc":
        sortQuery = "sort=name-desc";
        break;
      default:
        sortQuery = "";
    }
    const apiURL = `http://localhost/api-zalpe-komputer/api/productByBrand.php?brand=${name}${
      sortQuery ? `&${sortQuery}` : ""
    }`;

    setLoading(true);
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        setProducts(data.products || []);
        setTotalProducts(data.total_products || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [name, location.search]); // Fetch ulang saat kategori atau sorting berubah

  return (
    <>
      <div>
        <nav aria-label="breadcrumb" className="mt-3">
          <ol className="breadcrumb text-truncate">
            <li className="breadcrumb-item">
              <a href="/" className="text-success text-decoration-none">
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a
                href="/brands"
                className="text-success text-decoration-none"
              >
                Brand
              </a>
            </li>
            <li
              className="breadcrumb-item active text-black"
              style={{
                maxWidth: "400px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name
                .replace("-", " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </li>
          </ol>
        </nav>

        {loading ? (
          <LoadingPage />
        ) : products.length > 0 ? (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <p className="text-muted mb-0">{totalProducts} Product Found</p>
              <ProductSortList />
            </div>

            <div className="row mt-3">
              {products.map((product) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-2 my-2">
                  <ProductCard key={product.id} product={product} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="d-flex flex-column align-items-center text-center mt-5">
            <DotLottieReact
              src="https://lottie.host/289464f2-739d-40a4-8b45-3f018b72a2e4/xCIrJrDGq7.lottie"
              loop
              autoplay
              style={{ width: 300, height: 300 }}
            />
            <p className="text-muted mt-3 fs-5">
              Tidak ada produk dalam kategori ini.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default BrandList;
