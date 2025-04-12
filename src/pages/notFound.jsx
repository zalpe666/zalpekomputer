import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="fw-semibold">Oops! Page Not Found</h2>
      <p className="text-muted">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary mt-3">
        <i className="bi bi-house-door me-2"></i> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
