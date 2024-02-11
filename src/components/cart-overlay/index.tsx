import { Fragment, h } from 'preact';
import { Dialog as PDialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { removeFromCart, setQuantity } from '../../redux/cart.slice';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Dialog: any = PDialog;

const CartOverlay = ({ open, setOpen, cart }) => {
  // Reference to the dispatch function from redux store
  const dispatch = useDispatch();
  
  const onQuantityChange = (itemId, newQty) => {
    dispatch(setQuantity({itemId, newQty}));
  }

  console.log('cart', cart);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                            Shopping Cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <section className="">
                          {cart.cartItems.length === 0 ? (
                            <h1>Your Cart is Empty!</h1>
                          ) : (
                            <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                              {cart.cartItems.map((item, itemIdx) => (
                                <li key={item.id} className="flex py-6 sm:py-10">
                                  <div className="flex-shrink-0">
                                    <img src={item.image_url} alt="" height="90" width="65" className="w-12 h-12 rounded-md object-center object-cover sm:w-24 sm:h-24" />
                                  </div>
                
                                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                      <div>
                                        <div className="flex justify-between">
                                          <h3 className="text-sm">
                                            <a href={item.href} className="font-medium text-gray-700 hover:text-gray-800">
                                              {item.name}
                                            </a>
                                          </h3>
                                        </div>
                                        <p className="mt-1 text-sm font-medium text-gray-900">{item.price}€</p>
                                      </div>
                
                                      <div className="mt-4 sm:mt-0 sm:pr-9">
                                        <label htmlFor={`quantity-${itemIdx}`} className="sr-only">
                                          Quantity, {item.quantity}
                                        </label>
                                        <select
                                            value={item.quantity}
                                            onChange={(e) => onQuantityChange(item.id, (e.target as HTMLSelectElement).value)}
                                            id={`quantity-${itemIdx}`}
                                            name={`quantity-${itemIdx}`}
                                            className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                          <option value={1}>1</option>
                                          <option value={2}>2</option>
                                          <option value={3}>3</option>
                                          <option value={4}>4</option>
                                          <option value={5}>5</option>
                                          <option value={6}>6</option>
                                          <option value={7}>7</option>
                                          <option value={8}>8</option>
                                        </select>
                
                                        <div className="absolute top-0 right-0">
                                          <button
                                            onClick={() => dispatch(removeFromCart(item.id))} 
                                            type="button" 
                                            className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                                          >
                                          <span className="sr-only">Remove</span>
                                          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </section>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </>
      </Dialog>
    </Transition.Root>
  )
}

export default CartOverlay;