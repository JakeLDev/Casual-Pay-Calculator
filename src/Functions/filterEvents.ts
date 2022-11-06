import { parseEvents } from './parseEvents';

export function filterEvents(rangeStart:Date, rangeEnd:Date, eventDesc:String) {

    var events = parseEvents();
    const filteredEvents = events.filter( (x: { start: string; summary: String[]; }) => 
                                            x.summary.includes(eventDesc) && 
                                            new Date(x.start) >= rangeStart && 
                                            new Date(x.start) <= rangeEnd);
    return filteredEvents;
}