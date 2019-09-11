import React, { useEffect, useState } from "react";
import Room from "./models/room";

import CurrentRoom from "./components/CurrentRoom";
import "./App.css";

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();

  // create Rooms
  const createRooms = numOfRooms => {
    return Array(numOfRooms)
      .fill()
      .map((e, i) => {
        return new Room(i + 1, "Available", null, null, null);
      });
  };

  const setAvailability = (roomId, availability) => {
    const updatedRooms = rooms.map(room => {
      if (room.id === roomId) {
        room.availability = availability;
      }
      return room;
    });
    setRooms(updatedRooms);
  };

  // effect to set rooms
  useEffect(() => {
    const newRooms = createRooms(10);
    setRooms(newRooms);
  }, []);

  // select room handler
  const onSelectRoom = selectedRoom => {
    setCurrentRoom(rooms.find(room => room.id === selectedRoom.id));
  };

  // fn to render rooms list
  const renderRooms = () => {
    return (
      rooms.length > 0 &&
      rooms.map((room, i) => (
        <div
          className="rooms-list-item"
          style={{
            backgroundColor:
              room.availability !== "Available"
                ? "#FD4242"
                : "#4CAF50",
            color: room.availability !== "Available" ? "#fff" : "#000"
          }}
          onClick={() => onSelectRoom(room)}
          key={i}
        >
          Room #{room.id}
        </div>
      ))
    );
  };

  useEffect(() => {
    renderRooms();
  }, [setAvailability]);

  // fn to add booking to a room
  const addBooking = (roomId, bookedBy, from, to) => {
    const bookedRoom = rooms.filter(room => room.id === roomId);
    bookedRoom.bookedBy = bookedBy;
    bookedRoom.from = from;
    bookedRoom.to = to;
    const updatedRooms = rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          availability: "Booked",
          bookedBy,
          from,
          to
        };
      }
      return room;
    });
    setRooms(updatedRooms);
  };

  return (
    <div className="root">
      <header className="header">Meeting Room Organizer</header>
      <div className="rooms">
        <div className="rooms-list">{renderRooms()}</div>
        <div className="current-room">
          {currentRoom ? (
            <CurrentRoom
              currentRoom={currentRoom}
              addBooking={addBooking}
              setAvailability={setAvailability}
              setCurrentRoom={setCurrentRoom}
            />
          ) : (
            <div className="current-room-header">
              Please Select a Room
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
