import { DataTypes, } from 'sequelize';

import connection from '../connection.js';

const User = connection.define(
  'Users',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    givenName: {
      type: DataTypes.STRING(70),
    },
    familyName: {
      type: DataTypes.STRING(100),
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING(15),
      unique: true,
      allowNull: true,
    },
    nationalId: {
      type: DataTypes.STRING(15),
      unique: true,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export { User, };