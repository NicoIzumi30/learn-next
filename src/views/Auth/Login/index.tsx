import Link from "next/link";
import styles from "./Login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";
  const handlerLogin = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl: callbackUrl,
      });
      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or password incorrect");
      }
    } catch (error) {
      setError("Email or password incorrect");
    }
  };
  return (
    <div className={styles.login}>
      <div className={styles.login__form}>
        <form onSubmit={handlerLogin}>
          <h1 className={styles.login__form__title}>Login</h1>
          {error && <p className={styles.login__form__error}>{error}</p>}
          <div className={styles.login__form__item}>
            <label htmlFor="email" className={styles.login__form__item__label}>
              Email
            </label>
            <input
              type="email"
              className={styles.login__form__item__input}
              id="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className={styles.login__form__item}>
            <label
              htmlFor="password"
              className={styles.login__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className={styles.login__form__item__input}
              id="password"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className={styles.login__form__btn}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className={styles.login__form__or}>Or</p>
        <button
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
          className={styles.login__form__google}
        >
          Sign In With Google
        </button>
      </div>
      <p className={styles.login__link}>
        Don't have an account <Link href="/auth/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginView;
