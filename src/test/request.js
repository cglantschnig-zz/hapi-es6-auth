import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

let agent = chai.request('http://localhost:3000');

export default agent;
