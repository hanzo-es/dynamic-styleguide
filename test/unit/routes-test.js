// const express = require('express');
const request = require('supertest');
const createServer = require('../server');

describe('Test routes server', function() {
  let app;

  // Called once before any of the tests in this block begin.
  before((done) => {
    createServer(3030, (server) => {
      app = server;
      done();
    });
  });

  after(() => {
    app.close();
  });

  it('should send back the index page', function(done) {
    const r = request(app).get('/');
    r.expect(200, (err) => {
      done(err);
    });
  });

  it('should respond ok to an element view route', function(done) {
    request(app)
      .get('/view/components/button/')
      .expect(200, (err) => {
        done(err);
      });
  });

  it('should respond ok to the content route', function(done) {
    request(app)
      .get('/content/components/button')
      .expect(200, (err) => {
        done(err);
      });
  });

  it('404 everything else', function(done) {
    request(app)
      .get('/foo/bar')
      .expect(404, done);
  });
});
