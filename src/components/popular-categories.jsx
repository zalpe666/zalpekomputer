import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const PopularCategories = () => {
  const sliderRef = useRef(null);
  const [categories, setCategories] = useState([]);

  // Fetch data dari API
  useEffect(() => {
    fetch(
      "http://localhost/api-zalpe-komputer/api/categories?random=true&limit=8"
    )
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || [])) // Ambil data yang benar
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 },
      },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="container my-4">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex">
          <h4 class="text-black">Popular Categories</h4>
        </div>
        <div>
          <button
            className="btn btn-light me-2"
            onClick={() => sliderRef.current.slickPrev()}
            style={{ zIndex: 10 }}
          >
            <i class="bi bi-chevron-left"></i>
          </button>
          <button
            className="btn btn-light"
            onClick={() => sliderRef.current.slickNext()}
            style={{ zIndex: 10 }}
          >
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
      <div className="slider-container position-relative my-2">
        <Slider ref={sliderRef} {...settings}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <div className="col-md-6">
                <Link
                  key={category.id}
                  to={`/categories/${category.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="card card-categories h-100 border-1 text-decoration-none mx-1"
                >
                  <div className="card-body text-center">
                    <center>
                      <img
                        src={`/assets/categories/${category.photo}`}
                        alt={category.name}
                        className="img-fluid"
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "contain",
                        }}
                      />
                    </center>
                    <h5 className="mt-2 text-dark fs-6">{category.name}</h5>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </Slider>
      </div>
      <div class="text-end mt-2">
        <a href="/categories" class="text-muted text-decoration-none me-2">
          See more Products
        </a>
        <i class="bi bi-chevron-right"></i>
      </div>
    </div>
  );
};

export default PopularCategories;
