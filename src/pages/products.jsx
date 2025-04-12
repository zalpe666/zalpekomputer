import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductSortList from "../components/product-sort-list";
import ProductCard from "../render/productCard";
import api from "../../axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [total_products, setTotal_products] = useState(0);
  const [loading, setLoading] = useState(true);

  const location = useLocation(); // Ambil URL saat ini
  const searchParams = new URLSearchParams(location.search);
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    setLoading(true);

    api
      .get("productAll.php", {
        params: { sort },
      })
      .then((res) => {
        console.log("Total Products:", res.data.total_products);
        console.log("Products Data:", res.data.products);
        setProducts(res.data.products || []);
        setTotal_products(res.data.total_products || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [sort]);

  return (
    <>
      <nav aria-label="breadcrumb" className="mt-3">
        <ol className="breadcrumb text-truncate">
          <li className="breadcrumb-item">
            <a href="/" className="text-success text-decoration-none">
              Home
            </a>
          </li>
          <li className="breadcrumb-item">
            <a href="/products" className="text-success text-decoration-none">
              Products
            </a>
          </li>
        </ol>
      </nav>

      <div className="d-flex justify-content-between align-items-center">
        <p className="text-muted mb-0">{total_products} Products Found</p>
        <ProductSortList />
      </div>

      {loading ? (
        <p className="text-center mt-4">Loading products...</p>
      ) : (
        <div className="row mt-4">
          {products.map((product) => (
            <div key={product.id} className="col-lg-2 col-md-3 col-sm-6 col-12 p-2">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Products;
