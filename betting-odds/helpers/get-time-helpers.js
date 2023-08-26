import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

const timeOption = {
    "options": {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone:"America/New_York",
        timeZoneName: "short"
    },
    "longOptions": {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone:"America/New_York"
    },
    "mobileOptions": {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone:"America/New_York",
        timeZoneName: "short"
    },
    "timeOptions": {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone:"America/New_York",
        timeZoneName: "short"
    },
    "titleOption": {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    },
    "matchupOption": {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    },
    "shortYear": {
        year: '2-digit'
    },
}

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const getTimeHelpers = {
    now: function(formatOption) {
        let newDate = new Date();
        let options = timeOption[formatOption] ?? timeOption['options'];

        return newDate.toLocaleString('en-US', options);
    },
    getTime: function(theDate) {
        let time = new Date(theDate);
        return time.toLocaleString('en-US', timeOption['timeOptions']);
    },
    getDate: function(theDate, formatOption) {
        let dateParse = Date.parse(theDate.replace(/-/g, '\/'));
        let newDate = new Date(dateParse);
        let options = timeOption[formatOption] ?? timeOption['options'];
        return newDate.toLocaleString('en-US', options);
    },
    getGameDate: function(theDate) {
        let dateParse = Date.parse(theDate);
        let newDate = new Date(dateParse);
        return newDate.toLocaleString('en-US', timeOption['longOptions']) + ' - ' + newDate.toLocaleString('en-US', timeOption['timeOptions']);
    },
    isBeforeToday: function(theDate) {
        let todaysDate = new Date();
        todaysDate.setUTCHours(0, 0, 0 ,0)
        let pickedDate = new Date(theDate);
        pickedDate.setUTCHours(0, 0, 0, 0)
        return pickedDate.getTime() < todaysDate.getTime();
    },
    isBeforeNow: function(theDate) {
        let todaysDate = new Date();
        return utcToZonedTime(todaysDate) <= utcToZonedTime(theDate);
    },
    // if the current day is 2 days after the startDate of the match.. no-index
    noIndexPage: function(theDate) {
        let todaysDate = new Date();
        todaysDate.setUTCHours(0, 0, 0 ,0)
        let pickedDate = new Date(theDate);
        pickedDate.setDate(pickedDate.getDate() + 2);
        pickedDate.setUTCHours(0, 0, 0, 0)
        return pickedDate.getTime() <= todaysDate.getTime();
    },
    getLineDate: function(theDate) {
        let dateParse = Date.parse(theDate);
        let newDate = new Date(dateParse);
        let options = { month: '2-digit', day: '2-digit' };
        let timeOptions = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }
        return newDate.toLocaleString('en-US', options) + ' ' + newDate.toLocaleString('en-US', timeOptions).toLowerCase();
    },
    getYearRange: function(theDate, nTimes) {
        let dateParse = new Date(Date.parse(theDate));
        let currentYear =  !!nTimes ? dateParse.getFullYear() - nTimes : dateParse.getFullYear();
        let lastYear = currentYear - 1;

        return lastYear +'-'+ currentYear.toLocaleString('en-US',  timeOption['shortYear']).substring(3);
    },
}

export default getTimeHelpers;
