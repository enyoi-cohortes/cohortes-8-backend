import { DataTypes, } from 'sequelize';

import connection from '../connection.js';

const Reservation = connection.define(
  'Reservations',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    }, 
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    }, 
    nightsQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'PENDING'),
      allowNull: true,
      defaultValue: 'ACTIVE',
    }, // ACTIVA, INACTIVA, PENDIENTE,
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  },
);

export {
  Reservation,
};