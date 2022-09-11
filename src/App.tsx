import React from 'react';
// import { useSelector } from 'react-redux';
import './App.css';
import InputForm from './components/InputForm/InputForm';
import TotalPay from './components/TotalPay/TotalPay';



function App() {

  // var hasToken = useSelector(selectHasToken);
  var hasToken = false;
  const [calendar, setCalendar] = React.useState(false);
  // var begin = false;
  // const [begin, setBegin] = React.useState(false);
  const [begin, setBegin] = React.useState(true);

  const start = () => {
    setBegin(true);
    (document.getElementById("CalendarToggle") as HTMLButtonElement).className = "bg-cyan-600 hover:bg-cyan-800 text-white font-bold my-2 py-2 px-4 rounded-full";
    (document.getElementById("StartButton") as HTMLButtonElement).className = "hidden";
  }

  const toggleCalendar = () => {
    setCalendar(!calendar);
    if (!calendar) {
      (document.getElementById("CalendarToggle") as HTMLButtonElement).innerHTML = "Enter Shifts Manually";
      (document.getElementById("HoursInput") as HTMLDivElement).className = "hidden";
      (document.getElementById("GoogleCalendar") as HTMLDivElement).className = "visible";
    } else {
      (document.getElementById("CalendarToggle") as HTMLButtonElement).innerHTML = "Read Google Calendar";
      (document.getElementById("HoursInput") as HTMLDivElement).className = "visible";
      (document.getElementById("GoogleCalendar") as HTMLDivElement).className = "hidden";
    }
  }

  return (
    <div className="App p-5 h-screen dark:bg-zinc-800 dark:text-gray-400">
      <div className="Container">
        <h1 className="text-4xl font-bold m-2 text-gray-300">  
          Casual Pay Calculator
        </h1>
        <div className="flex flex-col items-center max-w-sm mx-auto my-2 text-inherit">
            <p className='text-inherit'> You may enter your shifts automatically, or you may allow this site to read your Google Calender and use the events saved instead.</p>
            <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold my-2 py-2 px-4 rounded-full visible" id='StartButton' onClick={start}>
                Begin
            </button>
            <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold my-2 py-2 px-4 rounded-full hidden" id='CalendarToggle' onClick={toggleCalendar}>
                Read Google Calender
            </button>
            {/* <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold my-2 py-2 px-4 rounded-full" onClick={selectManual}>
                Enter Shifts Manually
            </button>
            <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full" onClick={selectCalendar}>
                Read Google Calender
            </button> */}
        </div>
        {/* {!hasToken && !manual && <AuthScreen manual={manual}/>} */}
        {/* {!manual && <CalendarInterface />} */}
        {/* {!hasToken && manual && <ManualInterface manual={manual}/>} */}
        {begin && <InputForm manual={!calendar}/>}
        <TotalPay />

      </div>
    </div>
  );
}

export default App;
