import React from "react";

interface MyProps {
    manual: boolean;
}

const AuthScreen: React.FC<MyProps> = (props: MyProps) => {

    const selectManual = () => {
        console.log("manual");
        props.manual = true;
    }

    return (
        <div className="flex flex-col items-center max-w-sm mx-auto text-inherit">
            <p className='text-inherit'> You may enter your shifts automatically, or you may allow this site to read your Google Calender and use the events saved instead.</p>
            <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold my-2 py-2 px-4 rounded-full" onClick={selectManual}>
                Enter Shifts Manually
            </button>
            <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full">
                Read Google Calender
            </button>
        </div>
    );
}
export default AuthScreen;