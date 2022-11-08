import { parseEvents } from './parseEvents';

export function filterEvents(rangeStart:Date, rangeEnd:Date, eventDesc:String) {
    var filteredEvents = [];
    var events = parseEvents();
    // console.log(events.length);
    if (events.length !== 0) {
        filteredEvents = events.filter( (x: { start: string; summary: String[]; }) => 
                                                x.summary.includes(eventDesc) && 
                                                new Date(x.start) >= rangeStart && 
                                                new Date(x.start) <= rangeEnd);
    }
    return filteredEvents;
}