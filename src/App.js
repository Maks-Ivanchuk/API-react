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

   function ButtonComents({ children, className, onClick, typeRequest }) { 
      return (
         <button className={className} onClick={() => onClick(typeRequest)}>
            {children}
         </button>
      )
   }

   function ButtonAlbums({ children, className }) { 
      return (
         <button className={className}>
            {children}
         </button>
      )
   }

   const [currentUserId, setCurrentUserId] = useState('');
   const [currentTypeRequest, setCurrentTypeRequest] = useState('');
   const [res1IsOpen, setRes1IsOpen] = useState(false);
   const [res2IsOpen, setRes2IsOpen] = useState(false);
   const displayStyleRes1 = res1IsOpen ? { display: 'inline-table' } : { display: 'none' };
   const displayStyleRes2 = res2IsOpen ? { display: 'inline-table' } : { display: 'none' };

   function handleOpenRes1(userId, typeRequest) {
      setCurrentTypeRequest(typeRequest);
      setCurrentUserId(userId);
      if (res1IsOpen === false) {
         setRes1IsOpen(!res1IsOpen)
      }
   }

// ---------------------------------------------------------------------------
   function handleOpenRes2( typeRequest) {
      setCurrentTypeRequest(typeRequest); //спробую з одним typeRequest
      if (res2IsOpen === false) {
         setRes2IsOpen(!res2IsOpen)
      }
   }
// ---------------------------------------------------------------------------
   
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

   const [posts, setPosts] = useState([]);

   useEffect(() => {
      if (currentUserId === '') {
         return
      }

      fetch(`https://jsonplaceholder.typicode.com/users/${currentUserId}/posts`)
         .then(response => response.json())
         .then(posts => {
            if (Object.keys(posts).length > 0) {
               setPosts(posts);
            } else {
               return
            }
         })
   }, [currentUserId]);

   const [albums, setAlbums] = useState([]);

   useEffect(() => {
      if (currentUserId === '') {
         return
      }

      fetch(`https://jsonplaceholder.typicode.com/users/${currentUserId}/albums`)
         .then(response => response.json())
         .then(albums => {
            if (Object.keys(albums).length > 0) {
               setAlbums(albums);
            } else {
               return
            }
         })
   }, [currentUserId]);

   function Result1({ todos, posts, albums }) {
      if (currentTypeRequest === 'todos') {
         return (
            <table id="result1" style={displayStyleRes1}>
               <thead>
                  <tr>
                     <th colSpan="4" className='table-title'>Todos user: {currentUserId}</th>
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
            <table id="result1" style={displayStyleRes1}>
               <thead>
                  <tr>
                     <th colSpan = "5" className='table-title'>Posts user: {currentUserId}</th>
                  </tr>
                  <tr>
                     <th>User id</th>
                     <th>Id</th>
                     <th>Title</th>
                     <th>Body</th>
                     <th>Action</th>
                     </tr>
               </thead>
               <tbody>
                  {posts.map(post => (
                     <tr key={post.id}>
                        <td>{post.userId}</td>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                        <td>
                           <ButtonComents className={"btn-todos button button--info"} onClick={handleOpenRes2}  typeRequest={'coments'}>
                              Coments
                           </ButtonComents>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )
      } else if (currentTypeRequest === 'albums') {
         return (
            <table id="result1" style={displayStyleRes1}>
               <thead>
                  <tr>
                     <th colSpan = "4" className='table-title'>Albums  user: {currentUserId}</th>
                  </tr>
                  <tr>
                     <th>User id</th>
                     <th>Id</th>
                     <th>Title</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {albums.map(album => (
                     <tr key={album.id}>
                        <td>{album.userId}</td>
                        <td>{album.id}</td>
                        <td>{album.title}</td>
                        <td>
                           <ButtonAlbums className={"btn-todos button button--warning"}>
                              Photo
                           </ButtonAlbums>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )
      };
   };

   function Result2() { 
      if (currentTypeRequest === 'coments') {
         return (
            <h2 style={displayStyleRes2}>coments</h2>
         )
      } else if (currentTypeRequest === 'photo') { 
         // <table id="result2" style={displayStyleRes2}></table>
         <h2>photo</h2>
      }
   }

   return (
      <div id="table-wrapper">
         <table id="tableUsers">
            <thead>
               <tr>
                  <th colSpan="9" className='table-title'>Users</th>
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
                        <Button className={"btn-todos button button--danger"} onClick={handleOpenRes1} userId={user.id} typeRequest={'todos'}>
                           Todos
                        </Button>
                        <Button className={"btn-posts button button--info"} onClick={handleOpenRes1} userId={user.id} typeRequest={'posts'}>
                           Posts
                        </Button>
                        <Button className={"btn-albums button button--warning"} onClick={handleOpenRes1} userId={user.id} typeRequest={'albums'}>
                           Albums
                        </Button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         <Result1 todos={todos} posts={posts} albums={albums} />
         <Result2 />
      </div>
   )
};

export default App;
