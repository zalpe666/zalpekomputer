import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-dark py-5 border-top">
      <div className="container">
        <div className="row">
          {/* About Us */}
          <div className="col-md-3">
            <h5 className="fw-bold">Zalpe Komputer</h5>
            <p className="small text-muted">
              Your one-stop destination for high-performance gaming gear. We
              provide top-quality products with the best prices and exceptional
              customer service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled small">
              {[
                "Home",
                "Shop",
                "New Arrivals",
                "Best Sellers",
                "Discounts",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-dark text-decoration-none d-block py-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div className="col-md-3">
            <h5 className="fw-bold">Customer Support</h5>
            <ul className="list-unstyled small">
              <li>
                <a
                  href="/info/faqs"
                  className="text-dark text-decoration-none d-block py-1"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/info/shipping"
                  className="text-dark text-decoration-none d-block py-1"
                >
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a
                  href="/info/return-policy"
                  className="text-dark text-decoration-none d-block py-1"
                >
                  Return Policy
                </a>
              </li>
              <li>
                <a
                  href="/info/warranty"
                  className="text-dark text-decoration-none d-block py-1"
                >
                  Warranty
                </a>
              </li>
              <li>
                <a
                  href="/info/track-order"
                  className="text-dark text-decoration-none d-block py-1"
                >
                  Track Your Order
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social Media */}
          <div className="col-md-3">
            <h5 className="fw-bold">Contact Us</h5>
            <p className="small text-muted">
              📍 Jl. Nilam VI No. 45, Central Jakarta
              <br />
              📞 +62 851-8685-0857
              <br />
              ✉️ support@zalpekomputer.co.id
            </p>
            <div>
              {["facebook", "instagram", "twitter", "youtube", "tiktok"].map(
                (platform, index) => (
                  <a key={index} href="#" className="text-dark me-3 fs-5">
                    <i className={`bi bi-${platform}`}></i>
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="row mt-4 align-items-center">
          <div className="col-md-6">
            <h5 className="fw-bold">Subscribe to Our Newsletter</h5>
            <p className="small text-muted">
              Get the latest updates on gaming products, exclusive offers, and
              promotions.
            </p>
            <form className="d-flex">
              <input
                type="email"
                className="form-control me-2"
                placeholder="Enter your email"
              />
              <button className="btn btn-danger">Subscribe</button>
            </form>
          </div>

          <div className="col-md-6 text-md-end mt-3 mt-md-0">
            <h5 className="fw-bold">We Accept :</h5>
            {["Visa", "MasterCard", "PayPal", "Gopay", "Dana", "OVO"].map(
              (method, index) => (
                <img
                  key={index}
                  src={`https://placehold.co/40x25?text=${method}`}
                  alt={method}
                  className="me-2"
                />
              )
            )}
          </div>
        </div>

        {/* Copyright */}
        <hr className="border-light" />
        <div className="text-center small text-muted">
          © 2025 Zalpe Komputer. All Rights Reserved. | Designed for Gamers, by
          Gamers.
        </div>
        <div className="text-center small">
          Made With <i className="bi bi-heart-fill text-danger"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
