const LoadingPage = () => {
  return (
    <>
      <div className="card text-center p-4 border-0 shadow-sm">
        <div className="card-body">
          <div class="spinner-border text-primary" role="status"></div>
          <p className="mt-3 text-muted fs-5">Loading, please wait...</p>
        </div>
      </div>
    </>
  );
};

export default LoadingPage;
