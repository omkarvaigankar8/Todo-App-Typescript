import { useNavigate } from 'react-router-dom';
import AuthDetails from './components/auth/AuthDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Views from './components/utils/View';
import { UserData } from './components/store/UserData';
import { useEffect, useState } from 'react';
import styles from './App.module.scss'

function App() {
  
    const navigate = useNavigate();
  const [user, setUser] = useState<any | null>(null); // Replace `any` with the appropriate user type if available
  useEffect(() => {
    console.log("user", user);
    if(user){
      navigate('./home')
    }
  }, [user]);

  return (
    <UserData.Provider value={{ user, setUser }}>
      <div className={styles.App}>
      <AuthDetails />
        {/* {user !== null &&(
        <Link to='/home'>Dashboard</Link>
        )} */}
        <Views />
        
      </div>
    </UserData.Provider>
  );
}

export default App;
