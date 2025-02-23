import Link from "next/link";
import styles from "./Register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const RegisterView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const {push} = useRouter();

    const handlerRegister = async (event:any) => {
        event.preventDefault();
        setIsLoading(true);
        const data = {
            email : event.target.email.value,
            fullname : event.target.fullname.value,
            password : event.target.password.value,
        };
        const result = await fetch('/api/register',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if(result.status === 200) {
            event.target.reset()
            setIsLoading(false);
            push('/auth/login')
        }else{
            setIsLoading(false);
            setError(result.status === 400 ? "Email already exist" : "Error Register")
        }
    }
  return (
    <div className={styles.register}>
      <div className={styles.register__form}>
        <form onSubmit={handlerRegister}>
          <h1 className={styles.register__form__title}>Register</h1>
          {error && <p className={styles.register__form__error}>{error}</p>}
          <div className={styles.register__form__item}>
            <label
              htmlFor="email"
              className={styles.register__form__item__label}
            >
              Email
            </label>
            <input
              type="email"
              className={styles.register__form__item__input}
              id="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className={styles.register__form__item}>
            <label
              htmlFor="fullname"
              className={styles.register__form__item__label}
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              className={styles.register__form__item__input}
              id="fullname"
              placeholder="Full Name"
            />
          </div>
          <div className={styles.register__form__item}>
            <label
              htmlFor="password"
              className={styles.register__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className={styles.register__form__item__input}
              id="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className={styles.register__form__btn} disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p className={styles.register__link}>
        Already have an account? <Link href="/auth/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterView;
