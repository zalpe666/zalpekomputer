import { useEffect, useState } from "react";
import LoadingPage from "../loading-page";
import ProductCard from "../../render/productCard";
import api from "../../../axios";

const RecomendationBrand = ({ brandName }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiURL = `http://localhost/api-zalpe-komputer/api/productByBrand.php?brand=${brandName}`;

    setLoading(true); // Mulai loading

    api
      .get(apiURL)
      .then((res) => {
        console.log("API result:", res.data); // `res.data` berisi data yang di-fetch
        setProducts(res.data.products || []);
        setLoading(false); // Selesai loading
      })
      .catch((err) => {
        console.error("Error fetching brand products:", err);
        setLoading(false); // Selesai loading meskipun ada error
      });
  }, [brandName]);

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
          Produk tidak ditemukan untuk brand <strong>{brandName}</strong>.
        </p>
      )}
    </>
  );
};

export default RecomendationBrand;
