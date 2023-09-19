import React, { useState, useEffect } from 'react';
import './App.css';

function ButtonTodos() {

   return (
      <>
         <button className="button" style={{ color: "black", fontSize: "25px" }} onClick={ButtonClick}>Кнопка 1</button>
      </>
   )
}

function ButtonClick(event) {
   let target = event.target;

   if (target.classList.contains("button")) {
      console.log('true');
   }
}

function App() {

   return (
      <div className='test'>
         <ButtonTodos />
      </div>
   )
};

export default App;
