import React, { useState, useEffect } from "react";

import TimePicker from "./TimePicker";
import BookedRoom from "./BookedRoom";
import "./CurrentRoom.css";

const CurrentRoom = props => {
  const {
    currentRoom,
    addBooking,
    setCurrentRoom,
    setAvailability
  } = props;
  const [bookingStartTime, setBookingStartTime] = useState(
    new Date()
  );
  const [bookingEndTime, setBookingEndTime] = useState(new Date());
  const [isBookedBy, setIsBookedBy] = useState("");

  useEffect(() => {
    const now = Date.now();
    if (
      currentRoom.availability !== "Available" &&
      currentRoom.from < now &&
      currentRoom.to > now
    ) {
      setAvailability(currentRoom.id, "In-Use");
    } else if (currentRoom.to < now) {
      setAvailability(currentRoom.id, "Available");
    }
    setIsBookedBy(currentRoom.bookedBy || "");
  }, [currentRoom]);

  // add booking handler
  const addBookingHandler = () => {
    if (bookingStartTime && bookingEndTime && isBookedBy) {
      addBooking(
        currentRoom.id,
        isBookedBy,
        bookingStartTime,
        bookingEndTime
      );
      setIsBookedBy("");
      alert(`Room ${currentRoom.id} Booked by ${isBookedBy}`);
      setCurrentRoom(null);
    }
    return;
  };

  return (
    <div>
      <div className="current-room-header">
        Room #{currentRoom.id}
      </div>
      <div className="availability">
        <span
          style={{
            color:
              currentRoom.availability === "Available"
                ? "green"
                : "red"
          }}
        >
          {currentRoom.availability.toUpperCase()}
        </span>
      </div>
      {currentRoom.availability !== "Available" ? (
        <BookedRoom currentRoom={currentRoom} />
      ) : (
        <React.Fragment>
          <div className="booked-by">
            <div className="book-now">
              <h2>Book Now!</h2>
              <div className="name-container">
                <h4 className="name-tag">Name: </h4>
                <input
                  className="name-input"
                  type="text"
                  value={isBookedBy}
                  onChange={e => setIsBookedBy(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="booking-times">
            <TimePicker
              bookingStartTime={bookingStartTime}
              setBookingStartTime={setBookingStartTime}
              bookingEndTime={bookingEndTime}
              setBookingEndTime={setBookingEndTime}
            />
          </div>
          <div className="button-container">
            <button className="button" onClick={addBookingHandler}>
              Book
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default CurrentRoom;
