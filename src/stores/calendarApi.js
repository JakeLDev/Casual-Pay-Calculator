import ApiCalendar from 'react-google-calendar-api';

const config = {
  "clientId": "440071859159-mdbsqoofftpqfpdrauii7tghheg0ak5p.apps.googleusercontent.com",
  "apiKey": process.env.REACT_APP_API_KEY,
  "scope": "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events.readonly",
  "discoveryDocs": [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  ]
}

export const apiCalendar = new ApiCalendar(config)