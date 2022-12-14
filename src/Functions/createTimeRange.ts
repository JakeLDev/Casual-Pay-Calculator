export function createTimeRange(dates: string[]) {
    // get range from the selct field, create start and end dates or use the custom field
    var dateSelection = document.getElementById("timePeriod") as HTMLSelectElement;
    var selection = dateSelection.value; // "Year", "Month", "Week", "Day", "Total", "Custom"
    // if custom is selected, show the date picker
    
    var rangeStart = new Date();
    var rangeEnd = new Date();

    if (selection === "Day")    {
        rangeStart = new Date();
        rangeStart.setHours(0,0,0,0);
        rangeEnd = new Date();
        rangeEnd.setHours(23,59,59,999);
        document.getElementById("datePicker")!.className = "hidden";
    } else if (selection === "Week") {
        rangeStart = new Date();
        rangeEnd = new Date();
        rangeStart.setDate(rangeStart.getDate() - rangeStart.getDay());
        rangeEnd.setDate(rangeEnd.getDate() + (6 - rangeEnd.getDay()));
        rangeStart.setTime(rangeStart.getTime() - (rangeStart.getHours() * 60 * 60 * 1000) - (rangeStart.getMinutes() * 60 * 1000) - (rangeStart.getSeconds() * 1000));
        rangeEnd.setTime(rangeEnd.getTime() + (23 - rangeEnd.getHours()) * 60 * 60 * 1000 + (59 - rangeEnd.getMinutes()) * 60 * 1000 + (59 - rangeEnd.getSeconds()) * 1000);
        document.getElementById("datePicker")!.className = "hidden";
    } else if (selection === "Month") {
        rangeStart = new Date();
        rangeEnd = new Date();
        rangeStart.setDate(1);
        rangeEnd.setMonth(rangeEnd.getMonth() + 1);
        rangeEnd.setDate(0);
        rangeStart.setTime(rangeStart.getTime() - (rangeStart.getHours() * 60 * 60 * 1000) - (rangeStart.getMinutes() * 60 * 1000) - (rangeStart.getSeconds() * 1000));
        rangeEnd.setTime(rangeEnd.getTime() + (23 - rangeEnd.getHours()) * 60 * 60 * 1000 + (59 - rangeEnd.getMinutes()) * 60 * 1000 + (59 - rangeEnd.getSeconds()) * 1000);
        document.getElementById("datePicker")!.className = "hidden";
    } else if (selection === "Year") {
        rangeStart = new Date();
        rangeEnd = new Date();
        rangeStart.setMonth(0);
        rangeStart.setDate(1);
        rangeEnd.setMonth(11);
        rangeEnd.setDate(31);
        rangeStart.setTime(rangeStart.getTime() - (rangeStart.getHours() * 60 * 60 * 1000) - (rangeStart.getMinutes() * 60 * 1000) - (rangeStart.getSeconds() * 1000));
        rangeEnd.setTime(rangeEnd.getTime() + (23 - rangeEnd.getHours()) * 60 * 60 * 1000 + (59 - rangeEnd.getMinutes()) * 60 * 1000 + (59 - rangeEnd.getSeconds()) * 1000);
        document.getElementById("datePicker")!.className = "hidden";
    } else if (selection === "Total") {
        rangeStart = new Date("2000-01-01");
        rangeEnd = new Date("2100-01-01");
        document.getElementById("datePicker")!.className = "hidden";
    } else if (selection === "Custom") {
        // show the date picker
        var datePicker = document.getElementById("datePicker");
        datePicker!.className = "visible";
        if (dates[0].length === 2) {
            rangeStart = new Date(dates[0][0]);
            rangeEnd = new Date(dates[0][1]);
        }
    }
    return [rangeStart, rangeEnd];
}