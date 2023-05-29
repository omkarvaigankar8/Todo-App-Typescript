import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext } from 'react';
import { UserData } from '../store/UserData';
import { Link, useNavigate } from 'react-router-dom';
import { useForm,SubmitHandler } from "react-hook-form";
import styles from './auth.module.scss'
import homeStyles from '../../App.module.scss'
import {setItem} from '../utils/localStorage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type Inputs = {
    email: string,
    password: string,
  };
const SignIn: React.FC = () => {
    const { setUser } = useContext(UserData);
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
         signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                toast(`Logged In Successfully`)
                console.log(userCredential);
                const userD = {...userCredential?.user}
                setItem('user',userD)
                setUser(userCredential?.user)
                // setTimeout(()=>{
                // navigate('./home')
                // },2000)
            })
            .catch((error) => {
                toast(`${error.message}`);
                console.log('error', error);
            });
    
    };

    return (
        <div className={homeStyles.pageWrapper}>
            <div className={styles.innerWrapper}>
                <h2>Login</h2>
                
                <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
                    {/* <label>Email:</label> */}
                    <input className={homeStyles.input}  placeholder='Email'  {...register("email", { required: true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} />
                    {errors.email?.type=='required' && <span className={homeStyles.error}>This field is required</span>}
                    {errors.email?.type=='pattern' && <span className={homeStyles.error}>Enter a Proper Email</span>}
                    {/* <label>Password:</label> */}
                    <input type="password" className={homeStyles.input} placeholder='Password'   {...register("password", { required: true,minLength: 8 })} />
                    {errors.password && <span className={homeStyles.error}>This field is required</span>}
                    {errors.password?.type=='minLength' && <span className={homeStyles.error}>Password Length should 8 characters</span>}
                    
                    {/* <button className={styles.submitButton} type="submit">Login</button> */}
                    <button type="submit" className={homeStyles.button}>
                        <span className={homeStyles.span_btn}>
                        Login
                        </span>
                    </button>
                </form>
                <Link to='/signup'>
                <button className={homeStyles.button}>
                        <span className={homeStyles.span_btn}>
                        SignUp
                        </span>
                </button>
                </Link>
            </div>
        <ToastContainer />

        </div>
    );
};

export default SignIn;
