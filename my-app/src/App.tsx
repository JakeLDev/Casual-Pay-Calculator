import React from 'react';
import './App.css';
import AuthScreen from './Pages/AuthScreen';
import Interface from './Pages/Interface';



function App() {

  var hasToken = false;
  var manual = false;
  // var hasToken = true;
  // var manual = true;

  return (
    <div className="App p-5 h-screen dark:bg-zinc-800 dark:text-gray-400">
      <div className="Container">
        <h1 className="text-4xl font-bold m-2 text-gray-300">  
          Casual Pay Calculator
        </h1>
        {!hasToken && !manual && <AuthScreen />}
        {(hasToken || manual) && <Interface />}

      </div>
    </div>
  );
}

export default App;
