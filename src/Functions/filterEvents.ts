import { parseEvents } from './parseEvents';

export function filterEvents(rangeStart:Date, rangeEnd:Date, eventDesc:String) {
    //TODO get dates and event description from user input

    var rangeStart = new Date(new Date().getFullYear(), 0, 1); //TODO remove 
    // var rangeStart = new Date()
    var rangeEnd = new Date(new Date().getFullYear(), 11, 31);

    var events = parseEvents();
    console.log(events);
    console.log(rangeStart, rangeEnd, eventDesc);
    // var filteredEvents = events.filter( (x: { start: { dateTime: Date; }; summary: String[]; }) => x.start.dateTime >= rangeStart && x.start.dateTime <= rangeEnd && x.summary.includes(eventDesc));
    const filteredEvents = events.filter( (x: { start: { dateTime: string; }; summary: String[]; }) => 
                                            x.summary.includes(eventDesc) && 
                                            new Date(x.start.dateTime) >= rangeStart && 
                                            new Date(x.start.dateTime) <= rangeEnd);
    console.log(filteredEvents);
    return filteredEvents;
}