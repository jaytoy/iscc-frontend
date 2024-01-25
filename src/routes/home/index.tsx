import { RadioGroup } from '@headlessui/react';
import { h } from 'preact';
import { useState } from 'preact/hooks';


const product = {
  name: 'Basic Tee',
  price: '35 €',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Women', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      id: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Back of women's Basic Tee in black.",
			primary: true,
    },
		// {
    //   id: 2,
    //   imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
    //   imageAlt: "Back of women's Basic Tee in black.",
		// 	primary: false,
    // }
  ],
  colors: [
    { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
    { name: 'Heather Grey', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400' },
  ],
  sizes: [
    { name: 'XXS', inStock: true },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: false },
  ],
  description: `
    <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
    <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
  `,
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Home = () => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])

	return (
		<main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
			<div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
				<div className="lg:col-span-5 lg:col-start-8">
					<div className="flex justify-between">
						<h1 className="text-2xl font-medium text-gray-900">{product.name}</h1>
						<p className="text-2xl font-medium text-gray-900">{product.price}</p>
					</div>
				</div>

				{/* Image gallery */}
				<div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
					<h2 className="sr-only">Images</h2>

					<div className="">
						{product.images.map((image) => (
							<img
								key={image.id}
								src={image.imageSrc}
								alt={image.imageAlt}
								className='rounded-lg'
							/>
						))}
					</div>
				</div>

				<div className="mt-8 lg:col-span-5">
					<form>
						{/* Color picker */}
						<div>
							<h2 className="text-sm font-medium text-gray-900">Color</h2>

							<RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
								<RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
								<div className="flex items-center space-x-3">
									{product.colors.map((color) => (
										<RadioGroup.Option
											key={color.name}
											value={color}
											className={({ active, checked }) =>
												classNames(
													color.selectedColor,
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
													color.bgColor,
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
									{product.sizes.map((size) => (
										<RadioGroup.Option
											key={size.name}
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
											<label htmlFor={size.name}>{size.name}</label>
										</RadioGroup.Option>
									))}
								</div>
							</RadioGroup>
						</div>

						<button
							type="submit"
							className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Add to cart
						</button>
					</form>

					{/* Product details */}
					<div className="mt-10">
						<h2 className="text-sm font-medium text-gray-900">Description</h2>

						<div
							className="prose prose-sm mt-4 text-gray-500"
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{ __html: product.description }}
						/>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Home;
