import { utcToZonedTime } from 'date-fns-tz';

import { parse } from 'next-useragent'
let ua = (typeof window === "undefined") ? null : parse(window.navigator.userAgent);

export function formatDateParameter(dateParameter){
  // If the date is undefined, default to today in Eastern
  if(dateParameter === undefined){
    // Get current datetime (in UTC)
    dateParameter = new Date()
    dateParameter = utcToZonedTime(dateParameter, 'America/New_York')
  }
  else{
    dateParameter = new Date(dateParameter);
  }
  // Start the range from 5AM UTC
  dateParameter = appendStartTime(dateParameter);
  return dateParameter
}

export function appendStartTime(date){
  date = (ua !== null) ? (ua.browser.includes('Safari')) ? date.toISOString().split('T')[0].replace(/-/g, '/') : date.toISOString().split('T')[0] : date.toISOString().split('T')[0];
  return date + " 05:00:00+00";
}

export function formatQueryEndDate(dateParameter){
  dateParameter = new Date(dateParameter);
  dateParameter = (ua !== null) ? (ua.browser.includes('Safari')) ? dateParameter.toISOString().split('T')[0].replace(/-/g, '/') : dateParameter.toISOString().split('T')[0] : dateParameter.toISOString().split('T')[0];
  return dateParameter + " 04:00:00+00";
}

export function nowEasternTime(){
  var today = new Date();
  today = utcToZonedTime(today, 'America/New_York')
  return today;
}
