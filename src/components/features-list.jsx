const FeaturedList = () => {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-4 col-sm-4 col-12">
          <div className="card border-0 text-center">
            <img
              src="assets/olshop/service-delivery.svg"
              width="100px"
              className="mb-3 mx-auto"
              alt="Free and Fast Delivery"
            />
            <h5 className="text-black fw-bolder">FREE AND FAST DELIVERY</h5>
            <p className="text-secondary">
              Free delivery for all orders over $140
            </p>
          </div>
        </div>
        <div className="col-md-4 col-sm-4 col-12">
          <div className="card border-0 text-center">
            <img
              src="assets/olshop/service-support.svg"
              width="100px"
              className="mb-3 mx-auto"
              alt="Money Back Guarantee"
            />
            <h5 className="text-black fw-bolder">MONEY BACK GUARANTEE</h5>
            <p className="text-secondary">We return money within 7 days</p>
          </div>
        </div>
        <div className="col-md-4 col-sm-4 col-12">
          <div className="card border-0 text-center">
            <img
              src="assets/olshop/service-money.svg"
              width="100px"
              className="mb-3 mx-auto"
              alt="24/7 Customer Service"
            />
            <h5 className="text-black fw-bolder">24/7 CUSTOMER SERVICE</h5>
            <p className="text-secondary">Friendly 24/7 customer support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedList;
