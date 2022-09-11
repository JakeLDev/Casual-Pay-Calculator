import React from "react";
import InputField from "../components/InputField";
interface MyProps {
    manual: boolean;
}
// const AuthScreen
const InputForm: React.FC<MyProps> = (props: MyProps) => {

    function calculatePay() {
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

        if (props.manual) {
            WeekdayHours = parseFloat((document.getElementById("WeekdayHours") as HTMLInputElement).value) || 0;
            SaturdayHours = parseFloat((document.getElementById("SaturdayHours") as HTMLInputElement).value) || 0;
            SundayHours = parseFloat((document.getElementById("SundayHours") as HTMLInputElement).value) || 0;
            PublicHolidayHours = parseFloat((document.getElementById("PublicHolidayHours") as HTMLInputElement).value) || 0;
            EveningHours = parseFloat((document.getElementById("EveningHours") as HTMLInputElement).value) || 0;
            OvertimeHours = parseFloat((document.getElementById("OvertimeHours") as HTMLInputElement).value) || 0;
        } else {
            // Replace with Google Calendar
            WeekdayHours = 0;
            SaturdayHours = 0;
            SundayHours = 0;
            PublicHolidayHours = 0;
            EveningHours = 0;
            OvertimeHours = 0;
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
                        <p>gcal</p>
                    </div>
                </div>
            <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full" onClick={calculatePay}>
                Calculate Pay
            </button>
            
            {/* <p id="TotalPayDisplay" className="text-5xl subpixel-antialiased font-bold	text-slate-200"/> */}
            </>
        );
    }
export default InputForm;