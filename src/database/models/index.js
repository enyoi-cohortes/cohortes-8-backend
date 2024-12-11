import { User, } from './user.model.js';
import { Room, } from './room.model.js';
import { Hotel, } from './hotel.model.js';
import { Reservation, } from './reservation.model.js';

// Relacion muchos a muchos
Room.belongsToMany(User, {
  through: {
    model: Reservation,
    unique: false,
  },
});

User.belongsToMany(Room, {
  through: {
    model: Reservation,
    unique: false,
  },
});

// Relacion de uno a muchos.
Hotel.hasMany(Room, {
  foreignKey: 'hotelId',
});
Room.belongsTo(Hotel);

User.sync({
  // force: true,
});

Room.sync({
  // force: true,
});

Hotel.sync({
  // force: true,
});

Reservation.sync({
  // force: true,
});

export {
  User,
  Room,
  Hotel,
  Reservation,
};