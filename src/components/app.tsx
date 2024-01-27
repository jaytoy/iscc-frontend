import { h } from 'preact';
import { Route, Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Product from '../routes/products';

const App = () => (
	<div id="app" className="bg-white">
		<Header />
		<main>
			<Router>
				<Route path="/" component={Home} />
				<Route path="/products/:product" component={Product} />
			</Router>
		</main>
	</div>
);

export default App;
