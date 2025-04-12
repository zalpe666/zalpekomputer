import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
const PopularBrand = () => {
  const sliderRef = useRef(null);
  const [brand, setbrand] = useState([]);
  useEffect(() => {
    fetch("http://localhost/api-zalpe-komputer/api/brand.php")
      .then((res) => res.json())
      .then((data) => setbrand(data.brand || [])) // Ambil data yang benar
      .catch((err) => console.error("Error fetching brand:", err));
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
          <h4 class="text-black">Popular brand</h4>
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
          {brand.length > 0 ? (
            brand.map((category) => (
              <div className="col-md-6">
                <Link
                  key={category.id}
                  to={`/brands/${category.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="card card-brand h-100 border-1 text-decoration-none mx-1"
                >
                  <div className="card-body text-center">
                    <center>
                      <img
                        src={`/assets/brand/${category.photo}`}
                        alt={category.name}
                        className="img-fluid"
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "contain",
                        }}
                      />
                    </center>
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
        <a href="/brands" class="text-muted text-decoration-none me-2">
          See more brand
        </a>
        <i class="bi bi-chevron-right"></i>
      </div>
      
    </div>
  );
};

export default PopularBrand;
