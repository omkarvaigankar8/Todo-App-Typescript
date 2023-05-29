import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useContext } from 'react';
import { UserData } from '../store/UserData';
import { useNavigate } from 'react-router-dom';
import { removeItem } from '../utils/localStorage';
import homeStyles from '../../App.module.scss'

const AuthDetails: React.FC = () => {
    const { user, setUser } = useContext(UserData);
    const navigate = useNavigate();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => {
            listen();
        };
    }, []);

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
        removeItem('user')
        navigate('/')
            })
            .catch(error => console.log(error));
    };

    return (
        <div className={homeStyles.logout}>
            {user && (
                <>
                    <button className={homeStyles.button} onClick={userSignOut}><span className={homeStyles.span_btn}>Log Out</span></button>
                </>
            )}
        </div>
    );
};

export default AuthDetails;
