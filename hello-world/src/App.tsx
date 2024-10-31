import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {


  const someHTML = 
  <ul>
    <li>dog</li>
    <li>cat</li>
  </ul>

  // return (
  //   <div>
  //     <ul>
  //       <li>fish</li>
  //       <li>shrimp</li>
  //     </ul>
  //     <ul>
  //       <li>fish</li>
  //       <li>shrimp</li>
  //     </ul>
  //   </div>
  // )

  // return (
  //   <div className='App'>
      
  //   </div>
  // )


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
