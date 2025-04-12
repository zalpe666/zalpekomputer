import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../render/productCard";
import ProductSortList from "../components/product-sort-list";
import api from "../../axios";

const Search = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");
  const sort = queryParams.get("sort");

  useEffect(() => {
    if (keyword) {
      api
        .get("searchProduct.php", {
          params: {
            keyword,
            sort,
          },
        })
        .then((res) => {
          setResults(res.data.products || []);
          setTotalProduct(res.data.total_product || 0);
        })
        .catch((err) => console.error("Gagal memuat hasil pencarian:", err));
    }
  }, [keyword, sort]);

  return (
    <div className="container mt-4">
      <h4>
        Hasil pencarian untuk: <strong>{keyword}</strong>
      </h4>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0">{totalProduct} produk ditemukan</p>
        <ProductSortList />
      </div>

      <div className="row mt-3">
        {results.length === 0 ? (
          <p>Tidak ada produk ditemukan.</p>
        ) : (
          results.map((product) => (
            <div
              key={product.id}
              className="col-12 col-sm-6 col-md-4 col-lg-2 my-2"
            >
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
