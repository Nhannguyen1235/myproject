import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../redux/productSlice';
import './Product.css';

export default function Product() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const product = useSelector((state) =>
        state.products.products.find((product) => product.id === productId)
    );

    useEffect(() => {
        if (product) {
            setMainImage(require(`../../imgs/${product.image}.jpg`));
        }
    }, [product]);

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleImageClick = (image) => {
        setMainImage(require(`../../imgs/${image}.jpg`));
    };

    const allImages = [product.image, ...product.imageSub];
    return (
        <div className="container product-details">
            <div className="row text-center">
                <div className="col-md-6">
                    <img src={mainImage} alt={product.name} className="img-fluid main-image" />
                </div>
                <div className="col-md-6">
                    <h2>{product.name}</h2>
                    <p>Price: ${product.price}</p>
                    <p>Category: {product.category.join(', ')}</p>
                    <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna sit amet tortor sollicitudin pharetra.</p>
                    <button className="btn btn-primary">Add to Cart</button>
                </div>
            </div>
            <div className="row mt-4">
                {product.imageSub && product.imageSub.length > 0 && (
                    <div className="col-md-12">
                        <h3>Additional Images</h3>
                        <div className="image-thumbnails">
                        {allImages.map((image, index) => (
                            <img
                                key={index}
                                src={require(`../../imgs/${image}.jpg`)}
                                alt={`sub-${index}`}
                                className="img-thumbnail"
                                onClick={() => handleImageClick(image)}
                            />
                        ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
