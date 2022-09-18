export function sumHours(filteredList: any[]) {
    var weekdayHours = 0;
    var saturdayHours = 0;
    var sundayHours = 0;
    var publicHolidayHours = 0;
    var eveningHours = 0;
    var overtimeHours = 0;
    filteredList.forEach((event: any) => {
        console.log(event);
        weekdayHours += event.weekdayHours;
        saturdayHours += event.saturdayHours;
        sundayHours += event.sundayHours;
        publicHolidayHours += event.publicHolidayHours;
        eveningHours += event.eveningHours;
        overtimeHours += event.overtimeHours;
    });
    console.log("sum hours");
    console.log(weekdayHours);
    console.log(saturdayHours);
    console.log(sundayHours);
    console.log(publicHolidayHours);
    console.log(eveningHours);
    console.log(overtimeHours);
    return {
        weekdayHours: weekdayHours,
        saturdayHours: saturdayHours,
        sundayHours: sundayHours,
        publicHolidayHours: publicHolidayHours,
        eveningHours: eveningHours,
        overtimeHours: overtimeHours
    };
}