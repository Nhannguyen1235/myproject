import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, clearCart, toggleCheckAll, toggleCheck, overwriteCarts } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

export default function Cart() {
    const dispatch = useDispatch();
    const carts = useSelector((state) => state.carts.carts);
    const checkAll = useSelector((state) => state.carts.checkAll);

    useEffect(() => {
        const storedCarts = localStorage.getItem('carts');
        if (storedCarts) {
            dispatch(overwriteCarts(JSON.parse(storedCarts)));
        }
    }, [dispatch]);

    useEffect(() => {
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
                <button className="btn btn-danger" onClick={handleClearCart}>
                    Clear Cart
                </button>
                <button className="btn btn-primary" onClick={handleToggleCheckAll}>
                    {checkAll ? 'Uncheck All' : 'Check All'}
                </button>
            </div>
            <div className="row">
                <div className="col-12">
                    {carts.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead className="table-dark">
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
                                                    className="img-thumbnail"
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                />
                                            </td>
                                            <td>
                                                <Link to={`/product/${product.id}`}>{product.name}</Link>
                                            </td>
                                            <td>{product.category.join(', ')}</td>
                                            <td>${product.price}</td>
                                            <td>{product.quantity}</td>
                                            <td>${(product.price * product.quantity).toFixed(2)}</td>
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
                        </div>
                    ) : (
                        <p className="text-center">Your cart is empty.</p>
                    )}
                </div>
            </div>
            <div className="text-end mt-4">
                <h4>Total Amount: ${totalAmount.toFixed(2)}</h4>
                <Link to={"/checkouts"}>
                    <button className='btn btn-primary'>Check out</button>
                </Link>
            </div>
        </div>
    );
}
