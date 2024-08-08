import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, clearCart, toggleCheckAll, toggleCheck } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

export default function Cart() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.carts.carts);
  const checkAll = useSelector((state) => state.carts.checkAll);

  useEffect(() => {
    const storedCarts = localStorage.getItem('carts');
      dispatch({ type: 'cart/overwriteCarts', payload: JSON.parse(storedCarts) });
  }, [dispatch]);

  useEffect(() => {
    // Chỉ lưu vào localStorage khi carts thay đổi
    if (carts.length > 0) {
      localStorage.setItem('carts', JSON.stringify(carts));
    }
  }, [carts]);

  const handleDeleteFromCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleToggleCheckAll = () => {
    dispatch(toggleCheckAll(!checkAll));
  };

  const handleToggleCheck = (productId) => {
    dispatch(toggleCheck(productId));
  };

  const totalAmount = carts.reduce((total, product) => {
    if (product.checked) {
      return total + product.price * product.quantity;
    }
    return total;
  }, 0);

  return (
    <div className="container">
      <h2 className="text-center my-4">Shopping Cart</h2>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-danger" onClick={handleClearCart}>Clear Cart</button>
        <button className="btn btn-primary" onClick={handleToggleCheckAll}>
          {checkAll ? 'Uncheck All' : 'Check All'}
        </button>
      </div>
      <div className="row">
        <div className="col-12">
          {carts.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Select</th>
                  <th scope="col">Product</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={product.checked}
                        onChange={() => handleToggleCheck(product.id)}
                      />
                    </td>
                    <td>
                      <img
                        src={require(`../../imgs/${product.image}.jpg`)}
                        alt={product.name}
                        className="img-fluid"
                        style={{ width: '50px' }}
                      />
                    </td>
                    <td>
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </td>
                    <td>{product.category.join(', ')}</td>
                    <td>${product.price}</td>
                    <td>{product.quantity}</td>
                    <td>${product.price * product.quantity}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteFromCart(product.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
        </div>
      </div>
      <div className="text-end mt-4">
        <h4>Total Amount: ${totalAmount}</h4>
      </div>
    </div>
  );
}
