import ProductView from "../../views/Product/index";
import { ProductType } from "@/types/product.type";

const ProductPage = (props : {products : ProductType[]}) => {
    const {products} = props;
    return (
        <div>
            <ProductView products = {products} />
        </div>
    )
}
export default ProductPage


export async function getServerSideProps() {
    // fetch data
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product`)
    const response = await res.json()
    return {
        props: {
            products: response.data
        }
    }
}
