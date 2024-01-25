import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { h } from 'preact';


const Header = () => (
	<header className="relative">
		<nav aria-label="Top">
			{/* Navigation */}
			<div className="bg-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="border-b border-gray-200">
						<div className="flex h-16 items-center justify-between">
							{/* Logo (lg+) */}
							<div className="hidden lg:flex lg:items-center">
								<a href="#">
									<span className="sr-only">Preact E-Commerce</span>
									<img
										className="h-8 w-auto"
										src="../../assets/preact-logo.svg"
										alt=""
									/>
								</a>
							</div>

							{/* Mobile menu and search (lg-) */}
							<div className="flex flex-1 items-center lg:hidden">
								{/* Search */}
								<a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
									<span className="sr-only">Search</span>
									<MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
								</a>
							</div>

							{/* Logo (lg-) */}
							<a href="#" className="lg:hidden">
								<span className="sr-only">Your Company</span>
								<img
									src="../../assets/preact-logo.svg"
									alt=""
									className="h-8 w-auto"
								/>
							</a>

							<div className="flex flex-1 items-center justify-end">
								<div className="flex items-center lg:ml-8">
									<div className="flex space-x-8">
										<div className="hidden lg:flex">
											<a href="#" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
												<span className="sr-only">Search</span>
												<MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
											</a>
										</div>

										<div className="flex">
											<a href="#" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
												<span className="sr-only">Account</span>
												<UserIcon className="h-6 w-6" aria-hidden="true" />
											</a>
										</div>
									</div>

									<span className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true" />

									<div className="flow-root">
										<a href="#" className="group -m-2 flex items-center p-2">
											<ShoppingCartIcon
												className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
												aria-hidden="true"
											/>
											<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
											<span className="sr-only">items in cart, view bag</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</header>
);

export default Header;
