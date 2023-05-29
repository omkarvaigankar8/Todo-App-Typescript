import React from 'react';
import TodoList from '../components/UI/TodoList';
import { useContext } from 'react';
import { UserData } from '../components/store/UserData';
const Dashboard: React.FC = () => {
    const { user } = useContext(UserData);
    return (
       
            
            <TodoList />
       
    );
};

export default Dashboard;
