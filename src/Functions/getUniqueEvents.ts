import { parseEvents } from "./parseEvents";

export function getUniqueEvents() {
    var events = parseEvents();
    // const uniqueSummaries = [...new Set<any>( events.map((obj: { summary: string; }) => obj.summary)) ];
  //   console.log(events);
    var Uniquesummaries = new Set(events.map((obj: { summary: string; }) => obj.summary));
    console.log(Uniquesummaries);
  }