import React, { useState, useEffect } from "react";
// import { getMyGoogleCalendarsList } from '../../stores/calendarApi'

import { encode } from 'qss';

import { calculatePay } from "../../Functions/calculatePay";
import logo from "../Images/google_auth.png";
import { apiCalendar } from "../../stores/calendarApi";
import { Dictionary } from "@reduxjs/toolkit";
import InputField from "../InputField";
import { showCalendars } from "../../Functions/showCalendars";

interface MyProps {
    manual: boolean;
};

const InputForm: React.FC<MyProps> = (props: MyProps) => {

    // var Events: any[] = [];

    const handleLogIn = () => {
      // console.log(process.env.REACT_APP_API_KEY);
      // console.log(apiCalendar.tokenClient);
      apiCalendar.handleAuthClick();
      // console.log(apiCalendar.tokenClient);
      // console.log(apiCalendar.config);
      // (document.getElementById("GoogleLogin") as HTMLButtonElement).className = "hidden";
    };

    const listCalendars = () => { //TODO show dropdown of calendars
        var calendars:any = [];
        var calendarSummaries: any[] = [];
        apiCalendar.listCalendars().then((response: any) => {
            // console.log(response);
            // console.log(response.result.items);
            sessionStorage.setItem("calendars", JSON.stringify(response.result.items));
            // calendars = response.result.items;
            // calendarSummaries = calendars.map((calendar: any) => calendar.summary);

            showCalendars();
            // document.getElementById("CalendarList")!.className = "h-10 my-2 w-full rounded-lg pl-2 text-sm placeholder-gray-400 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent";
        });


        // console.log(calendars.result.items)
        // console.log(calendars);
        // return calendarSummaries;
    }

    const getAllEvents = () => {

        var selectedCalendarSummary = (document.getElementById("CalendarList") as HTMLSelectElement).value;
        var calendars = JSON.parse(sessionStorage.getItem("calendars")!);
        var calendarId = calendars.filter((calendar: any) => calendar.summary === selectedCalendarSummary)[0].id || "primary";

        apiCalendar.listEvents({singleEvents: true,
                                MaxResults: 1000,
                                orderBy: 'startTime'},
                                calendarId)
                                .then(({ result }: any) => {
            // Events = result.items;
            sessionStorage.setItem('Events', JSON.stringify(result.items));
            // console.log(sessionStorage.getItem('Events'));
            // console.log(JSON.parse(sessionStorage.getItem('Events') || '[]'));
            // console.log(JSON.parse(sessionStorage.Events));
            // document.getElementById("GetEvents")!.className = "hidden";
            console.log("Events Fetched!");
            // console.log(result.items); // This is an array of 500 events from the start of 2021 to a year from now
        }); //TODO catch errors
        }; //TODO throw alert if user tries to filter events before fetching them

    const filterEvents = (rangeStart:Date, rangeEnd:Date, eventDesc:String) => { //use filter funciton https://stackoverflow.com/questions/2722159/how-to-filter-object-array-based-on-attributes
      //TODO get dates and event description from user input

      var rangeStart = new Date(new Date().getFullYear(), 0, 1); //TODO remove 
      // var rangeStart = new Date()
      var rangeEnd = new Date(new Date().getFullYear(), 11, 31);

      var events = parseEvents();
      console.log(events);
      console.log(rangeStart, rangeEnd, eventDesc);
      // var filteredEvents = events.filter( (x: { start: { dateTime: Date; }; summary: String[]; }) => x.start.dateTime >= rangeStart && x.start.dateTime <= rangeEnd && x.summary.includes(eventDesc));
      const filteredEvents = events.filter( (x: { start: { dateTime: string; }; summary: String[]; }) => 
                                              x.summary.includes(eventDesc) && 
                                              new Date(x.start.dateTime) >= rangeStart && 
                                              new Date(x.start.dateTime) <= rangeEnd);
      console.log(filteredEvents);
      return filteredEvents;
    };

    const parseEvents = () => {
        if (!sessionStorage.getItem('Events')) {
          alert("Please Fetch Events First!");
        }
        else {
            var events = JSON.parse(sessionStorage.Events);
        }
        console.log("parse events")
        console.log(events);
        return events;
    }


    const getUniqueEvents = () => { //TODO do later, allow user input for now
      var events = parseEvents();
      // const uniqueSummaries = [...new Set<any>( events.map((obj: { summary: string; }) => obj.summary)) ];
    //   console.log(events);
      var Uniquesummaries = new Set(events.map((obj: { summary: string; }) => obj.summary));
      console.log(Uniquesummaries);
    }

    const getEventHours = (event:any) => {
        //TODO allow user input for opening hours
        const Days:Dictionary<String> = { 
            0: "Sunday",
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday"
        };
        const OpeningHours:Dictionary<String> = {"SundayOpen": "11:00:00", "SundayClose": "17:00", 
                                "MondayOpen": "9:00", "MondayClose": "17:30",
                                "TuesdayOpen": "9:00", "TuesdayClose": "17:30",
                                "WednesdayOpen": "9:00", "WednesdayClose": "17:30",
                                "ThursdayOpen": "9:00", "ThursdayClose": "21:00",
                                "FridayOpen": "9:00", "FridayClose": "17:30",
                                "SaturdayOpen": "9:00", "SaturdayClose": "17:00"};
        // var events = parseEvents();
        var events = filterEvents(new Date(),new Date(),"EB Games Shift"); //TODO fix inputs
        // var eventHours = events.map((obj: { start: { dateTime: string; }; end: { dateTime: string; }; }) => (new Date(obj.end.dateTime).getTime() - new Date(obj.start.dateTime).getTime()) / 1000 / 60 / 60);
        // var eventHours = (new Date(event.end.dateTime).getTime() - new Date(event.start.dateTime).getTime()) / 1000 / 60 / 60;
        console.log(events);
        console.log(events[0]);

        // weekday hours
        for (var i = 0; i < events.length; i++) {
        //TODO if already calculated for that event, skip
            var dayOfWeek = new Date(events[i].start.dateTime).getDay();
            var eveningStart = new Date(events[i].start.dateTime).setHours(18,0,0,0);
            var startTime = new Date(events[i].start.dateTime).getTime();
            var endTime = new Date(events[i].end.dateTime).getTime();
            var openTime = Date.parse(events[i].start.dateTime.slice(0,10) + " " + OpeningHours[Days[dayOfWeek] + "Open"]);
            var closeTime = Date.parse(events[i].start.dateTime.slice(0,10) + " " + OpeningHours[Days[dayOfWeek] + "Close"]);

            // console.log(dayOfWeek, openTime, closeTime);

            console.log(events[i])

            // if (dayOfWeek >= 1 && dayOfWeek <= 5) { //weekday

            events[i].overtimeHours = 0;
            if (endTime > closeTime) {
                events[i].overtimeHours += Math.abs(endTime - closeTime) / 1000 / 60 / 60;
                console.log("after close: " + Math.abs(endTime - closeTime) / 1000 / 60 / 60);
                endTime = closeTime;
                console.log(events[i].overtimeHours + " OVERTIMEHOURS");
            };
            if (startTime < openTime) {
                events[i].overtimeHours += Math.abs(openTime - startTime) / 1000 / 60 / 60;
                console.log("before open: " + Math.abs(openTime - startTime) / 1000 / 60 / 60);
                startTime = openTime;
                console.log(events[i].overtimeHours + " OVERTIMEHOURS");
            };

            if (endTime >= eveningStart) { //evening
                // if (endTime > Date.parse(OpeningHours[dayOfWeek] + "Close") { //TODO fix
                events[i].eveningHours = Math.abs(eveningStart - endTime) / 1000 / 60 / 60;
                endTime = eveningStart;
                console.log(events[i].eveningHours + " evening hours");
            } else {
                events[i].eveningHours = 0;
            }

            if (dayOfWeek >= 1 && dayOfWeek <= 5) { //weekday
                // if (startTime < Date.parse(OpeningHours[dayOfWeek] + "Open")) { //TODO fix
                events[i].weekdayHours = Math.abs(startTime - closeTime) / 1000 / 60 / 60;
                console.log(events[i].weekdayHours + " WEEKDAYHOURS");
            } else {
                events[i].weekdayHours = 0;
            };

            if (dayOfWeek === 0) { //sunday
                // if (startTime < Date.parse(OpeningHours[dayOfWeek] + "Open")) { //TODO fix
                events[i].sundayHours = Math.abs(endTime - startTime) / 1000 / 60 / 60;
                console.log(events[i].sundayHours + " SUNDAYHOURS");
            } else {
                events[i].sundayHours = 0;
            };

            if (dayOfWeek === 6) { //saturday
                // if (startTime < Date.parse(OpeningHours[dayOfWeek] + "Open")) { //TODO fix
                events[i].saturdayHours = Math.abs(endTime - startTime) / 1000 / 60 / 60;
                console.log(events[i].saturdayHours + " SATURDAYHOURS");
            } else {
                events[i].saturdayHours = 0;
            };



            events[i].totalTime = (new Date(events[i].end.dateTime).getTime() - new Date(events[i].start.dateTime).getTime()) / 1000 / 60 / 60;
            if (events[i].totalTime > 5) { // 1 hour break
                events[i].totalTime -= 1;
            }
            console.log(events[i].totalTime + " TOTALTIME");
        }
        console.log(events);
        //TODO write to session storage with new hour tallys
    }


    
    const printEvents = () => {
      // console.log(apiCalendar.tokenClient);
      // console.log(apiCalendar.config);
      // apiCalendar.listUpcomingEvents(50).then(({ result }: any) => {
      // console.log(result.items);
      // });
      // var yearFromNow = new Date();
      // yearFromNow.setDate(yearFromNow.getDate() + 365);

      // apiCalendar.listEvents({singleEvents: true,
      //                         MaxResults: 500,
      //                         orderBy: 'startTime'})
      //                         .then(({ result }: any) => {
      //   console.log(result.items); // This is an array of 500 events from the start of 2021 to a year from now
      // }
      // );
      console.log(parseEvents());
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
                        <p className="text-lg font-bold mb-2">Google Calendar</p>
                        {sessionStorage.Events && <p>Events are in session storage!</p>}
                        {/* <a href={getGoogleAuthUrl()} data-testid="AuthLink"> */}
                        <button className="block mx-auto my-2" id="GoogleLogin" onClick={() => handleLogIn()}>
                            <img src={logo} alt="Auth with Google" width="191" height="46" />
                        </button>
                        <button id="GetEvents" className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full block mx-auto my-2" onClick={() => getAllEvents()}>Get Events</button> {/* TODO Show button after log in */}

                        <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full block mx-auto my-2" onClick={() => printEvents()}>printEvents</button>
                        <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full block mx-auto my-2" onClick={() => filterEvents(new Date(), new Date(), "EB Games Shift")}>filterEvents</button>
                        <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full block mx-auto my-2" onClick={() => getUniqueEvents()}>uniqueEvents</button>
                        <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full block mx-auto my-2" onClick={() => getEventHours(2)}>eventHours</button>
                        <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full block mx-auto my-2" onClick={() => listCalendars()}>listCalendars</button>
                        {/* list of calendars */}
                        <select name="Calendars" id="CalendarDropdown" className="h-10 my-2 w-full rounded-lg pl-2 text-sm placeholder-gray-400 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent">

                        </select>


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