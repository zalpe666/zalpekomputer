import { useEffect, useState } from "react";
import LoadingPage from "../components/loading-page";

const BrandAll = () => {
  const [brands, setBrands] = useState([]); // State untuk menyimpan data merek
  const [loading, setLoading] = useState(true); // State untuk loading
  const [total_brand, setTotal_brand] = useState(0);

  useEffect(() => {
    fetch("http://localhost/api-zalpe-komputer/api/brand.php")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data); // Cek hasil data dari API
        console.log("Total Brand:", data.total_brands);
        console.log("Brand Data:", data.brand);
        setBrands(data.brand || []); // Perbaikan di sini
        setTotal_brand(data.total_brand || 0); // Perbaikan di sini
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching brand:", err);
        setLoading(false);
      });
  }, []);

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
            <a href="/brands" className="text-success text-decoration-none">
              Brands
            </a>
          </li>
        </ol>
      </nav>

      {loading ? (
        <LoadingPage />
      ) : brands.length > 0 ? (
        <div className="row">
          <div className="d-flex justify-content-between align-items-center">
            <p className="text-muted mb-0">{total_brand} Brands Found</p>
          </div>
          {brands.map((brand) => (
            <div key={brand.id} className="col-md-3 col-sm-6 col-6 my-4">
              <a
                href={`/brands/${brand.name.toLowerCase()}`}
                className="text-decoration-none"
              >
                <div className="card shadow-sm border-1 h-100">
                  <img
                    src={`/assets/brand/${brand.photo}`}
                    className="card-img-top mt-3"
                    alt={brand.name}
                    style={{ maxWidth: "100px", margin: "0 auto" }}
                  />
                  <div className="card-body text-center">
                    <p className="card-title text-capitalize">{brand.name}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No brands found.</p>
      )}
    </>
  );
};

export default BrandAll;
