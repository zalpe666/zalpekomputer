import React, { useEffect, useState } from "react";
import LoadingPage from "../loading-page";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ReviewProduct = ({ productId, total_rating }) => {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalImageName, setModalImageName] = useState("");

  useEffect(() => {
    fetch(
      `http://localhost/api-zalpe-komputer/api/productRating?id_product=${productId}&limit=10`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReviews(data.review);
          setMessage(data.message);
        } else {
          setMessage("Tidak ada review ditemukan.");
        }
      })
      .catch(() => {
        setMessage("Gagal memuat review.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? "#ffc107" : "#e4e5e9" }}>
          ★
        </span>
      );
    }
    return stars;
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const openModal = (imageUrl, reviewerName) => {
    setModalImage(imageUrl);
    setModalImageName(reviewerName);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage("");
  };

  return (
    <div className="pt-4">
      {loading ? (
        <LoadingPage />
      ) : reviews.length > 0 ? (
        <>
          <h3>Reviews</h3>
          <div className="row">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="text-muted mb-0">{message}</p>

              {reviews.length < total_rating && (
                <a
                  href={`/product/${productId}/review`}
                  className="text-decoration-none text-success"
                >
                  All reviews →
                </a>
              )}
            </div>

            {reviews.map((rev, idx) => (
              <div key={idx} className="col-6 col-md-12 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column flex-md-row">
                    <div className="me-3 mb-2 mb-md-0">
                      <img
                        src={rev.photo_url}
                        alt="Review"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() => openModal(rev.photo_url, rev.name)}
                      />
                    </div>
                    <div>
                      <p className="mb-1">
                        <strong>{rev.name}</strong>
                      </p>
                      <p className="mb-1">
                        <strong>Rating:</strong> {renderStars(rev.rating)}
                      </p>
                      <p className="mb-1">
                        <strong>Komentar:</strong> {rev.comment}
                      </p>
                      <p className="text-muted mb-0">
                        <small>
                          <strong>Tanggal:</strong> {formatDate(rev.date)}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {showModal && (
              <>
                <div
                  className="modal fade show"
                  tabIndex="-1"
                  style={{
                    display: "block",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                  role="dialog"
                  aria-labelledby="imageModalLabel"
                  aria-modal="true"
                  onClick={closeModal}
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="imageModalLabel">
                          {modalImageName}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={closeModal}
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body text-center">
                        <img
                          src={modalImage}
                          alt="Popup"
                          style={{ maxWidth: "100%", borderRadius: "8px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Backdrop Bootstrap Manual */}
                <div className="modal-backdrop fade show"></div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <DotLottieReact
            src="https://lottie.host/fa40fbf9-0950-45c8-8fd9-299032855f81/9XWQpgFs7W.json"
            loop
            autoplay
          />
          <p className="text-center my-2">No reviews for this product</p>
        </>
      )}
    </div>
  );
};

export default ReviewProduct;
