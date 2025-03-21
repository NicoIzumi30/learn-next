import { useSession } from "next-auth/react"

const ProfilePage = () => {
    const {data} : any = useSession()
    return (
        <div>
            <h1>Profile Page</h1>
            <p>{data && data.user.fullname}</p>
        </div>
    )
}
export default ProfilePage