import { showCalendars } from "./showCalendars";
import { getAllEvents } from "./getAllEvents";


export function listCalendars(apiCalendar: any) {
    var calendars:any = [];
    var calendarSummaries: any[] = [];
    apiCalendar.listCalendars().then((response: any) => {
        // console.log(response);
        // console.log(response.result.items);
        sessionStorage.setItem("calendars", JSON.stringify(response.result.items));
        // calendars = response.result.items;
        // calendarSummaries = calendars.map((calendar: any) => calendar.summary);

        showCalendars();
        getAllEvents(apiCalendar);

        // document.getElementById("CalendarList")!.className = "h-10 my-2 w-full rounded-lg pl-2 text-sm placeholder-gray-400 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent";
    });
}