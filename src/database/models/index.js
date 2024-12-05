import { User, } from './user.model.js';
import { Room, } from './room.model.js';
import { Hotel, } from './hotel.model.js';

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

export {
  User,
  Room,
  Hotel,
};