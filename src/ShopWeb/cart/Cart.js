import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, clearCart, toggleCheckAll, toggleCheck } from '../redux/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const carts = useSelector(state => state.cart.carts);
  const checkAll = useSelector(state => state.checkAll); 


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

  return (
    <div>
      <button onClick={handleClearCart}>Clear Cart</button>
      <button onClick={handleToggleCheckAll}>{checkAll ? 'Uncheck All' : 'Check All'}</button>
      <ul>
        {carts.map(product => (
          <li key={product.id}>
            <input
              type="checkbox"
              checked={product.checked}
              onChange={() => handleToggleCheck(product.id)}
            />
            {product.name} - ${product.price}
            <button onClick={() => handleDeleteFromCart(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
