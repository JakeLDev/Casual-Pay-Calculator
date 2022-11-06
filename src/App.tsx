import './App.css';
import InputForm from './components/InputForm/InputForm';
import TotalPay from './components/TotalPay/TotalPay';

import React, { useEffect } from "react";
import { decode } from 'qss';

const App = () => {



  const [calendar, setCalendar] = React.useState(true);
  interface googleResponse {
    access_token?: string;
    expires_in?: number;
    scope?: string;
    token_type?: string;
  }

  useEffect(() => {
    const hashParams:googleResponse = decode(window.location?.hash?.slice(1) ?? '');
    // console.log(hashParams);
    // console.log("begin");
    if (hashParams.access_token) {
      sessionStorage.setItem('accessToken', hashParams.access_token);
      window.location.href = "/";
    }
  }, []);



  const toggleCalendar = () => {
    setCalendar(!calendar);
    if (!calendar) {
      (document.getElementById("CalendarToggle") as HTMLButtonElement).innerHTML = "Enter Shifts Manually";
      (document.getElementById("HoursInput") as HTMLDivElement).className = "hidden";
      (document.getElementById("GoogleCalendar") as HTMLDivElement).className = "visible block";
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
            Casual Paycheck Calculator
          </h1>
          <div className="flex flex-col items-center max-w-sm mx-auto my-2 text-inherit">
              <p className='text-inherit'> You may enter your shifts automatically, or you may allow this site to read your Google Calender and use the events saved instead.</p>
              <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold my-2 py-2 px-4 rounded-full visible" id='CalendarToggle' onClick={toggleCalendar}>
                  Enter Shifts Manually
              </button>
          </div>
          <InputForm manual={!calendar}/>
          <TotalPay />
        </div>
        {/* <footer></footer> TODO*/}
      </div>
  );
}

export default App;
