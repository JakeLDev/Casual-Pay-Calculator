import React from 'react';
// import { useSelector } from 'react-redux';
import './App.css';
// import AuthScreen from './Pages/AuthScreen';
import CalendarInterface from './Pages/CalendarInterface';
import ManualInterface from './Pages/ManualInterface';
import TotalPay from './Pages/TotalPay';



function App() {

  // var hasToken = useSelector(selectHasToken);
  var hasToken = false;
  // var manual = false;
  const [manual, setManual] = React.useState(true);
  // var hasToken = true;
  // var manual = true;

  const selectManual = () => {
    setManual(current => !current);
  }

  return (
    <div className="App p-5 h-screen dark:bg-zinc-800 dark:text-gray-400">
      <div className="Container">
        <h1 className="text-4xl font-bold m-2 text-gray-300">  
          Casual Pay Calculator
        </h1>
        <div className="flex flex-col items-center max-w-sm mx-auto my-2 text-inherit">
            <p className='text-inherit'> You may enter your shifts automatically, or you may allow this site to read your Google Calender and use the events saved instead.</p>
            <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold my-2 py-2 px-4 rounded-full" onClick={selectManual}>
                Enter Shifts Manually
            </button>
            <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full">
                Read Google Calender
            </button>
        </div>
        {/* {!hasToken && !manual && <AuthScreen manual={manual}/>} */}
        {hasToken && !manual && <CalendarInterface />}
        {!hasToken && manual && <ManualInterface />}
        <TotalPay />

      </div>
    </div>
  );
}

export default App;
