export function getAllEvents(apiCalendar: any) {
    var selectedCalendarSummary = (document.getElementById("CalendarDropdown") as HTMLSelectElement).value;
    var calendars = JSON.parse(sessionStorage.getItem("calendars")!);
    var calendarId = calendars.filter((calendar: any) => calendar.summary === selectedCalendarSummary)[0].id || "primary";

    apiCalendar.listEvents({singleEvents: true,
                            MaxResults: 1000,
                            orderBy: 'startTime'},
                            calendarId)
                            .then(({ result }: any) => {
        sessionStorage.setItem('Events', JSON.stringify(result.items));
    }); //TODO catch errors
 }; //TODO throw alert if user tries to filter events before fetching them