import ApiCalendar from 'react-google-calendar-api';


const config = {
  "clientId": "690969561883-sjbuvoapnreslb4ats6v66egc66inmd7.apps.googleusercontent.com",
  "apiKey": process.env.REACT_APP_API_KEY,
  // "apiKey": "j",
  "scope": "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events.readonly",
  "discoveryDocs": [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  ]
}
export const apiCalendar = new ApiCalendar(config)

// apiCalendar.setCalendar("en.australian#holiday@group.v.calendar.google.com");

