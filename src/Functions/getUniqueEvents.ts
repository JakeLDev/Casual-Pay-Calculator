import { parseEvents } from "./parseEvents";

export function getUniqueEvents() { //TODO add options for users to select
    var events = parseEvents();
    var Uniquesummaries = new Set(events.map((obj: { summary: string; }) => obj.summary));
    return Uniquesummaries;
  }