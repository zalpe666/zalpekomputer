import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const ProductSortList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  // State untuk menyimpan sorting yang dipilih
  const [selectedSort, setSelectedSort] = useState(searchParams.get("sort") || "");

  useEffect(() => {
    // Saat URL berubah, perbarui state agar dropdown tetap sinkron
    setSelectedSort(searchParams.get("sort") || "");
  }, [location.search]); // Memantau perubahan URL

  // Fungsi untuk mengupdate sorting
  const updateSort = (value) => {
    const newParams = new URLSearchParams(location.search);

    if (value === "") {
      newParams.delete("sort");
    } else {
      newParams.set("sort", value);
    }

    navigate(`${location.pathname}?${newParams.toString()}`);
  };

  return (
    <div>
      <Form.Select
        value={selectedSort} // Dropdown akan menyesuaikan nilai dari URL
        onChange={(e) => updateSort(e.target.value)}
      >
        <option value="">Default</option>
        <option value="price-asc">Lowest Price</option>
        <option value="price-desc">Highest Price</option>
        <option value="sold">Best Selling</option>
        <option value="rating">Highest Rating</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="discount-desc">Highest Discount</option>
      </Form.Select>
    </div>
  );
};

export default ProductSortList;
