import ApiCalendar from 'react-google-calendar-api';

const config = {
  "clientId": "440071859159-ralj00m9iu1oim6n8c5l2v3i7hcnupc7.apps.googleusercontent.com",
  "apiKey": process.env.REACT_APP_API_KEY,
  "scope": "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events.readonly",
  "discoveryDocs": [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  ]
}

export const apiCalendar = new ApiCalendar(config)

// apiCalendar.setCalendar("en.australian#holiday@group.v.calendar.google.com");

