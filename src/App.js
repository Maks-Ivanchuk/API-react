import React, { useState, useEffect } from 'react';
import './App.css';
//import { isEditable } from '@testing-library/user-event/dist/utils';

function App() {
   
   function Button({ onClick, children, userId, className }) {

      return (
         <button className={className} onClick={() => onClick(userId)}>
            {children}
         </button>
      );
   };
   const [currentUserId, setCurrentUserId] = useState('');
   const [res1IsOpen, setRes1IsOpen] = useState(false);
   let displayStyle = res1IsOpen ? { display:'inline-table'} : { display : 'none'};

   function handleOpenTodos(userId) {
      setCurrentUserId(userId);
      if (res1IsOpen === false) {
         setRes1IsOpen(!res1IsOpen)
      }
   }

   const [users, setUsers] = useState([]);
   
   useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
         .then(response => response.json())
         .then(users => setUsers(users));
   }, []);

   const [todos, setTodos] = useState([]);

   useEffect(() => {
      if (currentUserId === '') {
         return
      }

      fetch(`https://jsonplaceholder.typicode.com/users/${currentUserId}/todos`)
         .then(response => response.json())
         .then(todos => { 
            if (Object.keys(todos).length > 0) {
               setTodos(todos);
            } else {
               return
            }
         })
   }, [currentUserId]);
   
   return (
      <div id="table-wrapper">
         <table id="tableUsers" width="100%">
            <thead>
               <tr>
                  <th colSpan="9">Users</th>
               </tr>
               <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>User name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Website</th>
               </tr>
            </thead>
            <tbody>
               {users.map(user => (
                  <tr key={user.id}>
                     <td>{user.id}</td>
                     <td>{user.name}</td>
                     <td>{user.username}</td>
                     <td>{user.email}</td>
                     <td>{user.address.city}</td>
                     <td>{user.phone}</td>
                     <td>
                        <Button className={"btn-todos button button--danger"} onClick={handleOpenTodos} userId={user.id}>
                           Todos user # {user.id}
                        </Button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         <table id="result1" style={displayStyle}>
            <thead>
               <tr>
                  <th colSpan="4" style={{ color: 'red' }}>Todos user: {currentUserId}</th>
               </tr>
               <tr>
                  <th>User id</th>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Completed</th>
               </tr>
            </thead>
            <tbody>
               {todos.map(todo => (
                  <tr key={todo.id}>
                     <td>{todo.userId}</td>
                     <td>{todo.id}</td>
                     <td>{todo.title}</td>
                     <td>{todo.completed.toString()}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
};

export default App;
