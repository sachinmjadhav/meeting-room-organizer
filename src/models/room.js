class Room {
  constructor(id, availability, bookedBy, from, to) {
    this.id = id;
    this.availability = availability;
    this.bookedBy = bookedBy;
    this.from = from;
    this.to = to;
  }
}

export default Room;