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

  return colorSizeCombinations
    .filter(item => item.color.id === colorId)
    .map(item => ({
      ...item.size,
      inStock: item.availability > 0
    }));
};

const ProductOverviews = ({ productData, uniqueColors }: Props) => {
  const dispatch = useDispatch();

  // State to keep track of the selected color
	const [selectedColor, setSelectedColor] = useState(uniqueColors[0]);
	const [availableSizes, setAvailableSizes] = useState(getAvailableSizes(selectedColor.id, productData.product.color_size_combinations));
	const [selectedSize, setSelectedSize] = useState(availableSizes[0]);

	useEffect(() => {
    if (productData && productData.product.color_size_combinations) {
      const newAvailableSizes = getAvailableSizes(selectedColor.id, productData.product.color_size_combinations);
      setAvailableSizes(newAvailableSizes);
      if (!newAvailableSizes.some(size => size.id === selectedSize.id)) {
        setSelectedSize(newAvailableSizes.length > 0 ? newAvailableSizes[0] : null);
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
                        value={color}
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
                        value={size}
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
                onClick={() => dispatch(addToCart(productData.product))}
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