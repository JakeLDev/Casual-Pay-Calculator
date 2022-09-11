import React from "react";
import InputField from "../components/InputField";

const ManualInterface = () => {

    function calculatePay() {
        var BaseRate = parseFloat((document.getElementById("BaseRate") as HTMLInputElement).value) || 0;
        var SaturdayMultiplier = parseFloat((document.getElementById("SaturdayRate") as HTMLInputElement).value) || 0;
        var SundayMultiplier = parseFloat((document.getElementById("SundayRate") as HTMLInputElement).value) || 0;
        var PublicHolidayMultiplier = parseFloat((document.getElementById("PublicHolidayRate") as HTMLInputElement).value) || 0;
        var EveningMultiplier = parseFloat((document.getElementById("EveningRate") as HTMLInputElement).value) || 0;
        var OvertimeMultiplier = parseFloat((document.getElementById("OvertimeRate") as HTMLInputElement).value) || 0;

        var WeekdayHours = parseFloat((document.getElementById("WeekdayHours") as HTMLInputElement).value) || 0;
        var SaturdayHours = parseFloat((document.getElementById("SaturdayHours") as HTMLInputElement).value) || 0;
        var SundayHours = parseFloat((document.getElementById("SundayHours") as HTMLInputElement).value) || 0;
        var PublicHolidayHours = parseFloat((document.getElementById("PublicHolidayHours") as HTMLInputElement).value) || 0;
        var EveningHours = parseFloat((document.getElementById("EveningHours") as HTMLInputElement).value) || 0;
        var OvertimeHours = parseFloat((document.getElementById("OvertimeHours") as HTMLInputElement).value) || 0;

        // var WeekdayRate = BaseRate;
        var SaturdayRate = BaseRate * SaturdayMultiplier;
        var SundayRate = BaseRate * SundayMultiplier;
        var PublicHolidayRate = BaseRate * PublicHolidayMultiplier;
        var EveningRate = BaseRate * EveningMultiplier;
        var OvertimeRate = BaseRate * OvertimeMultiplier;

        var WeekdayPay = (BaseRate * WeekdayHours) || 0;
        var SaturdayPay = (SaturdayRate * SaturdayHours) || 0;
        var SundayPay = (SundayRate * SundayHours) || 0;
        var PublicHolidayPay = (PublicHolidayRate * PublicHolidayHours) || 0;
        var EveningPay = (EveningRate * EveningHours) || 0;
        var OvertimePay = (OvertimeRate * OvertimeHours) || 0;

        var TotalPay = parseFloat(WeekdayPay.toFixed(2)) + parseFloat(SaturdayPay.toFixed(2)) + parseFloat(SundayPay.toFixed(2)) + parseFloat(EveningPay.toFixed(2)) + parseFloat(PublicHolidayPay.toFixed(2)) + parseFloat(OvertimePay.toFixed(2));

        console.log(WeekdayPay);
        console.log(SaturdayPay);
        console.log(SundayPay);
        console.log(EveningPay);
        console.log(PublicHolidayPay);
        console.log(OvertimePay);
        console.log(TotalPay);

        // (document.getElementById("WeekdayPay") as HTMLInputElement).value = WeekdayPay.toFixed(2);

        (document.getElementById("TableWeekdayRate") as HTMLTableCellElement).innerHTML = BaseRate.toFixed(2);
        (document.getElementById("TableSaturdayRate") as HTMLTableCellElement).innerHTML = SaturdayRate.toFixed(2);
        (document.getElementById("TableSundayRate") as HTMLTableCellElement).innerHTML = SundayRate.toFixed(2);
        (document.getElementById("TablePublicHolidayRate") as HTMLTableCellElement).innerHTML = PublicHolidayRate.toFixed(2);
        (document.getElementById("TableEveningRate") as HTMLTableCellElement).innerHTML = EveningRate.toFixed(2);
        (document.getElementById("TableOvertimeRate") as HTMLTableCellElement).innerHTML = OvertimeRate.toFixed(2);
        
        (document.getElementById("WeekdayPayDisplay") as HTMLInputElement).innerHTML = "$" + WeekdayPay.toFixed(2).toString();
        (document.getElementById("SaturdayPayDisplay") as HTMLInputElement).innerHTML = "$" + SaturdayPay.toFixed(2).toString();
        (document.getElementById("SundayPayDisplay") as HTMLInputElement).innerHTML = "$" + SundayPay.toFixed(2).toString();
        (document.getElementById("EveningPayDisplay") as HTMLInputElement).innerHTML = "$" + EveningPay.toFixed(2).toString();
        (document.getElementById("PublicHolidayPayDisplay") as HTMLInputElement).innerHTML = "$" + PublicHolidayPay.toFixed(2).toString();
        (document.getElementById("OvertimePayDisplay") as HTMLInputElement).innerHTML = "$" + OvertimePay.toFixed(2).toString();
        (document.getElementById("TotalPayDisplay") as HTMLInputElement).innerHTML = "$" + TotalPay.toFixed(2).toString();
        (document.getElementById("ResultsTable") as HTMLTableElement).className = "table-auto visible";

    }
    // if an int, convert to 2dp float, or truncat to 2dp float
    
        return (
            <>
                <div className="grid grid-cols-3 items-start gap-8 max-w-5xl mx-auto my-1">
                    <div>
                        <p className="text-lg font-bold mb-2">Enter Hourly Pay Rate</p>
                        <p className='text-left'>Base Hourly Rate</p>
                        <InputField placeHolder="Base Hourly Rate" inputId="BaseRate" inputType="number"/>
                    </div>
                    <div>
                        <p className="text-lg font-bold mb-2">Enter Rate Multipliers</p>
                        <p className='text-left'>Saturday Multiplier (1.2x by default)</p>
                        <InputField placeHolder="Saturday Multiplier" inputId="SaturdayRate" inputType="number" value="1.2"/>
                        <p className='text-left'>Sunday Multiplier (1.4x by default)</p>
                        <InputField placeHolder="Sunday Multiplier" inputId="SundayRate" inputType="number" value="1.4"/>
                        <p className='text-left'>Evening Multiplier (0.2x by default)</p>
                        <InputField placeHolder="Evening Multiplier" inputId="EveningRate" inputType="number" value="0.2"/>
                        <p className='text-left'>Public Holiday Multiplier (2x by default)</p>
                        <InputField placeHolder="Public Holiday Multiplier" inputId="PublicHolidayRate" inputType="number" value="2"/>
                        <p className='text-left'>Overtime Multiplier (1.5x by default)</p>
                        <InputField placeHolder="Overtime Multiplier" inputId="OvertimeRate" inputType="number" value="1.5"/>
                    </div>
                    <div>
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
                </div>
            <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full" onClick={calculatePay}>
                Calculate Pay
            </button>
            
            {/* <p id="TotalPayDisplay" className="text-5xl subpixel-antialiased font-bold	text-slate-200"/> */}
            </>
        );
    }
export default ManualInterface;