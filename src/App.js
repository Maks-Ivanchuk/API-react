import React, { useState, useEffect } from 'react';
import './App.css';

function ButtonTodos({ sign, onBtnClick }) {

   return (
      <>
         <button className="test-btn" onClick={() => onBtnClick(sign)}>Counter {sign}</button>
      </>
   )
}


function App() {
   const [counterBtnClick, setCounterBtnClick] = useState(0);

   const BtnCounterClick = (sign) => {
      if (sign === '+') {
         setCounterBtnClick(prevCounter => prevCounter + 1);
      } else if (sign === '-') {
         setCounterBtnClick(prevCounter => prevCounter - 1);
      }
   }

   return (
      <div className='test'>
         <ButtonTodos sign='+' onBtnClick={BtnCounterClick} />
         <p>{counterBtnClick}</p>
         <ButtonTodos sign='-' onBtnClick={BtnCounterClick} />
      </div>
   )
};

export default App;
