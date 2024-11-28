import { User, } from './user.model.js';

User.sync({
  // force: true,
});

export {
  User,
};