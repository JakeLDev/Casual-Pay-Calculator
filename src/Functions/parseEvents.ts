export function parseEvents() {
    if (!sessionStorage.getItem('Events')) {
        alert("Please Fetch Events First!");
      }
      else {
        console.log("Fetching Stored Events");
        var events = JSON.parse(sessionStorage.Events);
        // console.log("TEST EVENTS", events);
      }
      return events;
    
}
