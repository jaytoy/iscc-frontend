import { h } from 'preact';
import { Link } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';


const Home = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const data = await fetchProducts();
				setData(data);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

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
		<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
			<h2 className="text-2xl font-bold tracking-tight text-gray-900">All Products</h2>

			<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
				{data.products.map((product) => (
					<div key={product.id} className="group relative">
						<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
							<img
								src={product.image_url}
								className="h-full w-full object-cover object-center lg:h-full lg:w-full"
							/>
						</div>
						<div className="mt-4 ml-2 flex justify-between">
							<h3 className="text-sm text-gray-700">
								<Link href={`/products/${product.slug}`}>
									<span aria-hidden="true" className="absolute inset-0" />
									{product.name}
								</Link>
							</h3>
							<p className="text-sm font-medium text-gray-900">{product.price.toFixed(2)}€</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

async function fetchProducts() {
	const response = await fetch('http://localhost:8000/products');
	const data = await response.json();
	return data;
}

export default Home;
