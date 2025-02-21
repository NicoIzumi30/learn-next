import { signIn,signOut, useSession } from 'next-auth/react'
import style from './Nabvar.module.css'
const Navbar = () => {
    const {data} : any = useSession(); 
    console.log(data)
    return  (
        <div className={style.navbar}>
            <div>Navbar</div>
            <div>
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