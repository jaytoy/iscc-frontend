import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import ImageGallery from '../image-gallery';
import ProductDetails from '../product-details';
import AddToCartButton from '../add-to-cart-button';
import ColorPicker from '../color-picker';
import SizePicker from '../size-picker';
import { Product, Color } from '../../types';


interface Props {
	productData: Product;
  uniqueColors: Color[];
}

const getAvailableSizes = (colorId, colorSizeCombinations) => {
  if (!colorSizeCombinations) {
    // Return an empty array or some default value if colorSizeCombinations is undefined
    return [];
  }

  // Define the order of sizes
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Filter and map the sizes
  const sizes = colorSizeCombinations
    .filter(item => item.color.id === colorId)
    .map(item => ({
      ...item.size,
      quantity: item.availability,
      inStock: item.availability > 0
    }));

  // Sort sizes based on the sizeOrder array
  return sizes.sort((a, b) => sizeOrder.indexOf(a.abbreviation) - sizeOrder.indexOf(b.abbreviation));
};

const ProductOverviews = ({ productData, uniqueColors }: Props) => {
  // State to keep track of the selected color
	const [selectedColor, setSelectedColor] = useState<string>(uniqueColors[0].id);
  const [availableSizes, setAvailableSizes] = useState(getAvailableSizes(selectedColor, productData.product.color_size_combinations));
	const [selectedSize, setSelectedSize] = useState<string>(null);

	useEffect(() => {
    if (productData && productData.product.color_size_combinations) {
      const newAvailableSizes = getAvailableSizes(selectedColor, productData.product.color_size_combinations);
      setAvailableSizes(newAvailableSizes);

      // Check if the selected size is available in the new color with quantity > 0
      const isSizeAvailable = newAvailableSizes.some(size => 
        size.abbreviation === selectedSize && size.quantity > 0
      );

      if (!isSizeAvailable) {
        setSelectedSize(null);
      }
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor, productData]);

  return (
    <div>
			<main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="flex justify-between">
              <h1 className="text-xl font-medium text-gray-900">{productData.product.name}</h1>
              <p className="text-xl font-medium text-gray-900">{productData.product.price.toFixed(2)}€</p>
            </div>
          </div>

          {/* Image gallery */}
          <ImageGallery 
            product_id={productData.product.id} 
            product_name={productData.product.name} 
            image_url={productData.product.image_url} 
          />

          <div className="mt-8 lg:col-span-5">
            <div>
              {/* Color picker */}
              <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} uniqueColors={uniqueColors} />

              {/* Size picker */}
              <SizePicker selectedSize={selectedSize} setSelectedSize={setSelectedSize} availableSizes={availableSizes} />
             
              {/* Add to cart button */}
              <AddToCartButton 
                productData={productData} 
                selectedSize={selectedSize} 
                selectedColor={selectedColor} 
              />
            </div>

            {/* Product details */}
            <ProductDetails description={productData.product.description} />
            
          </div>
        </div>
      </main>
		</div>
  );
}

export default ProductOverviews;