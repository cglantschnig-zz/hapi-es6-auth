import supertest from 'supertest';

// This agent refers to PORT where program is runninng.
let api = supertest
  .agent('http://localhost:3000');

export default api;
