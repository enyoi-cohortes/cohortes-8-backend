import { DataTypes, } from 'sequelize';

import connection from '../connection.js';

const Room = connection.define(
  'Rooms',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
    },
    codeName: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    pricePerNight: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    bedsQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    airConditionary: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    roomService: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  },
);

export {
  Room,
};