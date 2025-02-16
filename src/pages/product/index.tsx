import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "./Product.module.scss"
type productType = {
        id : number;
        name : string;
        price : number;
       size : string;
};
const ProductPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [products,setProducts] = useState([])
    const {push,query} = useRouter();

    useEffect(() => {
        if(!isLogin) {
            push('/auth/login')
        }   
    },[])
    useEffect(() => {
        fetch("/api/product").then((res) => res.json()).then((response) => {
            setProducts(response.data)
        })},[]);
 return (
    <div className={styles.productContainer}>
        <h1 className="text-3xl font-bold">Product Page</h1>
        <div className="relative overflow-x-auto w-[500px]    ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Size</th>
            </tr>
            </thead>
            <tbody>
                {
                    products.map((product:productType) => {
                        return (
                            <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <td  scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.name}</td>
                                <td className="px-6 py-4">{product.price}</td>
                                <td className="px-6 py-4">{product.size}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
       
    </div>
 )   
}
export default ProductPage