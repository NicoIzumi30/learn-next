import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductView from "../../views/Product/index";
import { fetcher } from "../../lib/swr/fetcher";
import useSWR from "swr";
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const { push, query } = useRouter();

  const { data, error, isLoading } = useSWR("/api/product", fetcher);
  // useEffect(() => {
  //     fetch("/api/product").then((res) => res.json()).then((response) => {
  //         setProducts(response.data)
  //     })},[]);
  return (
    <div>
      <ProductView products={isLoading ? [] : data.data} />
    </div>
  );
};
export default ProductPage;
