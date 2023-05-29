import React from 'react';
import TodoList from '../components/UI/TodoList';
import { useContext } from 'react';
import { UserData } from '../components/store/UserData';
// import styles from '../App.module.scss'
const Dashboard: React.FC = () => {
    const { user } = useContext(UserData);
    return (
        // <div className={styles.mainWrapper}>
            
            <TodoList />
        // </div>
    );
};

export default Dashboard;
