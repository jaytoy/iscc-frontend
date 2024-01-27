import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import ProductOverviews from '../../components/product-overviews';


function determineBgColor(color) {
	if (color.hex_code === '#000000') {
		return 'bg-gray-900';
	} else if (color.hex_code === '#FFFFFF') {
		return 'bg-white';
	} else if (color.hex_code === '#3932cf') {
		return 'bg-indigo-600';
	} else if (color.hex_code === '#76cf32') {
		return 'bg-green-300';
	} else if (color.hex_code === '#a80d0d') {
		return 'bg-red-500';
	}
}

function determineRingColor(color) {
	if (color.hex_code === '#000000') {
		return 'ring-gray-900';
	} else if (color.hex_code === '#FFFFFF') {
		return 'ring-gray-200';
	} else if (color.hex_code === '#3932cf') {
		return 'ring-indigo-600';
	} else if (color.hex_code === '#76cf32') {
		return 'ring-green-300';
	} else if (color.hex_code === '#a80d0d') {
		return 'ring-red-500';
	}
}

interface Props {
	product: string;
}

// 'productSlug' comes from the URL, courtesy of our router
const Product = ({ product }: Props) => {
	const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

	const [uniqueColors, setUniqueColors] = useState([]);

	
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const data = await fetchProduct(product);
				setData(data);

				// Process the data
				const newUniqueColors = [];
				data.product.color_size_combinations.forEach(item => {
					const color = { 
						...item.color, 
						bg_color: determineBgColor(item.color),
						ring_color: determineRingColor(item.color)
					};

					// Check if the color is already in the uniqueColors array
					if (!newUniqueColors.some(c => c.id === color.id)) {
						newUniqueColors.push(color);
					}
				});
				// Set the unique colors
				setUniqueColors(newUniqueColors);
			} catch (error) {
					setError(error);
			} finally {
					setIsLoading(false);
			}
		};

		fetchData();
	}, [product]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!data) {
		return <div>No data found</div>;
	}

	return (
		<div>
			<ProductOverviews productData={data} uniqueColors={uniqueColors} />
		</div>
	);
};

async function fetchProduct(product: string) {
	const response = await fetch(`http://localhost:8000/products/${product}`);
	const data = await response.json();
	return data;
}

export default Product;
