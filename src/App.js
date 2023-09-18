import React, { useState, useEffect } from 'react';
import './App.css';

// const Result1 = () => {
//    return (
//       <table id="result1">
//          <tr>
//             <th colspan="4" style={{ color: 'red' }}>Todos user:?????</th>
//          </tr>
//          <tr>
//             <th>User id</th>
//             <th>Id</th>
//             <th>Title</th>
//             <th>Completed</th>
//          </tr>
//       </table>
//    );
// };

// const Result2 = () => {
//    return (
//       <table id="result2">
//          <tr>
//             <th colspan="5" style={{ color: 'red' }}>Comments user:????</th>
//          </tr>
//          <tr>
//             <th>Post id</th>
//             <th>Id</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Body</th>
//          </tr>
//       </table>
//    );
// };

const UserButtonTodos = ({ userId, onButtonClick }) => {
   return (
      <button className="btn-todos button button--danger" onClick={() => onButtonClick(userId)}>Todos</button>
   );
};

const UserButtonPosts = ({ userId, onButtonClick }) => {
   return (
      <button className="btn-todos button button--info" onClick={() => onButtonClick(userId)}>Posts</button>
   );
};

const UserButtonAlbums = ({ userId, onButtonClick }) => {
   return (
      <button className="btn-todos button button button--warning" onClick={() => onButtonClick(userId)}>Albums</button>
   );
};


function App() {

   const [users, setUsers] = useState([]);

   useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
         .then(response => response.json())
         .then(users => setUsers(users));
   }, []);

   let userIdDynamic = null;
   const [userTodos, setUserTodos] = useState([]);
   const [todosIsOpen, setTodosIsOpen] = useState(false);

   useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/users/${userIdDynamic}/todos`)
         .then(response => response.json())
         .then(todosUser => setUserTodos(todosUser));
   }, []);

   const clickButtonTodos = (userId) => {
      userIdDynamic = userId;
      setTodosIsOpen(!todosIsOpen);
      console.log(
         ususerTodos.map(userTodo => (
            { user.id }</td >
         }
      );


};




const clickButtonPosts = userId => {
   console.log('posts for user:', userId);
};

const clickButtonAlbums = userId => {
   console.log('Albums for user:', userId);
};



return (
   <>
      <table id="tableUsers" width="100%">
         <tr>
            <th colspan="9">Users</th>
         </tr>
         <tr>
            <th>Id</th>
            <th>Name</th>
            <th>User name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
            <th>Action</th>
         </tr>
         {users.map(user => (
            <tr>
               <td>{user.id}</td>
               <td>{user.name}</td>
               <td>{user.username}</td>
               <td>{user.email}</td>
               <td>{user.address.city}</td>
               <td>{user.phone}</td>
               <td>{user.website}</td>
               <td>{user.company.name}</td>
               <td>
                  <UserButtonTodos userId={user.id} onButtonClick={clickButtonTodos} />
                  <UserButtonPosts userId={user.id} onButtonClick={clickButtonPosts} />
                  <UserButtonAlbums userId={user.id} onButtonClick={clickButtonAlbums} />
               </td>
            </tr>
         ))}
      </table>
   </>)
};

export default App;
