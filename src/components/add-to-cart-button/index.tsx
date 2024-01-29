import { h } from 'preact';
import { useDispatch } from 'react-redux';

import { addToCart } from '../../redux/cart.slice';
import { Product } from '../../types';


interface Props {
  productData: Product;
  selectedSize: string;
  selectedColor: string;
}

const AddToCartButton = ({ productData, selectedSize, selectedColor }: Props) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Update the cart state
    dispatch(addToCart(productData.product));

    // Send the product data to the server
    fetch(`http://localhost:8000/add-to-cart/${productData.product.slug}`, {
      method: 'POST',
      body: JSON.stringify({
        product_id: productData.product.id,
        product_name: productData.product.name,
        product_slug: productData.product.slug,
        size: selectedSize,
        color_id: selectedColor,
        quantity: 1
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .catch(err => console.error(err));
  }

  return (
    <button
      onClick={handleAddToCart}
      className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Add to cart
    </button>
  );
}

export default AddToCartButton;