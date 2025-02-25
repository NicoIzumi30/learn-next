import { signIn,signOut, useSession } from 'next-auth/react'
import style from './Nabvar.module.css'
import Script from 'next/script';
import Image from 'next/image';
const Navbar = () => {
    const {data} : any = useSession(); 
    console.log(data)
    return  (
        <div className={style.navbar}>
            <div id='title'></div>
            <Script id="script-title" strategy='lazyOnload'>
                {`document.getElementById('title').innerHTML = 'Navbar'`}
            </Script>
            <div className={style.profile}>
                {data?.user?.image && (<Image width={30} height={30} className={style.avatar} src={data.user.image} alt={data.user.fullname} />)}
                {data && data.user.fullname}
                {data ? (
                    <button className={style.button} onClick={() => signOut()}>Sign Out</button>
                ):(
                    <button className={style.button} onClick={() => signIn()}>Sign In</button>
                )}
            </div>
        </div>
    )
}
export default Navbar