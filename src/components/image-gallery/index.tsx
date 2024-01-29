import { h } from 'preact';


interface Props {
	product_id: number;
  product_name: string;
  image_url: string;
}

const ImageGallery = ({ product_id, product_name, image_url }: Props) => {
  return (
    <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
      <h2 className="sr-only">Images</h2>

      <div className="">
        <img
          key={product_id}
          src={image_url}
          alt={product_name}
          className='rounded-lg'
        />
      </div>
    </div>
  )
}

export default ImageGallery;