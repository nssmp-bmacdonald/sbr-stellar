import React, { useState, forwardRef } from "react";

import Link from 'next/link';
import { useRouter } from 'next/router'

import { parse } from 'next-useragent'

import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { formatDateParameter, nowEasternTime } from '../../helpers/date-helpers';

import styles from '/styles/page-controls/DateControls.module.scss';
let ua =  (typeof window === "undefined") ? null : parse(window.navigator.userAgent)

function DateControls(){
  // get request router objects
  const router = useRouter();
  let path = router.asPath;
  const format = router.query.format;
  // format the date query string.. default to today if undefined
  const dateQueryString = formatDateParameter(router.query.date);
  // returns bools
  const today = isToday(dateQueryString);
  const yesterday = isYesterday(dateQueryString);
  // date picker objects
  const [startDate, setStartDate] = useState(nowEasternTime());
  // define custom date picker input
  const DateInput = forwardRef(({ onClick }, ref) => (
    <button className={`${styles.text} no-button`} onClick={onClick} ref={ref}>
      DATE <i className={` ${styles.text} sbr-icon-calendar`}></i>
    </button>
  ))
  DateInput.displayName = 'DateInput';
  // once a date is selected push it into the url
  const handleChangeRaw = (value) => {
    value = (ua !== null) ? (ua.browser.includes('Safari')) ? value.toISOString().split('T')[0].replace(/-/g, '/') : value.toISOString().split('T')[0] : value.toISOString().split('T')[0];
    // in case theres an existing query string remove it
    path = path.split('?')[0];
    if(format != undefined){
      router.push({
        pathname: path,
        query: { date: value, format:format },
      })
    }
    else{
      router.push({
        pathname: path,
        query: { date: value },
      })
    }
  };
  return(
    <div className={styles.top}>
      <div className={styles.topContainer}>
        {todayLink(today, path, format)}
        <div className={styles.divider}></div>
        {yesterdayLink(yesterday, path, format)}
        <div className={styles.divider}></div>
        <DatePicker selected={isSelected(today, dateQueryString, startDate)} customInput={<DateInput/>} onChange={(date) => {setStartDate(date); handleChangeRaw(date);}}
        includeDateIntervals={[ { start: subDays(new Date(), 60), end: addDays(new Date(), 60) }, ]} />
      </div>
    </div>
  )
}

export default DateControls;

// function to check if its today
function isToday(date){
  var now = new Date(nowEasternTime());
  now = (ua !== null) ? (ua.browser.includes('Safari')) ? now.toISOString().split('T')[0].replace(/-/g, '/') : now.toISOString().split('T')[0] : now.toISOString().split('T')[0];

  var queryDate = new Date(date);
  queryDate = (ua !== null) ? (ua.browser.includes('Safari')) ? queryDate.toISOString().split('T')[0].replace(/-/g, '/') : queryDate.toISOString().split('T')[0] : queryDate.toISOString().split('T')[0];

  return queryDate === now;
}

function isSelected(today, dateQueryString, startDate){
  // if selected value is not today, convert the dateQueryString and pass it to the datepicker, else fall back to today
  return (!today ? new Date(dateQueryString) : startDate);
}

// function to check if its yesterday
function isYesterday(date){
  var now = new Date(nowEasternTime());
  var yesterday = new Date(now.setDate(now.getDate() - 1));
  yesterday = (ua !== null) ? (ua.browser.includes('Safari')) ? yesterday.toISOString().split('T')[0].replace(/-/g, '/') : yesterday.toISOString().split('T')[0] : yesterday.toISOString().split('T')[0];

  var queryDate = new Date(date);
  queryDate = (ua !== null) ? (ua.browser.includes('Safari')) ? queryDate.toISOString().split('T')[0].replace(/-/g, '/') : queryDate.toISOString().split('T')[0] : queryDate.toISOString().split('T')[0];

  return queryDate === yesterday;
}

// logic to generate 'today' button href
function todayLink(today, path, format){
  if(today === true){
    return <span className={`${styles.selected} ${styles.text}`}>TODAY</span>
  }
  else{
    path = path.split('?')[0];
    if(format != undefined){
      path = path+'?format='+format;
    }
    return(
      <Link href={path}>
        <a className={styles.text} data-aatracker="Page Controls - Date Controls - TODAY">TODAY</a>
      </Link>
    )
  }
}

// logic to generate 'yesterday' button href
function yesterdayLink(yesterday, path, format){
  if(yesterday === true){
    return <span className={`${styles.selected} ${styles.text}`}>YESTERDAY</span>
  }
  else{
    var now = nowEasternTime();
    // get the value of yesterdays date
    var yesterdayDate = new Date(new Date(now).setDate(new Date(now).getDate() - 1));
    yesterdayDate = yesterdayDate.toISOString().split('T')[0];
    // in case theres already a query string remove it
    path = path.split('?')[0];
    var link = path+"?date="+yesterdayDate;
    if(format != undefined){
      link = link+'&format='+format;
    }
    return(
      <Link href={link}>
        <a className={styles.text} data-aatracker="Page Controls - Date Controls - YESTERDAY">YESTERDAY</a>
      </Link>
    )
  }
}
