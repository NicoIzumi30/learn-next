import Link from "next/link"
import { useRouter } from "next/router"
import style from "./Login.module.scss"
const LoginViews = () => {
    const {push} = useRouter()
    const handlerLogin = () => {
        push('/product')
    }
    return (
        <div className={style.login}>
            <h1 className="text-3xl font-bold underline">Login Page</h1>
            <button onClick={()=>handlerLogin()}>Login</button>
            <p style={{color:"red",border:"1px solid red",borderRadius:"10px",padding:"10px",marginTop:"5px"}}>Belum punya akun? Register <Link href={'/auth/register'}>disini</Link></p>
        </div>
    )
}
export default LoginViews