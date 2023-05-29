import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './TodoList.module.scss'
import homeStyles from '../../App.module.scss'
import { useContext } from 'react';
import { UserData } from '../store/UserData';
interface Todo {
  id: number;
  todo: string;
  childTodos: ChildTodo[];
}

interface ChildTodo {
  childId: number;
  childTodo: string;
}

type Inputs = {
  todo: string;
};

type ChildInputs = {
  childTodo: string;
  parentId:number
};
const RemoveIcon = () =>{
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> </svg>
  );
};
const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [openChildTodos, setOpenChildTodos] = useState<number[]>([]);
  const { user } = useContext(UserData);
  
  const {
    register: registerFormParent,
    handleSubmit: handleSubmitFormParent,
    formState: { errors: errorsFormParent },
    reset:resetParent
  } = useForm<Inputs>();
  const {
    register: registerFormChild,
    handleSubmit: handleSubmitFormChild,
    formState: { errors: errorsFormChild },
    reset:resetChild

  } = useForm<ChildInputs>();

  const handleOpenChildTodos = (parentId: number) => {
    if(Number(openChildTodos) == parentId){
      setOpenChildTodos([]);
    }
   else{
    console.log("AAA",parentId)
    console.log("open",openChildTodos)
    setOpenChildTodos((prevOpenChildTodos) => {
      // Check if the parent ID is already in the openChildTodos array
      const isOpen = prevOpenChildTodos.includes(parentId);

      if (isOpen) {
        // If already open, remove the parent ID from the array to close the sublist
        return prevOpenChildTodos.filter((id) => id !== parentId);
      } else {
        // If not open, add the parent ID to the array to open the sublist
        // return [...prevOpenChildTodos, parentId];
        return [parentId];
      }
    });}
  };
  const handleAddTodo: SubmitHandler<Inputs> = (data) => {
    const newParentTodo: Todo = {
      id: Math.random(),
      todo: data.todo,
      childTodos: [],
    };

    setTodos((prevTodos) => [...prevTodos, newParentTodo]);
    resetParent();

  };

  const handleAddChildTodo: SubmitHandler<ChildInputs> = (data) => {
    resetChild();
    // if (childTodo.trim() !== '') {
      const newChildTodo: ChildTodo = {
        childId: Math.random(),
        childTodo: data.childTodo,
      };
      // resetChild();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === data.parentId) {
            return {
              ...todo,
              childTodos: [...todo.childTodos, newChildTodo],
            };
          }
          return todo;
        })
      );
      console.log("todo",todos)
        
     
    // }
  };

  const handleRemoveTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleRemoveChildTodo = (parentId: number, childId: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === parentId) {
          return {
            ...todo,
            childTodos: todo.childTodos.filter(
              (childTodo) => childTodo.childId !== childId
            ),
          };
        }
        return todo;
      })
    );
  };

  return (
    <div className={homeStyles.pageWrapper}>
        {/* {console.log("tod",todos)} */}
      <div className={styles.innerWrapper}>
      <h1>Hello {user?.email},</h1>
      <h2>Your Todo List</h2>
      <form className={styles.formWrapper} onSubmit={handleSubmitFormParent(handleAddTodo)}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={homeStyles.input} 

          {...registerFormParent('todo', { required: true })}
          placeholder="Add a new todo..."
        />
        {errorsFormParent.todo && <span className={homeStyles.error}>This field is required</span>}
        </div>
        <button className={homeStyles.button}  type="submit"><span className={homeStyles.span_btn}>Add</span></button>
      </form>
      <ul className={styles.parentList}>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div>
              <div className={styles.parentTodo}>
              <p className={`${styles.para} ${homeStyles.cursor}`} onClick={()=>{
                handleOpenChildTodos(todo.id)
              }}>{todo.todo}</p>
            <span onClick={() => handleRemoveTodo(todo.id)}><RemoveIcon/></span>
            </div>
            {openChildTodos.includes(todo.id) &&(
            <>
             
              <ul className={styles.childList}>
                {todo.childTodos.map((childTodo) => (
                  <li key={childTodo.childId}>
                    <span className={styles.childPara}>{childTodo.childTodo}</span>
                    <span className={styles.childIcon}  onClick={() => handleRemoveChildTodo(todo.id, childTodo.childId)}>
                    <RemoveIcon/>
                    </span>
                  </li>
                ))}
              </ul>
              <form className={`${styles.formWrapper} ${styles.ChildForm}`} onSubmit={handleSubmitFormChild((data) => handleAddChildTodo({ ...data, parentId: todo.id }))}>
                <div className={styles.inputWrapper}>
                <input
                className={homeStyles.input} 
                  type="text"
                  {...registerFormChild('childTodo', { required: true })}
                  placeholder="Add a new child todo..."
                />
                {errorsFormChild.childTodo && <span className={homeStyles.error}>This field is required</span>}
                </div>
                <button className={homeStyles.button}  type="submit"><span className={homeStyles.span_btn}>Add</span></button>
              </form>
              </>
              )}
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default TodoList;
