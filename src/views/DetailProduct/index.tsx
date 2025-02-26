import { ProductType } from '@/types/product.type';
import styles from './DetailProduct.module.scss';
import Image from 'next/image';
const DetailProductView = ({product} : {product:ProductType}) => {
    return (
        <>
        <h1 className={styles.title}>Detail Product</h1>
        <div className={styles.detailProduct}>
        <div className={styles.detailProduct__image}>
          <Image src={product.image} alt={product.name} width={300} height={300} />
        </div>
        <h4 className={styles.detailProduct__name}>
          {product.name}
        </h4>
        <p className={styles.detailProduct__category}>
          {product.category}
        </p>
        <p className={styles.detailProduct__price}>
          {product.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>
      </div>
      </>
    )
}

export default DetailProductView