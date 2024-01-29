import { RadioGroup } from '@headlessui/react';
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cart.slice';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

type Product = {
  product: ProductDetails;
};

type ProductDetails = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  color_size_combinations: ColorSizeCombi[];
};

type ColorSizeCombi = {
  product_id: string;
  color: Color;
  size: Size;
  availability: number;
};

type Size = {
  id: string;
  name: string;
  abbreviation: string;
};

type Color = {
  id: string;
  name: string;
  hex_code: string;
  bg_color?: string;
  ring_color?: string;
};

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
  const dispatch = useDispatch();

  // State to keep track of the selected color
	const [selectedColor, setSelectedColor] = useState<string>(uniqueColors[0].id);
  const [availableSizes, setAvailableSizes] = useState(getAvailableSizes(selectedColor, productData.product.color_size_combinations));
	const [selectedSize, setSelectedSize] = useState<string>(null);

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

  useEffect(() => {
    if (availableSizes.filter(size => size.abbreviation == selectedSize && size.quantity == 0)) { 
      setSelectedSize(null); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableSizes]);

	useEffect(() => {
    if (productData && productData.product.color_size_combinations) {
      const newAvailableSizes = getAvailableSizes(selectedColor, productData.product.color_size_combinations);
      setAvailableSizes(newAvailableSizes);
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
              <p className="text-xl font-medium text-gray-900">{productData.product.price}€</p>
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <div className="">
              <img
                key={productData.product.id}
                src={productData.product.image_url}
                alt={productData.product.name}
                className='rounded-lg'
              />
            </div>
          </div>

          <div className="mt-8 lg:col-span-5">
            <div>
              {/* Color picker */}
              <div>
                <h2 className="text-sm font-medium text-gray-900">Color</h2>

                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {uniqueColors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color.id}
                        className={({ active, checked }) =>
                          classNames(
                            color.ring_color,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                          )
                        }
                      >
                        <label htmlFor={color.name} className="sr-only">{color.name}</label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.bg_color,
                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Size picker */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-900">Size</h2>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    See sizing chart
                  </a>
                </div>
                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-2">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {availableSizes.map((size) => (
                      <RadioGroup.Option
                        key={size.abbreviation}
                        value={size.abbreviation}
                        className={({ active, checked }) =>
                          classNames(
                            size.inStock ? 'cursor-pointer focus:outline-none' : 'cursor-not-allowed opacity-25',
                            active ? 'ring-2 ring-indigo-600' : '',
                            checked
                              ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700'
                              : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                            'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1'
                          )
                        }
                        disabled={!size.inStock}
                      >
                        <label htmlFor={size.name}>{size.abbreviation}</label>
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                onClick={handleAddToCart}
                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to cart
              </button>
            </div>

            {/* Product details */}
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Description</h2>

              <div
                className="prose prose-sm mt-4 text-gray-500"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: productData.product.description }}
              />
            </div>
          </div>
        </div>
      </main>
		</div>
  );
}

export default ProductOverviews;