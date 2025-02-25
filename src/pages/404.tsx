import styles from '@/styles/404.module.scss'
import Image from 'next/image'
const Custom404Page = () => {
    return (
        <div className={styles.error}>
            {/* <img src="/notfound.png" alt="404" className={styles.error__image} /> */}
            <Image src={"/notfound.png"} alt="404" width={600} height={600} className={styles.error__image} />
            <h1>404 - Page Not Found</h1>   
        </div>
    )
}

export default Custom404Page