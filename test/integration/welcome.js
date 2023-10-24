import chai from 'chai';
import chaiHttp from 'chai-http';
import enums from '../../src/lib/enums';

const { expect } = chai;
chai.use(chaiHttp);

import assert from 'assert';

import app from '../../src/app';

describe('Welcome Integration test', () => {
  it('Welcome', (done) => {
    chai.request(app)
      .get('/')
      .set({ 'Content-Type': 'application/json' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        expect(res.body.message).to.equal(enums.WELCOME);
        done();
      });
  });

  it('Wrong route', done => {
    chai.request(app)
      .get('/welcome')
      .set({ 'Content-Type': 'application/json' })
      .end((err, res) => {
        assert.equal(res.body.status, 'Error');
        expect(res.statusCode).to.equal(enums.HTTP_NOT_FOUND);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        expect(res.body.message).to.equal(enums.DEAD_END_MESSAGE);
        done();
      });
  });
});
