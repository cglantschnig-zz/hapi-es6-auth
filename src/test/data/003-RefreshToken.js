import { RefreshToken } from '../../shared/models/';

let data = [
  {
    "user_id": 10001,
    "token": "daa32876-80fc-44a7-be8c-e09804001626",
    "expires_in": new Date((new Date()).getTime() + 600 * 24 * 60 * 60)
  },
  {
    "user_id": 10002,
    "token": "74dd9ed7-31e3-4dc8-91a6-b6e3e87b08d0",
    "expires_in": new Date((new Date()).getTime() + 600 * 24 * 60 * 60)
  }
];

export default function() {
  return RefreshToken.bulkCreate(data);
};
