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
  
  const Privacy = () => {
    alert("Privacy Policy \n\nThis app connects to the Google Calendar API to fetch your calendars and events, so that it can calculate the hours. This connection happens directly from your browser to the Google API. There are no server or services involved that might cache the data. \n\nNone of the data fetched from the Google Calendar API is saved elsewhere but in your browser. After you close the browser window/tab all authentication data is delete (technical detail: sessionStorage is used). Thats why you need to reauthorize with Google the next time you visit the page.\n\nThis app only has read-only access to your calendar data.")
  }

  return (
    <div className="App p-5 h-screen dark:bg-zinc-800 dark:text-gray-400">
        <div className="Container">
          <h1 className="text-4xl font-bold m-2 text-gray-300">  
            Casual Paycheck Calculator
          </h1>
          <div className="flex flex-col items-center max-w-sm mx-auto my-2 text-inherit">
              <p className='text-inherit'> You may enter your shifts automatically, or you may allow this site to read your Google Calender and use the events saved instead.</p>
              <button className="text-zinc-500 align-center text-sm bg-zinc-900 hover:bg-black px-2 py-1 rounded-full" onClick={Privacy}>Privacy Policy</button>
              <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold my-2 py-2 px-4 rounded-full visible" id='CalendarToggle' onClick={toggleCalendar}>
                  Enter Shifts Manually
              </button>
          </div>
          <InputForm manual={!calendar}/>
          <TotalPay />
        {/* <footer></footer> TODO*/}
          <footer className='py-5 bottom-0 content-center'>
          </footer>
        </div>
      </div>
  );
}

export default App;
