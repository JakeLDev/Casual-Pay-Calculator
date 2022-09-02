import React from "react";
import InputField from "../components/InputField";

const ManualInterface = () => {
    // if an int, convert to 2dp float, or truncat to 2dp float
    
        return (
            <>
                <div className="grid grid-cols-2 gap-8 items-center max-w-lg mx-auto">
                    <div>
                        <h2>Enter payrate to 2dp (e.g 16.39)</h2>
                        <p className='text-inherit'></p>
                        <InputField placeHolder="Base Hourly Rate"/>
                        <InputField placeHolder="Saturday Multiplier (1.2x def)"/>
                        <InputField placeHolder="Sunday Multiplier (1.4x def)"/>
                        <InputField placeHolder="Evening Multiplier (1.2x def)"/>
                        <InputField placeHolder="Public Holiday Multiplier (2x def)"/>
                    </div>
                    <div>
                        <h2>Enter your shifts</h2>
                        <InputField placeHolder="Weekday Hours" />
                        <InputField placeHolder="Saturday Hours" />
                        <InputField placeHolder="Sunday Hours" />
                        <InputField placeHolder="Evening Hours" />
                        <InputField placeHolder="Public Holiday Hours" />
                    </div>
                </div>
            </>
        );
    }
export default ManualInterface;