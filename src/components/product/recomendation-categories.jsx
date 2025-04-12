import { useEffect, useState } from "react";
import LoadingPage from "../loading-page";
import ProductCard from "../../render/productCard";

const RecomendationCategories = ({ categoriesName }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiURL = `http://localhost/api-zalpe-komputer/api/productByCategories.php?category=${categoriesName}`;

  useEffect(() => {
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        console.log("API result:", data);
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching brand products:", err));
  }, [categoriesName]);
  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : products.length > 0 ? (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3">
          {products.map((product) => (
            <div className="col" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">
          Produk tidak ditemukan untuk brand <strong>{categoriesName}</strong>.
        </p>
      )}
    </>
  );
};

export default RecomendationCategories;
