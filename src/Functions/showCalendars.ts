export function showCalendars() {
    if (sessionStorage.getItem("calendars")) {
        var calendars = JSON.parse(sessionStorage.getItem("calendars")!);
        var calendarSummaries = calendars.map((calendar: any) => calendar.summary);
        var calendarDropdown = document.getElementById("CalendarDropdown") as HTMLSelectElement;
        calendarDropdown.innerHTML = "";
        for (var i = 0; i < calendarSummaries.length; i++) {
            var option = document.createElement("option");
            option.text = calendarSummaries[i];
            option.value = calendarSummaries[i];
            calendarDropdown.add(option);
        }
    } else {
        var calendarDropdown = document.getElementById("CalendarDropdown") as HTMLSelectElement;
        calendarDropdown.innerHTML = "";
        var option = document.createElement("option");
        option.text = "Sign in to fetch calendars";
        option.value = "Sign in to fetch calendars";
        calendarDropdown.add(option);
        console.log("No calendars found");
    }
}  