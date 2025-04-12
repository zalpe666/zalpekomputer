import { useEffect, useState } from "react";
import LoadingPage from "../components/loading-page";

const CategoriesAll = () => {
  const [categories, setCategories] = useState([]); // State untuk menyimpan data kategori
  const [loading, setLoading] = useState(true); // State untuk loading
  const [total_categories, setTotal_categories] = useState(0);

  useEffect(() => {
    fetch("http://localhost/api-zalpe-komputer/api/categories.php")
      .then((res) => res.json())
      .then((data) => {
        console.log("Total Categories:", data.total_categories);
        console.log("Categories Data:", data.categories);
        setCategories(data.categories || []); // Ambil `categories`, bukan `data`
        setLoading(false);
        setTotal_categories(data.total_categories || 0);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <nav aria-label="breadcrumb" className="mt-3">
        <ol className="breadcrumb text-truncate">
          <li className="breadcrumb-item">
            <a href="/" className="text-success text-decoration-none">
              Home
            </a>
          </li>
          <li className="breadcrumb-item">
            <a href="/categories" className="text-success text-decoration-none">
              Categories
            </a>
          </li>
        </ol>
      </nav>

      {loading ? (
        <LoadingPage/>
      ) : categories.length > 0 ? (
        <div className="row">
          <div className="d-flex justify-content-between align-items-center">
            <p className="text-muted mb-0">{total_categories} Categories Found</p>
          </div>

          {categories.map((category) => (
            <>
              <div key={category.id} className="col-md-3 col-sm-6 col-6 my-4">
                <a
                  href={`/categories/${category.name.toLowerCase()}`}
                  className="text-decoration-none"
                >
                  <div className="card shadow-sm border-1 h-100">
                    {category && (
                      <>
                        <img
                          src={`/assets/categories/${category.photo}`}
                          className="card-img-top mt-3"
                          alt={category.name}
                          style={{ maxWidth: "100px", margin: "0 auto" }}
                        />
                        <div className="card-body text-center">
                          <p className="card-title text-capitalize">
                            {category.name}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </a>
              </div>
            </>
          ))}
        </div>
      ) : (
        <p className="text-center">No categories found.</p>
      )}
    </div>
  );
};

export default CategoriesAll;
