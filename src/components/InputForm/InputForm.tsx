import React, { useState, useEffect } from "react";

import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import "../../DateRangePickerDark.css";

import { calculatePay } from "../../Functions/calculatePay";
import logo from "../Images/google_auth.png";
import { apiCalendar } from "../../stores/calendarApi";
import InputField from "../InputField";
import { showCalendars } from "../../Functions/showCalendars";
import { parseEvents } from "../../Functions/parseEvents";
import { filterEvents } from "../../Functions/filterEvents";
import { printEvents } from "../../Functions/printEvents";
import { listCalendars } from "../../Functions/listCalendars";
import { calculateHours } from "../../Functions/calculateHours";
import { getAllEvents } from "../../Functions/getAllEvents";
import { getUniqueEvents } from "../../Functions/getUniqueEvents";
import { createTimeRange } from "../../Functions/createTimeRange";
import { fetchCalendarEvents, fetchCalendars } from "../../stores/api";
import { encode } from "qss";
import { loadCalendars } from "../../stores/calendars";

// import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import { useSelector, useDispatch } from 'react-redux';
import {
    selectSelectedCalendar,
    setSelectedCalendar,
} from '../../stores/viewState';
import { selectCalendars } from '../../stores/calendars';
import { selectAccessToken } from '../../stores/authentication';

const googleClientId = '502172359025.apps.googleusercontent.com';
const googleScope =
'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events.readonly';

interface MyProps {
    manual: boolean;
};

const InputForm: React.FC<MyProps> = (props: MyProps) => {
    const dispatch = useDispatch();

    const calendars = useSelector(selectCalendars);
    const selectedCalendar = useSelector(selectSelectedCalendar);

    const [value, updateValue] = useState("");
    const onChange = (date:any) => {
        updateValue(date);
      }

    const getGoogleAuthUrl = () => {
        const params = encode({
            client_id: googleClientId,
            redirect_uri: window.location.origin,
            scope: googleScope,
            response_type: 'token',
        });
    
        return `https://accounts.google.com/o/oauth2/auth?${params}`;
    };

    useEffect(() => {
        var accessToken = sessionStorage.getItem('accessToken');
        if (!calendars && accessToken) {
            //@ts-expect-error
          dispatch(loadCalendars());
          console.log("Calendars loaded");
        }
      });

    // const apitest = () => async () => {
    //     console.log("apitest");
    //     var accessToken = sessionStorage.getItem('accessToken');

    //     // console.log(fetchCalendarEvents({}));
    //     // var calenders = fetchCalendars({accessToken});
    //     // const { items } = await fetchCalendars({ accessToken });

    //     // loadCalendars(); //TODO HERE
        
    //     // console.log(calenders);
    // }

    const apitest = () => {
        console.log("apitest");
        var accessToken = sessionStorage.getItem('accessToken');
        // console.log(accessToken);

        // console.log(fetchCalendarEvents({}));
        // var calenders = fetchCalendars({accessToken});
        // const { items } = await fetchCalendars({ accessToken });

        // loadCalendars(); //TODO HERE
        
        // console.log(calenders);
    }

    // var Events: any[] = [];

    const handleLogIn = () => {
      // console.log(process.env.REACT_APP_API_KEY);
      // console.log(apiCalendar.tokenClient);

        apiCalendar.handleAuthClick();
    //   getGoogleAuthUrl();
        // console.log(apiCalendar.tokenClient);
      // console.log(apiCalendar.config);
      // (document.getElementById("GoogleLogin") as HTMLButtonElement).className = "hidden";
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
                        <InputField placeHolder="Overtime Multiplier" inputId="OvertimeMultiplier" inputType="number" value="1.4"/>
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
                        <p className="text-lg font-bold mb-2">Google Calendar</p>
                        {sessionStorage.Events && <p>Events are in session storage!</p>}
                        {/* <a href={getGoogleAuthUrl()} data-testid="AuthLink"> */}
                        <button className="block mx-auto my-2" id="GoogleLogin" onClick={() => handleLogIn()}>
                            <img src={logo} alt="Auth with Google" width="191" height="46" />
                        </button>
                        <a href={getGoogleAuthUrl()} data-testid="AuthLink">
                            <img src={logo} alt="Auth with Google" width="191" height="46" />
                        </a>

                        <button onClick={() => apitest()}>
                            apitest button
                        </button>
                        <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full block mx-auto my-2" onClick={() => listCalendars(apiCalendar)}>Fetch User Calendars</button>
                        {/* <select name="Calendars" id="CalendarDropdown" className="h-10 my-2 w-full rounded-lg pl-2 text-sm placeholder-gray-400 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent" onChange={() => getAllEvents(apiCalendar)}></select> */}
                        <select
                            id="CalendarDropdown"
                            className="h-10 my-2 w-full rounded-lg pl-2 text-sm placeholder-gray-400 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
                            onChange={(event) => {
                                console.log("calendar changed");
                                //@ts-expect-error
                                dispatch(setSelectedCalendar({ calendarId: event.target.value }));
                            }}
                            value={selectedCalendar ?? ''}
                            >
                            {!selectedCalendar && (
                                <option key="default">Please select calendar</option>
                            )}
                            {calendars?.map(({ id, label }: {id:any, label:any}) => (
                                <option value={id} key={id}>
                                {label}
                                </option>
                            ))}
                            </select>
                        <select name="timePeriod" id="timePeriod" className="h-10 my-2 w-full rounded-lg pl-2 text-sm placeholder-gray-400 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent" onChange={() => createTimeRange([value])}>
                            <option value="Day">Day</option>
                            <option value="Week">Week</option>
                            <option value="Month">Month</option>
                            <option value="Year">Year</option>
                            <option value="Total">Total</option>
                            <option value="Custom">Custom</option>
                        </select>
                        <div id="datePicker" className="hidden">
                            <DateRangePicker className="bg-white text-gray-900 py-2 px-4 w-full rounded-lg block mx-auto my-2" onChange={onChange} value={value} format={"dd/MM/yy"} /> 
                        </div>

                        <InputField placeHolder="Name of Shifts in Calendar" inputId="EventName" inputType="string"/>

                        {/* <button id="GetEvents" className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full block mx-auto my-2" onClick={() => getAllEvents(apiCalendar)}>Get Events</button> */}

                        {/* <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full block mx-auto my-2" onClick={() => printEvents()}>printEvents</button>
                        <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full block mx-auto my-2" onClick={() => filterEvents(new Date(value[0]), new Date(value[1]), "EB Games Shift")}>filterEvents</button>
                        <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full block mx-auto my-2" onClick={() => getUniqueEvents()}>uniqueEvents</button>
                        <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full block mx-auto my-2" onClick={() => calculateHours(2)}>eventHours</button>
                        <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full block mx-auto my-2" onClick={() => createTimeRange([value])}>createTimeRange</button> */}





                    </div>
                </div>
            <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full" onClick={() => calculatePay(props.manual, [value])}>
                Calculate Pay
            </button>
            
            {/* <p id="TotalPayDisplay" className="text-5xl subpixel-antialiased font-bold	text-slate-200"/> */}
            </>
        );
    };
export default InputForm;