import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import AOS from "aos";
import { Link } from "react-router-dom";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  AOS.init();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div className="text-center">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2 className="text-center my-4">Product List</h2>
      <div className="row">
        {products.map((product) => {
          const productImage = require(`../../imgs/${product.image}.jpg`);
          return (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card h-100" data-aos="zoom-in-up">
                <img
                  src={productImage}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: ${product.price}</p>
                  <p className="card-text">
                    Category: {product.category.join(", ")}
                  </p>
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-outline-dark"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
