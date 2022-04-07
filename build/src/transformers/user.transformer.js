'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.transformAuthUser = exports.transform = void 0;
const transform = (user) => {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
};
exports.transform = transform;
const transformAuthUser = (user, token) => {
  return {
    id: user._id.toString(),
    token,
  };
};
exports.transformAuthUser = transformAuthUser;
