import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import 'dayjs/locale/de';

import { loadCalendarEvents, selectCalendarEvents } from './calendarEvents';
import { updateConfig } from './storage';

export const viewState = createSlice({
  name: 'viewState',
  initialState: null,
  reducers: {
    setSelectedCalendarId: (state, { payload }) => {
      state.selectedCalendarId = payload;
    },
    setRangeType: (state, { payload }) => {
      state.selectedRangeType = payload;
    },
    changeRange: (state, { payload }) => {
      if (payload === 'prev') {
        state.currentDatePointerStart = dayjs(state.currentDatePointerStart)
          .subtract(1, state.selectedRangeType)
          .toJSON();
      } else if (payload === 'next') {
        state.currentDatePointerStart = dayjs(state.currentDatePointerStart)
          .add(1, state.selectedRangeType)
          .toJSON();
      }
    },
    resetRange: (state) => {
      state.currentDatePointerStart = dayjs().startOf('day').toJSON();
    },
    setWeekStart: (state, { payload }) => {
      state.weekStart = payload;
    },
    setStart: (state, { payload }) => {
      state.currentDatePointerStart = payload;
    },
    setEnd: (state, { payload }) => {
      state.currentDatePointerEnd = payload;
    },
  },
});

export const { changeRange, resetRange } = viewState.actions;
const {setSelectedCalendarId} = viewState.actions;

export const selectSelectedCalendar = (state) =>
  state.viewState.selectedCalendarId;


export const setSelectedCalendar = ({ calendarId }) => (dispatch, getState) => {
  dispatch(setSelectedCalendarId(calendarId));
  updateConfig({ selectedCalendarId: calendarId });
  var calendarEvents = selectCalendarEvents(getState(), calendarId);
  var fetched = Boolean(calendarEvents);
  dispatch(loadCalendarEvents({ calendarId, fetched }));
};

export default viewState.reducer;
