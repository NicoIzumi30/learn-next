import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    session:{
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers:[
        Credentials({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email : {label: "Email", type: "email"},
                fullname: {label: "Full Name", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                const {email,fullname,password} = credentials as {
                    email: string,
                    fullname: string,
                    password: string
                };
                const user : any = {id:1,email: email,fullname: fullname,password: password}
                if(user){
                    return user;
                }else{
                    return null;
                }
            }
        })
    ],
    callbacks: {
        jwt({token,account,profile,user}:any){
            if(account?.provider == "credentials"){
                token.email = user.email;
                token.fullname = user.fullname;
            }
            return token;
        },
        async session({session,token} : any){
            if(token.email){
                session.user.email = token.email;
            }
            if(token.fullname){
                session.user.fullname = token.fullname;
            }
            console.log(session.user);
            return session;
        }
    }
}

export default NextAuth(authOptions)