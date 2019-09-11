import React from "react";
import DateTimePicker from "react-datetime-picker";

import "./TimePicker.css";

const TimePicker = props => {
  const {
    bookingStartTime,
    setBookingStartTime,
    bookingEndTime,
    setBookingEndTime
  } = props;
  return (
    <React.Fragment>
      <div className="booking-time">
        <div className="booking-time-tag">From:</div>
        <DateTimePicker
          value={bookingStartTime}
          onChange={val => setBookingStartTime(val)}
        />
      </div>
      <div className="booking-time">
        <div className="booking-time-tag">To:</div>
        <DateTimePicker
          value={bookingEndTime}
          onChange={val => setBookingEndTime(val)}
        />
      </div>
    </React.Fragment>
  );
};

export default TimePicker;
