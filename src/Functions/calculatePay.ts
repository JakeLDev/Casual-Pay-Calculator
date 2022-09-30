/* eslint-disable */
import { sumHours } from './sumHours';
import { filterEvents } from './filterEvents';
import { calculateHours } from './calculateHours';
import { createTimeRange } from './createTimeRange';

export function calculatePay(manual: boolean, dates: string[]) {
    
    var BaseRate = parseFloat((document.getElementById("BaseRate") as HTMLInputElement).value) || 30.36;

    var WeekdayMultiplier = parseFloat((document.getElementById("WeekdayMultiplier") as HTMLInputElement).value) || 1.0;
    var SaturdayMultiplier = parseFloat((document.getElementById("SaturdayMultiplier") as HTMLInputElement).value) || 0;
    var SundayMultiplier = parseFloat((document.getElementById("SundayMultiplier") as HTMLInputElement).value) || 0;
    var PublicHolidayMultiplier = parseFloat((document.getElementById("PublicHolidayMultiplier") as HTMLInputElement).value) || 0;
    var EveningMultiplier = parseFloat((document.getElementById("EveningMultiplier") as HTMLInputElement).value) || 0;
    var OvertimeMultiplier = parseFloat((document.getElementById("OvertimeMultiplier") as HTMLInputElement).value) || 0;
    
    var WeekdayHours:number;
    var SaturdayHours:number;
    var SundayHours:number;
    var PublicHolidayHours:number;
    var EveningHours:number;
    var OvertimeHours:number;

    if (manual) {
        WeekdayHours = parseFloat((document.getElementById("WeekdayHours") as HTMLInputElement).value) || 0;
        SaturdayHours = parseFloat((document.getElementById("SaturdayHours") as HTMLInputElement).value) || 0;
        SundayHours = parseFloat((document.getElementById("SundayHours") as HTMLInputElement).value) || 0;
        PublicHolidayHours = parseFloat((document.getElementById("PublicHolidayHours") as HTMLInputElement).value) || 0;
        EveningHours = parseFloat((document.getElementById("EveningHours") as HTMLInputElement).value) || 0;
        OvertimeHours = parseFloat((document.getElementById("OvertimeHours") as HTMLInputElement).value) || 0;
    } else {
        // Filter events by summary and date, return as array of events
        // Loop over events counting the number of hours - calculate, or count from previous counts
        // console.log("dates", dates);
        // console.log(dates[0][0]);
        var dateRange = createTimeRange(dates); // TODO show the user which dates are being used
        var startDate = dateRange[0];
        var endDate = dateRange[1];
        var eventName = (document.getElementById("EventName") as HTMLInputElement).value || "EB Games Shift";
        console.log("HERE",startDate, endDate, eventName);
        var filteredList = filterEvents(startDate, endDate, eventName); //TODO FIX
        // TODO "you had x events starting with y between z and a"
        // var filteredList = filterEvents(new Date(), new Date(), "EB Games Shift");
        calculateHours(filteredList);
        var summedHours = sumHours(filteredList);
        
        WeekdayHours = summedHours.weekdayHours;
        SaturdayHours = summedHours.saturdayHours;
        SundayHours = summedHours.sundayHours;
        PublicHolidayHours = summedHours.publicHolidayHours;
        EveningHours = summedHours.eveningHours;
        OvertimeHours = summedHours.overtimeHours;
        (document.getElementById("Summary") as HTMLParagraphElement).innerHTML = "You had " + filteredList.length + " events containing: '" + eventName  + "' between " + startDate.toDateString() + " and " + endDate.toDateString();
    }
    
    var WeekdayRate = BaseRate * WeekdayMultiplier;
    var SaturdayRate = BaseRate * SaturdayMultiplier;
    var SundayRate = BaseRate * SundayMultiplier;
    var PublicHolidayRate = BaseRate * PublicHolidayMultiplier;
    var EveningRate = BaseRate * EveningMultiplier;
    var OvertimeRate = BaseRate * OvertimeMultiplier;

    var WeekdayPay = (WeekdayRate * WeekdayHours) || 0;
    var SaturdayPay = (SaturdayRate * SaturdayHours) || 0;
    var SundayPay = (SundayRate * SundayHours) || 0;
    var PublicHolidayPay = (PublicHolidayRate * PublicHolidayHours) || 0;
    var EveningPay = (EveningRate * EveningHours) || 0;
    var OvertimePay = (OvertimeRate * OvertimeHours) || 0;

    var TotalPay = parseFloat(WeekdayPay.toFixed(2)) + parseFloat(SaturdayPay.toFixed(2)) + parseFloat(SundayPay.toFixed(2)) + parseFloat(EveningPay.toFixed(2)) + parseFloat(PublicHolidayPay.toFixed(2)) + parseFloat(OvertimePay.toFixed(2));


    (document.getElementById("TableWeekdayHours") as HTMLInputElement).innerHTML = WeekdayHours.toFixed(2);
    (document.getElementById("TableSaturdayHours") as HTMLInputElement).innerHTML = SaturdayHours.toFixed(2);
    (document.getElementById("TableSundayHours") as HTMLInputElement).innerHTML = SundayHours.toFixed(2);
    (document.getElementById("TablePublicHolidayHours") as HTMLInputElement).innerHTML = PublicHolidayHours.toFixed(2);
    (document.getElementById("TableEveningHours") as HTMLInputElement).innerHTML = EveningHours.toFixed(2);
    (document.getElementById("TableOvertimeHours") as HTMLInputElement).innerHTML = OvertimeHours.toFixed(2);
    (document.getElementById("TableTotalHours") as HTMLInputElement).innerHTML = (WeekdayHours + SaturdayHours + SundayHours + PublicHolidayHours + EveningHours + OvertimeHours).toFixed(2);

    (document.getElementById("TableWeekdayRate") as HTMLTableCellElement).innerHTML = WeekdayRate.toFixed(2) + "/hr";
    (document.getElementById("TableSaturdayRate") as HTMLTableCellElement).innerHTML = SaturdayRate.toFixed(2) + "/hr";
    (document.getElementById("TableSundayRate") as HTMLTableCellElement).innerHTML = SundayRate.toFixed(2) + "/hr";
    (document.getElementById("TablePublicHolidayRate") as HTMLTableCellElement).innerHTML = PublicHolidayRate.toFixed(2) + "/hr";
    (document.getElementById("TableEveningRate") as HTMLTableCellElement).innerHTML = EveningRate.toFixed(2) + "/hr";
    (document.getElementById("TableOvertimeRate") as HTMLTableCellElement).innerHTML = OvertimeRate.toFixed(2) + "/hr";
    
    (document.getElementById("WeekdayPayDisplay") as HTMLInputElement).innerHTML = "$" + WeekdayPay.toFixed(2).toString();
    (document.getElementById("SaturdayPayDisplay") as HTMLInputElement).innerHTML = "$" + SaturdayPay.toFixed(2).toString();
    (document.getElementById("SundayPayDisplay") as HTMLInputElement).innerHTML = "$" + SundayPay.toFixed(2).toString();
    (document.getElementById("EveningPayDisplay") as HTMLInputElement).innerHTML = "$" + EveningPay.toFixed(2).toString();
    (document.getElementById("PublicHolidayPayDisplay") as HTMLInputElement).innerHTML = "$" + PublicHolidayPay.toFixed(2).toString();
    (document.getElementById("OvertimePayDisplay") as HTMLInputElement).innerHTML = "$" + OvertimePay.toFixed(2).toString();
    (document.getElementById("TotalPayDisplay") as HTMLInputElement).innerHTML = "$" + TotalPay.toFixed(2).toString();

    (document.getElementById("ResultsTable") as HTMLTableElement).className = "table-fixed visible border-collapse";

}