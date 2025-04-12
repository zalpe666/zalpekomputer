import { Link } from "react-router-dom";
import SideBar from "../components/side-bar";
import Carousel from "../components/carousel";
import PopularCategories from "../components/popular-categories";
import Footer from "../components/footer";
import FeaturedList from "../components/features-list";
import PopularProduct from "../components/popular-product";
import ProductPromo from "../components/product-promo";
import PopularBrand from "../components/popular-brand";

const Home = () => {
  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-md-3 border-end d-none d-md-block sidebar-fixed">
          <SideBar />
        </div>
        <div className="col-md-9">
         <Carousel/>
        </div>
        <div className="col-md-12">
          <PopularCategories/>
          <PopularProduct/>
          <PopularBrand/>
          <FeaturedList/>
          <ProductPromo/>
        </div>
      </div>
    </div>
  );
};

export default Home;
