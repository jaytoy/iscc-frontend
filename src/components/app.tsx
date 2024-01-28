import { h } from 'preact';
import { Route, Router } from 'preact-router';
import { Provider } from 'react-redux';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Product from '../routes/products';
import store from '../redux/store';

const App = () => (
	<Provider store={store}>
		<div id="app" className="bg-white">
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/products/:product" component={Product} />
				</Router>
			</main>
		</div>
	</Provider>
);

export default App;
