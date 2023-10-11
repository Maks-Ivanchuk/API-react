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

   function ButtonForRes2({ children, className, onClick, typeRequest }) {
      return (
         <button className={className} onClick={() => onClick(typeRequest)}>
            {children}
         </button>
      )
   };

   const [currentUserId, setCurrentUserId] = useState('');
   const [currentTypeRequestRes1, setCurrentTypeRequestRes1] = useState('');
   const [currentTypeRequestRes2, setCurrentTypeRequestRes2] = useState('');
   const [res1IsOpen, setRes1IsOpen] = useState(false);
   const [res2IsOpen, setRes2IsOpen] = useState(false);
   const [modalOpen, setModalOpen] = useState(false);
   const [overlayOpen, setOverlaylOpen] = useState(false);
   let displayStyleRes1 = res1IsOpen ? { display: 'inline-table' } : { display: 'none' };
   let displayStyleRes2 = res2IsOpen ? { display: 'inline-table' } : { display: 'none' };

   function handleOpenRes1(userId, typeRequest) {
      document.querySelector('body').style.overflow = 'hidden';
      setCurrentTypeRequestRes1(typeRequest);
      setCurrentUserId(userId);

      if (res2IsOpen === true) {
         //    setRes2IsOpen(!res2IsOpen);
         // };
      };
      if (res1IsOpen === false) {
         setRes1IsOpen(!res1IsOpen);
         setModalOpen(!modalOpen);
         setOverlaylOpen(!overlayOpen);
      };
   };

   function handleOpenRes2(typeRequest) {
      setCurrentTypeRequestRes2(typeRequest);

      if (res1IsOpen === true) {
         setRes1IsOpen(!res1IsOpen);
      };

      if (res2IsOpen === false) {
         setRes2IsOpen(!res2IsOpen);
      };
   };

   function handleCloseModalWindow(event) {
      if (event.target.classList.contains('close-icon')
         || event.target.classList.contains('close-icon__line')) {
         console.log(event.target.className);

         if (res1IsOpen === true) {
            setRes1IsOpen(!res1IsOpen);
            setModalOpen(!modalOpen);
            setOverlaylOpen(!overlayOpen);
            document.querySelector('body').style.overflow = '';
         };

         if (res2IsOpen === true) {
            setRes2IsOpen(!res2IsOpen);
            setRes1IsOpen(!res1IsOpen);
         };
      } else if (event.target.classList.contains('overlay')) {
         setRes1IsOpen(false);
         setRes2IsOpen(false);
         setModalOpen(false);
         setOverlaylOpen(false);
      };
   };

   function Modal({ todos, posts, albums, comments, photos }) {
      let modalWindowClass = modalOpen ? 'modalWindow modalWindow--active' : 'modalWindow';
      let overlayClass = overlayOpen ? 'overlay overlay--active' : 'overlay';

      return (
         <>
            <div id='modal' className={modalWindowClass}>
               <div className='modalWindow__close'>
                  <div className='close-icon' onClick={handleCloseModalWindow}>
                     <span className="close-icon__line"></span>
                     <span className="close-icon__line"></span>
                  </div>
               </div>
               <Result1 todos={todos} posts={posts} albums={albums} />
               <Result2 comments={comments} photos={photos} />
            </div>
            <div id="overlay" className={overlayClass} onClick={handleCloseModalWindow}></div>
         </>
      );
   };

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
      };

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

   const [comments, setComments] = useState([]);

   useEffect(() => {
      if (currentUserId === '') {
         return
      }

      fetch(`https://jsonplaceholder.typicode.com/posts/${currentUserId}/comments`)
         .then(response => response.json())
         .then(comments => {
            if (Object.keys(comments).length > 0) {
               setComments(comments);
            } else {
               return
            }
         })
   }, [currentUserId]);

   const [photos, setPhotos] = useState([]);

   useEffect(() => {
      if (currentUserId === '') {
         return
      }

      fetch(`https://jsonplaceholder.typicode.com/albums/${currentUserId}/photos`)
         .then(response => response.json())
         .then(photos => {
            if (Object.keys(photos).length > 0) {
               setPhotos(photos);
            } else {
               return
            }
         })
   }, [currentUserId]);

   function Result1({ todos, posts, albums }) {
      if (currentTypeRequestRes1 === 'todos') {
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
      } else if (currentTypeRequestRes1 === 'posts') {
         return (
            <>
               <table id="result1" style={displayStyleRes1}>
                  <thead>
                     <tr>
                        <th colSpan="5" className='table-title'>Posts user: {currentUserId}</th>
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
                              <ButtonForRes2 className={"btn-todos button button--info"} onClick={handleOpenRes2} typeRequest={'coments'}>
                                 Coments
                              </ButtonForRes2>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </>
         )
      } else if (currentTypeRequestRes1 === 'albums') {
         return (
            <table id="result1" style={displayStyleRes1}>
               <thead>
                  <tr>
                     <th colSpan="4" className='table-title'>Albums  user: {currentUserId}</th>
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
                           <ButtonForRes2 className={"btn-todos button button--warning"} onClick={handleOpenRes2} typeRequest={'photo'}>
                              Photo
                           </ButtonForRes2>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )
      };
   };

   function Result2({ comments, photos }) {
      if (currentTypeRequestRes2 === 'coments') {
         return (
            <table id="result2" style={displayStyleRes2}>
               <thead>
                  <tr>
                     <th colSpan="5" className='table-title'>Comments user: {currentUserId}</th>
                  </tr>
                  <tr>
                     <th>Post id</th>
                     <th>Id</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Body</th>
                  </tr>
               </thead>
               <tbody>
                  {comments.map(comment => (
                     <tr key={comment.id}>
                        <td>{comment.postId}</td>
                        <td>{comment.id}</td>
                        <td>{comment.name}</td>
                        <td>{comment.email}</td>
                        <td>{comment.body}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )
      } else if (currentTypeRequestRes2 === 'photo') {
         return (
            <table id="result2" style={displayStyleRes2}>
               <thead>
                  <tr>
                     <th colSpan="5" className='table-title'>Photo user: {currentUserId}</th>
                  </tr>
                  <tr>
                     <th>Album id</th>
                     <th>Id</th>
                     <th>Title</th>
                     <th>Url</th>
                     <th>ThumbnailUrl</th>
                  </tr>
               </thead>
               <tbody>
                  {photos.map(photo => (
                     <tr key={photo.id}>
                        <td>{photo.albumId}</td>
                        <td>{photo.id}</td>
                        <td>{photo.title}</td>
                        <td>{photo.url}</td>
                        <td>
                           <img src={photo.thumbnailUrl} alt={photo.id} />
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         );
      };
   };

   return (
      <>
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
            <Modal todos={todos} posts={posts} albums={albums} comments={comments} photos={photos} res1IsOpen={res1IsOpen} modalOpen={modalOpen} overlayOpen={overlayOpen} />
         </div>
      </>
   )
};

export default App;
