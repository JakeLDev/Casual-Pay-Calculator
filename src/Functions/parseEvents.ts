export function parseEvents() {
  var events = [];
  if (!sessionStorage.getItem('Events')) {
      alert("Please Sign-In First!");
    } else {
      events = JSON.parse(sessionStorage.Events);
    }
  return events;
}
