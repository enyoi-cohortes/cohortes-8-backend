import { DataTypes, } from 'sequelize';

import connection from '../connection.js';

const Hotel = connection.define(
  'Hotels',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    stars: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  },
);

export {
  Hotel,
};