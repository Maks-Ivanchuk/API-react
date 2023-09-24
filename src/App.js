import React, { useState, useEffect } from 'react';
import './App.css';

// function ButtonTodos({ sign, onBtnClick }) {

//    return (
//       <>
//          <button className="test-btn" onClick={() => onBtnClick(sign)}>Counter {sign}</button>
//       </>
//    )
// }


// function App() {
//    const [counterBtnClick, setCounterBtnClick] = useState(0);

//    const BtnCounterClick = (sign) => {
//       if (sign === '+') {
//          setCounterBtnClick(prevCounter => prevCounter + 1);
//       } else if (sign === '-') {
//          setCounterBtnClick(prevCounter => prevCounter - 1);
//       }
//    }

//    return (
//       <div className='test'>
//          <ButtonTodos sign='+' onBtnClick={BtnCounterClick} />
//          <p>{counterBtnClick}</p>
//          <ButtonTodos sign='-' onBtnClick={BtnCounterClick} />
//       </div>
//    )
// };

function Button({message, children}) {
   return (
      <button onClick={() => alert(message)}>
         {children}
      </button>
   )
}

function App() {
   return (
      <>
      <Button message='You stupid asshole'>
         Don`t touch me!
      </Button>
      <Button message='I am'>
            
            <h1>Are you stupid asshole</h1>
      </Button>
      
      </>
   )
};

export default App;
