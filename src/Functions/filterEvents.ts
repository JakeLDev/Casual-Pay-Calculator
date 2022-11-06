import { parseEvents } from './parseEvents';

export function filterEvents(rangeStart:Date, rangeEnd:Date, eventDesc:String) {
    //TODO get dates and event description from user input

    // var rangeStart = new Date(new Date().getFullYear(), 0, 1); //TODO remove 
    // var rangeStart = new Date()
    // var rangeEnd = new Date(new Date().getFullYear(), 11, 31);

    // get date of start of pay period 11-24
    // rangeStart = new Date("2022-09-11");
    // rangeEnd = new Date("2022-09-24");

    var events = parseEvents();
    console.log(events);
    console.log(rangeStart, rangeEnd, eventDesc);
    // var filteredEvents = events.filter( (x: { start: { dateTime: Date; }; summary: String[]; }) => x.start.dateTime >= rangeStart && x.start.dateTime <= rangeEnd && x.summary.includes(eventDesc));

    // const filteredEvents = events.filter( (x: { start: { dateTime: string; }; summary: String[]; }) => 
    //                                         x.summary.includes(eventDesc) && 
    //                                         new Date(x.start.dateTime) >= rangeStart && 
    //                                         new Date(x.start.dateTime) <= rangeEnd);

    const filteredEvents = events.filter( (x: { start: string; summary: String[]; }) => 
                                            x.summary.includes(eventDesc) && 
                                            new Date(x.start) >= rangeStart && 
                                            new Date(x.start) <= rangeEnd);
    console.log("Filtered events", filteredEvents);
    return filteredEvents;
}