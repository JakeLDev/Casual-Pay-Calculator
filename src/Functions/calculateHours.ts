import { Dictionary } from "@reduxjs/toolkit";

export function calculateHours(events:any) {

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
            // var events = filterEvents(new Date(),new Date(),"EB Games Shift"); //TODO fix inputs
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
                // TODO calculate public holidays?
    
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

                events[i].publicHolidayHours = 0; // TODO calculate public holidays
    
    
    
                events[i].totalTime = (new Date(events[i].end.dateTime).getTime() - new Date(events[i].start.dateTime).getTime()) / 1000 / 60 / 60;
                if (events[i].totalTime > 5) { // 1 hour break
                    events[i].totalTime -= 1;
                }
                console.log(events[i].totalTime + " TOTALTIME");
            }
            console.log(events);
            //TODO write to session storage with new hour tallys
    
            sessionStorage.setItem("events", JSON.stringify(events));
        }