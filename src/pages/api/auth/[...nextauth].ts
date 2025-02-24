import { signIn } from "@/lib/firebase/service";
import { compare } from "bcrypt";
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
                const {email,password} = credentials as {
                    email: string,
                    password: string
                };
                const user : any = await signIn({email});
                if(user){
                    const passwordConfirm = await compare(password,user.password);
                    if(passwordConfirm){
                        return user;
                    }else{
                        return null;
                    }
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
                token.role = user.role;
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
            if(token.role){
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages:{
        signIn: "/auth/login",
    }
}

export default NextAuth(authOptions)