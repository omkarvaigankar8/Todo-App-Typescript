import { useNavigate } from 'react-router-dom';
import AuthDetails from './components/auth/AuthDetails';
import Views from './components/utils/View';
import { UserData } from './components/store/UserData';
import { useEffect, useState } from 'react';
import styles from './App.module.scss'

function App() {
  
    const navigate = useNavigate();
  const [user, setUser] = useState<any | null>(null); 
  useEffect(() => {
    if(user){
      navigate('./home')
    }
  }, [user]);

  return (
    <UserData.Provider value={{ user, setUser }}>
      <div className={styles.App}>
      <AuthDetails />
        <Views />
        
      </div>
    </UserData.Provider>
  );
}

export default App;
