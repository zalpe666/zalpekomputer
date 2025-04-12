import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCard from "../render/productCard";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LoadingPage from "./loading-page";

const ProductPromo = () => {
  const sliderRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(
      "http://localhost/api-zalpe-komputer/api/productAll.php?sort=discounted"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching popular products:", err);
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
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
    <div className="container my-2">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-black">Popular Products</h4>
        <div>
          <button
            className="btn btn-light me-2"
            onClick={() => sliderRef.current?.slickPrev()}
            style={{ zIndex: 10 }}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            className="btn btn-light"
            onClick={() => sliderRef.current?.slickNext()}
            style={{ zIndex: 10 }}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
      <div className="row my-2">
        <div className="col-md-3 col-sm-6 position-relative d-none d-sm-block">
          <div
            className="position-absolute text-center"
            style={{
              top: "50%",
              left: "30%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <p className="text-white mb-0">Save Up To</p>
            <h1 className="text-white mb-0">50%</h1>
            <a
              href="zalpekomputer/flash_sale"
              className="text-white mb-0 text-decoration-none hover-effect"
            >
              Shop Now <i className="bi bi-chevron-right"></i>
            </a>
          </div>
          <img
            src="/assets/banner-1.jpg"
            alt="Banner"
            className="img-fluid w-100 h-100 rounded d-none d-sm-block"
          />
        </div>
        <div className="col-md-9 col-sm-6">
          {loading ? (
            <LoadingPage/>
          ) : products.length > 0 ? (
            <Slider ref={sliderRef} {...settings} className="mt-3">
              {products.map((product) => (
                <div key={product.id} className="px-2">
                  <ProductCard product={product} />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="d-flex flex-column align-items-center text-center mt-5">
              <DotLottieReact
                src="https://lottie.host/289464f2-739d-40a4-8b45-3f018b72a2e4/xCIrJrDGq7.lottie"
                loop
                autoplay
                style={{ width: 300, height: 300 }}
              />
              <p className="text-muted mt-3 fs-5">
                Tidak ada produk populer saat ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPromo;
