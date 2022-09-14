import React, { useState, useEffect } from "react";
// import { getMyGoogleCalendarsList } from '../../stores/calendarApi'

import { encode } from 'qss';

import InputField from "../InputField";
import { calculatePay } from "../../Functions/calculatePay";
import logo from "../Images/google_auth.png";
import { apiCalendar } from "../../stores/calendarApi";
interface MyProps {
    manual: boolean;
};

const InputForm: React.FC<MyProps> = (props: MyProps) => {

    var Events = [];

    const handleLogIn = () => {
      // console.log(process.env.REACT_APP_API_KEY);
      // console.log(apiCalendar.tokenClient);
      apiCalendar.handleAuthClick();
      // console.log(apiCalendar.tokenClient);
      // console.log(apiCalendar.config);
      // (document.getElementById("GoogleLogin") as HTMLButtonElement).className = "hidden";
    };

    const getAllEvents = () => {

      apiCalendar.listEvents({singleEvents: true,
                              MaxResults: 1000,
                              orderBy: 'startTime'})
                              .then(({ result }: any) => {
        Events = result.items;
        // console.log(result.items); // This is an array of 500 events from the start of 2021 to a year from now
      });
    };

    const filterEvents = (events: any, rangeStart:Date, rangeEnd:Date, eventDesc:String) => { //use filter funciton https://stackoverflow.com/questions/2722159/how-to-filter-object-array-based-on-attributes
      var filteredEvents = [];
      for (var i = 0; i < events.length; i++) {
        if (events[i].summary.includes(eventDesc) && events[i].start.dateTime >= rangeStart && events[i].end.dateTime <= rangeEnd){
          filteredEvents.push(events[i]);
        }
      }
      return filteredEvents;
    };

    
    const printEvents = () => {
      console.log(apiCalendar.tokenClient);
      console.log(apiCalendar.config);
      apiCalendar.listUpcomingEvents(50).then(({ result }: any) => {
        console.log(result.items);
      });
      var yearFromNow = new Date();
      yearFromNow.setDate(yearFromNow.getDate() + 365);

      apiCalendar.listEvents({singleEvents: true,
                              MaxResults: 500,
                              orderBy: 'startTime'})
                              .then(({ result }: any) => {
        console.log(result.items); // This is an array of 500 events from the start of 2021 to a year from now
      }
      );
    };
      

        return (
            <>
                <div id="InputForm" className="grid grid-cols-3 items-start gap-8 max-w-5xl mx-auto my-1">
                    <div id="BaseRateInput">
                        <p className="text-lg font-bold mb-2">Enter Hourly Pay Rate</p>
                        <p className='text-left'>Base Hourly Rate</p>
                        <InputField placeHolder="Base Hourly Rate" inputId="BaseRate" inputType="number"/>
                    </div>
                    <div id="RateMultiplierInput">
                        <p className="text-lg font-bold mb-2">Edit Rate Multipliers</p>
                        <p className='text-left'>Weekday Multiplier</p>
                        <InputField placeHolder="Weekday Multiplier" inputId="WeekdayMultiplier" inputType="number" value="1"/>
                        <p className='text-left'>Saturday Multiplier</p>
                        <InputField placeHolder="Saturday Multiplier" inputId="SaturdayMultiplier" inputType="number" value="1.2"/>
                        <p className='text-left'>Sunday Multiplier</p>
                        <InputField placeHolder="Sunday Multiplier" inputId="SundayMultiplier" inputType="number" value="1.4"/>
                        <p className='text-left'>Evening Multiplier</p>
                        <InputField placeHolder="Evening Multiplier" inputId="EveningMultiplier" inputType="number" value="0.2"/>
                        <p className='text-left'>Public Holiday Multiplier</p>
                        <InputField placeHolder="Public Holiday Multiplier" inputId="PublicHolidayMultiplier" inputType="number" value="2"/>
                        <p className='text-left'>Overtime Multiplier</p>
                        <InputField placeHolder="Overtime Multiplier" inputId="OvertimeMultiplier" inputType="number" value="1.5"/>
                    </div>
                    <div id="HoursInput" className="visible">
                        <p className="text-lg font-bold mb-2">Enter Your Hours</p>
                        <p className='text-left'>Weekday Hours</p>
                        <InputField placeHolder="Weekday Hours" inputId="WeekdayHours" inputType="number"/>
                        <p className='text-left'>Saturday Hours</p>
                        <InputField placeHolder="Saturday Hours" inputId="SaturdayHours" inputType="number"/>
                        <p className='text-left'>Sunday Hours</p>
                        <InputField placeHolder="Sunday Hours" inputId="SundayHours" inputType="number"/>
                        <p className='text-left'>Evening Hours</p>
                        <InputField placeHolder="Evening Hours" inputId="EveningHours" inputType="number"/>
                        <p className='text-left'>Public Holiday Hours</p>
                        <InputField placeHolder="Public Holiday Hours" inputId="PublicHolidayHours" inputType="number"/>
                        <p className='text-left'>Overtime Hours</p>
                        <InputField placeHolder="Overtime Hours" inputId="OvertimeHours" inputType="number"/>
                    </div>
                    <div id="GoogleCalendar" className="hidden">
                        <p>gcal</p>
                        {/* <a href={getGoogleAuthUrl()} data-testid="AuthLink"> */}
                        <button id="GoogleLogin" onClick={() => handleLogIn()}>
                            <img src={logo} alt="Auth with Google" width="191" height="46" />
                        </button>
                        <button onClick={() => printEvents()}>printEvents</button>
                    </div>
                </div>
            <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full" onClick={() => calculatePay(props.manual)}>
                Calculate Pay
            </button>
            
            {/* <p id="TotalPayDisplay" className="text-5xl subpixel-antialiased font-bold	text-slate-200"/> */}
            </>
        );
    };
export default InputForm;