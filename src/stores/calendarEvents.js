import { createSlice } from '@reduxjs/toolkit';

import { selectAccessToken } from './authentication';
import { fetchCalendarEvents } from './api';

export const calendarEvents = createSlice({
  name: 'calendarEvents',
  initialState: {
    loading: false,
    map: {},
  },
  reducers: {
    setCalendarEvents: (state, { payload }) => {
      state.map[payload.calendarId] = payload.events;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

const { setCalendarEvents, setLoading } = calendarEvents.actions;

export const loadCalendarEvents = ({ calendarId, fetched }) => async (
  dispatch,
  getState
) => {
  const accessToken = selectAccessToken(getState());
  try {
    dispatch(setLoading(true));
    if (fetched === false) {
      const items = await fetchCalendarEvents({ accessToken, calendarId });
      dispatch(
        setCalendarEvents({
          calendarId,
          events: items
            .map(({ id, summary, start, end }) => {
              // Filter out events that have no `dateTime`. Those are full day
              // events, they only have the field `date`.
              if (!start.dateTime) {
                return null;
              }
              // only return the fields we need
              return {
                id,
                summary,
                start: start.dateTime,
                end: end.dateTime,
              };
            })
            .filter(Boolean),
        })
      );
  }
  } catch (e) {
    // do nothing
  } finally {
    dispatch(setLoading(false));
    const calendarEvents = selectCalendarEvents(getState(), calendarId);
    var events = JSON.stringify(calendarEvents) || [];
    sessionStorage.setItem('Events', events);
  }
};

export const selectIsEventsLoading = (state) =>
  state.calendarEvents?.loading ?? false;

export const selectCalendarEvents = (state, calendarId) =>
  (!selectIsEventsLoading(state) && state.calendarEvents?.map[calendarId]) ??
  null;

export default calendarEvents.reducer;
