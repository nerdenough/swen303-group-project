var mysql = require('mysql');
var chai = require('chai');
var request = require('supertest');
var expect = chai.expect;

var app = require('../server');
var config = require('../config');

var db = mysql.createConnection(config.mysql);

describe('auth', function() {
  describe('#login', function() {
    it('should send status 500 when sending no data', function(done) {
      request(app)
        .post('/auth/login')
        .expect(500)
        .end(function(err) {
          err ? done(err) : done();
        });
    });

    it('should send status 500 when sending blank values', function(done) {
      request(app)
        .post('/auth/login')
        .send({email: '', password: ''})
        .expect(500)
        .end(function(err) {
          err ? done(err) : done();
        });
    });

    it('should throw an error when using an invalid email', function(done) {
      request(app)
        .post('/auth/login')
        .send({email: 'hello@example.com', password: '12345'})
        .expect(200)
        .end(function(err) {
          err ? done(err) : done();
        });
    });
  });

  describe('#register', function() {
    before(function(done) {
      // Clear and insert dummy data into the database
      var post = [
        [1, 'hello@world1.com', 'pass@word1'],
        [2, 'hello@world2.com', 'pass@word2'],
        [3, 'hello@world3.com', 'pass@word3'],
      ];

      var sql = 'DELETE FROM users';
      db.query(sql, [post], function(err) {
        if (err) {
          done(err);
        }

        sql = 'INSERT INTO users (id, email, password) VALUES ?';
        db.query(sql, [post], function(err) {
          err ? done(err) : done();
        });
      });
    });

    after(function(done) {
      // Clear the database
      var sql = 'DELETE FROM users';
      db.query(sql, function(err) {
        err ? done(err) : done();
      });
    });

    it('should insert a new user into the database', function(done) {
      request(app)
        .post('/auth/register')
        .send({email: 'newuser@example.com', password: '12345'})
        .expect(200)
        .end(function(err, res) {
          err && done(err);

          expect(res.body).to.not.have.property('error');
          done();
        });
    });

    it('should not allow duplicate emails to register', function(done) {
      request(app)
        .post('/auth/register')
        .send({email: 'newuser@example.com', password: '12345'})
        .expect(200)
        .end(function(err, res) {
          err && done(err);

          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
});
