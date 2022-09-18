export function getAllEvents(apiCalendar: any) {
    var selectedCalendarSummary = (document.getElementById("CalendarDropdown") as HTMLSelectElement).value;
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