import React from 'react';

const TotalPay = () => {


    return (
        <>
            <div className='grid mx-auto max-w-5xl'>
                <table id="ResultsTable" className="table-auto hidden">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Pay Type</th>
                            <th className="px-4 py-2">Hours</th>
                            <th className="px-4 py-2">Rate</th>
                            <th className="px-4 py-2">Pay</th>
                            {/* <th className="px-4 py-2">Weekday Pay</th>
                            <th className="px-4 py-2">Saturday Pay</th>
                            <th className="px-4 py-2">Sunday Pay</th>
                            <th className="px-4 py-2">Evening Pay</th>
                            <th className="px-4 py-2">Public Holiday Pay</th>
                            <th className="px-4 py-2">Overtime Pay</th>
                            <th className="px-4 py-2">Total Pay</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">Weekday</td>
                            <td className="border px-4 py-2" id="TableWeekdayHours">0</td>
                            <td className="border px-4 py-2" id="TableWeekdayRate">0</td>
                            <td className="border px-4 py-2" id='WeekdayPayDisplay'>$0.00</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Saturday</td>
                            <td className="border px-4 py-2" id="TableSaturdayHours">0</td>
                            <td className="border px-4 py-2" id="TableSaturdayRate">0</td>
                            <td className="border px-4 py-2" id='SaturdayPayDisplay'>$0.00</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Sunday</td>
                            <td className="border px-4 py-2" id="TableSundayHours">0</td>
                            <td className="border px-4 py-2" id="TableSundayRate">0</td>
                            <td className="border px-4 py-2" id='SundayPayDisplay'>$0.00</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Evening</td>
                            <td className="border px-4 py-2" id="TableEveningHours">0</td>
                            <td className="border px-4 py-2" id="TableEveningRate">0</td>
                            <td className="border px-4 py-2" id='EveningPayDisplay'>$0.00</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Public Holiday</td>
                            <td className="border px-4 py-2" id="TablePublicHolidayHours">0</td>
                            <td className="border px-4 py-2" id="TablePublicHolidayRate">0</td>
                            <td className="border px-4 py-2" id='PublicHolidayPayDisplay'>$0.00</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Overtime</td>
                            <td className="border px-4 py-2" id="TableOvertimeHours">0</td>
                            <td className="border px-4 py-2" id="TableOvertimeRate">0</td>
                            <td className="border px-4 py-2" id='OvertimePayDisplay'>$0.00</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Total</td>
                            <td className="border px-4 py-2" id="TableTotalHours">0</td>
                            <td className="border px-4 py-2" id="TableTotalRate">---</td>
                            <td className="border px-4 py-2" id='TotalPayDisplay'>$0.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
        );
}

export default TotalPay;