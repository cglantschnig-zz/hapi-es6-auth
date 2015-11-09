import { AccessToken } from '../../shared/models/';

let data = [
  {
    "user_id": 10001,
    "token": "daa32876-80fc-44a7-be8c-e09804001626",
    "expires_in": new Date((new Date()).getTime() + 300 * 24 * 60 * 60)
  }
];

export default function() {
  return AccessToken.bulkCreate(data);
};
