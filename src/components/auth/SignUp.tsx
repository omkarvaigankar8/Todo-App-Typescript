import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useContext } from 'react';
import { UserData } from '../store/UserData';
import { Link, useNavigate } from 'react-router-dom';
import { useForm,SubmitHandler } from "react-hook-form";
import homeStyles from '../../App.module.scss'
import styles from './auth.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type Inputs = {
    email: string,
    password: string,
  };
const SignUp: React.FC = () => {
    const { setUser } = useContext(UserData);
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                toast("Account Created & Logged In Redirect to Dashboard!");
           
                setUser(userCredential?.user);
            })
            .catch((error) => {
                toast(`${error.message}`);
            });
    
    };

    return (
        <div className={homeStyles.pageWrapper}>
            <div className={styles.innerWrapper}>
            <h2>Register</h2>
            
            <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
              
                <input className={homeStyles.input} type="email"  placeholder='email'   {...register("email", { required: true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} />
                {errors.email && <span className={homeStyles.error}>This field is required</span>}
                {errors.email?.type=='pattern' && <span className={homeStyles.error}>Enter a Proper Email</span>}
                
                <input className={homeStyles.input} type="password" placeholder='password'  {...register("password", { required: true,minLength: 8 })} />
                {errors.password && <span className={homeStyles.error}>This field is required</span>}
                {errors.password?.type=='minLength' && <span className={homeStyles.error}>Password Length should 8 characters</span>}
                
                {/* <button type="submit">Sign Up</button> */}
                <button type="submit"  className={homeStyles.button}>
                    <span className={homeStyles.span_btn}>
                    Sign Up
                    </span>
                </button>
            </form>
            
            <Link to='/'>
                <button className={homeStyles.button}>
                        <span className={homeStyles.span_btn}>
                        SignIn
                        </span>
                </button>
                </Link>
        </div>
        <ToastContainer />
        </div>
    );
};

export default SignUp;
