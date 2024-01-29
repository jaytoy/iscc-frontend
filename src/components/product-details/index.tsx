import { h } from 'preact';


interface Props {
  description: string;
}

const ProductDetails = ({ description }: Props) => {
  return (
    <div className="mt-10">
      <h2 className="text-sm font-medium text-gray-900">Description</h2>

      <div
        className="prose prose-sm mt-4 text-gray-500"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  )
}

export default ProductDetails;