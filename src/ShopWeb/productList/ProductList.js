import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setCategory, setPrice } from "../redux/productSlice";
import AOS from "aos";
import { addCart } from "../redux/cartSlice";
import { Link, useParams } from "react-router-dom";
import "./ProductList.css";

export default function ProductList() {
  const dispatch = useDispatch();
  const { category, price } = useParams(); // Lấy tham số từ URL
  const products = useSelector((state) => state.products.filteredProducts);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const selectedCategory = useSelector(
    (state) => state.products.selectedCategory
  );
  const selectedPrice = useSelector((state) => state.products.selectedPrice);
  AOS.init();

  const handleAddToCart = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    // Thiết lập bộ lọc dựa trên tham số URL
    if (category) {
      dispatch(setCategory(category.toLowerCase()));
    }
    if (price) {
      dispatch(setPrice(price.toLowerCase()));
    }
  }, [category, price, dispatch]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value.toLowerCase();
    dispatch(setCategory(selectedCategory));
    // Cập nhật URL để phản ánh danh mục đã chọn
    if (selectedPrice === "all" && selectedCategory === "all") {
      window.history.pushState(null, "", `/products`);
    } else if (selectedPrice === "all") {
      window.history.pushState(null, "", `/products/${selectedCategory}`);
    } else if (selectedCategory === "all") {
      window.history.pushState(null, "", `/products/${selectedPrice}`);
    } else {
      window.history.pushState(
        null,
        "",
        `/products/${selectedCategory}/${selectedPrice}`
      );
    }
  };

  const handlePriceChange = (event) => {
    const selectedPrice = event.target.value.toLowerCase();
    dispatch(setPrice(selectedPrice));
    // Cập nhật URL để phản ánh phạm vi giá đã chọn
    if (selectedPrice === "all" && selectedCategory === "all") {
      window.history.pushState(null, "", `/products`);
    } else if (selectedPrice === "all") {
      window.history.pushState(null, "", `/products/${selectedCategory}`);
    } else if (selectedCategory === "all") {
      window.history.pushState(null, "", `/products/${selectedPrice}`);
    } else {
      window.history.pushState(
        null,
        "",
        `/products/${selectedCategory}/${selectedPrice}`
      );
    }
  };

  if (status === "loading") {
    return <div className="text-center">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  const categories = ["All", "Men", "Women", "Hoodie", "Hat"];
  const priceRanges = ["All", "Under $50", "$50 - $100", "Above $100"];

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 sidebar">
          <div className="sidebar-content">
            <h4 className="my-4">Filters</h4>
            <div className="mb-4">
              <h5>Category</h5>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="form-select"
              >
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <h5>Price Range</h5>
              <select
                value={selectedPrice}
                onChange={handlePriceChange}
                className="form-select"
              >
                {priceRanges.map((priceRange) => (
                  <option key={priceRange} value={priceRange.toLowerCase()}>
                    {priceRange}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <h2 className="text-center my-4">Product List</h2>
          <div className="row">
            {products.map((product) => {
              const productImage = require(`../../imgs/${product.image}.jpg`);
              return (
                <div key={product.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100" data-aos="zoom-in-up">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={productImage}
                        className="card-img-top"
                        alt={product.name}
                      />
                    </Link>
                    <div className="card-body">
                      <div className="card-content">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">Price: ${product.price}</p>
                        <p className="card-text">
                          {/* chữ categori theo sau bởi khoảng trắng */}
                          Category:{" "}
                          {/* cat chứa danh mục hiện tại của sản phẩm */}
                          {product.category.map((cat, index) => (
                            <span key={index}>
                              <Link
                                to={`/products/${cat.toLowerCase()}`}
                                className="category-link"
                              >
                                {cat}
                              </Link>
                              {/* kiểm tra xem index có nhỏ hơn product.category.length - 1 hay không. 
                              Nếu đúng, nó thêm dấu phẩy và khoảng trắng sau danh mục, 
                              trừ danh mục cuối cùng. */}
                              {index < product.category.length - 1 && ", "}
                            </span>
                          ))}
                        </p>
                      </div>
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-view btn-outline-dark"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn btn-view btn-outline-dark"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
