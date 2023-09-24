import React, { useState, useEffect } from 'react';
import './App.css';
import { isEditable } from '@testing-library/user-event/dist/utils';

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


// function App() {

//    const UserButtonTodos = ({ userId, onButtonClick }) => {
//       return (
//          <button className="btn-todos button button--danger" onClick={() => onButtonClick(userId)}>Todos</button>
//       );
//    };

//    const [users, setUsers] = useState([]);

//    useEffect(() => {
//       fetch('https://jsonplaceholder.typicode.com/users')
//          .then(response => response.json())
//          .then(users => setUsers(users));
//    }, []);

//    const clickButtonTodos = (userId) => {
//       return (
//          <>
//          <table id="result1">
//             <tr>
//                <th colspan="4" style={{ color: 'red' }}>Todos user {userId}</th>
//             </tr>
//             <tr>
//                <th>User id</th>
//                <th>Id</th>
//                <th>Title</th>
//                <th>Completed</th>`
//                </tr>
//             </table>
//          </>
//       );
//    };
   

//    return (
//       <>
//          <div id="table-wrapper">
//             <table id="tableUsers" width="100%">
//                <tr>
//                   <th colspan="9">Users</th>
//                </tr>
//                <tr>
//                   <th>Id</th>
//                   <th>Name</th>
//                   <th>User name</th>
//                   <th>Email</th>
//                   <th>Address</th>
//                   <th>Phone</th>
//                   <th>Website</th>
//                   <th>Company</th>
//                   <th>Action</th>
//                </tr>
//                {users.map(user => (
//                   <tr>
//                      <td>{user.id}</td>
//                      <td>{user.name}</td>
//                      <td>{user.username}</td>
//                      <td>{user.email}</td>
//                      <td>{user.address.city}</td>
//                      <td>{user.phone}</td>
//                      <td>{user.website}</td>
//                      <td>{user.company.name}</td>
//                      <td>
//                         <UserButtonTodos userId={user.id} onButtonClick={clickButtonTodos} />
//                         <UserButtonTodos userId={user.id} onButtonClick={clickButtonTodos} />
//                         <UserButtonTodos userId={user.id} onButtonClick={clickButtonTodos} />
//                      </td>
//                   </tr>
//                ))}
//             </table>
//             {clickButtonTodos()}
//          </div>
//       </>
//    )
// };

function App() {
   
   function Button({ onClick, children, userId }) {

      return (
         <button className="btn-todos button button--danger" onClick={() => onClick(userId)}>
            {children}
         </button>
      );
   };
   const [currentUserId, setCurrentUserId] = useState('');
   const [res1IsOpen, setRes1IsOpen] = useState(false);
   let displayStyle = res1IsOpen ? { display:'inline-table'} : { display : 'none'};

   function handleOpenTodos(userId) {
      setCurrentUserId(userId);
      setRes1IsOpen(!res1IsOpen);
   }

   const [users, setUsers] = useState([]);
   
   useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
         .then(response => response.json())
         .then(users => setUsers(users));
   }, []);

   return (
      <div id="table-wrapper">
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

            </tr>
            {users.map(user => (
               <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.address.city}</td>
                  <td>{user.phone}</td>

                  <td>
                     <Button onClick={handleOpenTodos} userId={user.id}>
                        Todos user # {user.id}
                     </Button>
                  </td>
               </tr>
            ))}
         </table>
         <table id="result1" style={displayStyle}>
            <tr>
               <th colspan="4" style={{ color: 'red' }}>Todos user: {currentUserId}</th>
            </tr>
            <tr>
               <th>User id</th>
               <th>Id</th>
               <th>Title</th>
               <th>Completed</th>
               </tr>
         </table>
      </div>
   
   )
};

export default App;
