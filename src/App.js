import React, { useState, useEffect } from 'react';
import './App.css';
//import { isEditable } from '@testing-library/user-event/dist/utils';

function App() {

   function Button({ onClick, children, userId, className, typeRequest }) {

      return (
         <button className={className} onClick={() => onClick(userId, typeRequest)}>
            {children}
         </button>
      );
   };

   const [currentUserId, setCurrentUserId] = useState('');
   const [currentTypeRequest, setCurrentTypeRequest] = useState('');
   const [res1IsOpen, setRes1IsOpen] = useState(false);
   const displayStyle = res1IsOpen ? { display: 'inline-table' } : { display: 'none' };

   function handleOpenTodos(userId, typeRequest) {
      setCurrentTypeRequest(typeRequest);
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

   function Result1({ todos }) {
      if (currentTypeRequest === 'todos') {
         return (
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
         );
      } else if (currentTypeRequest === 'posts') {
         return (
            <h1>Posts</h1>
         )
      } else if (currentTypeRequest === 'albums') {
         return (
            <h1>Albums</h1>
         )
      };

   };

   return (
      <div id="table-wrapper">
         <table id="tableUsers">
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
                        <Button className={"btn-todos button button--danger"} onClick={handleOpenTodos} userId={user.id} typeRequest={'todos'}>
                           Todos
                        </Button>
                        <Button className={"btn-posts button button--info"} onClick={handleOpenTodos} userId={user.id} typeRequest={'posts'}>
                           Posts
                        </Button>
                        <Button className={"btn-albums button button--warning"} onClick={handleOpenTodos} userId={user.id} typeRequest={'albums'}>
                           Albums
                        </Button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         {/* <table id="result1" style={displayStyle}>
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
         </table> */}
         <Result1 todos={todos} />
      </div>
   )
};

export default App;
