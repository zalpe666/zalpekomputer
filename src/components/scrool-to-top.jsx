import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "20px", 
        right: "20px", 
        zIndex: 9999, 
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        color: "white",
        border: "none",
        cursor: "pointer",
        opacity: isVisible ? 1 : 0, // Pakai opacity untuk efek smooth
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <i className="bi bi-arrow-up-circle fs-3"></i>
    </button>
  );
};

export default ScrollToTopButton;
