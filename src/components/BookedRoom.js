import React from "react";
import "./BookingRoom.css";

const BookedRoom = props => {
  const { currentRoom } = props;
  return (
    <div className="booking">
      <p>
        Booked By:{" "}
        <span style={{ fontWeight: "bold" }}>
          {currentRoom.bookedBy}
        </span>
      </p>
      <p>
        From: <span style={{ fontWeight: "bold" }}>{new Date(currentRoom.from).toLocaleDateString()}{" "}
        {new Date(currentRoom.from).toLocaleTimeString()}</span>
      </p>
      <p>
        To:
        <span style={{ fontWeight: "bold" }}>{new Date(currentRoom.to).toLocaleDateString()}{" "}
        {new Date(currentRoom.to).toLocaleTimeString()}</span>
      </p>
    </div>
  );
};

export default BookedRoom;
