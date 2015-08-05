var app = require('./../app.js')
    db = require('monk')('localhost/swords')
    Swords = db.get('swords')
    assert = require('assert')
    request = require('supertest')

    // var assert = require("assert")
    // describe('Array', function() {
    //   describe('#indexOf()', function () {
    //     it('should return -1 when the value is not present', function () {
    //       assert.equal(-1, [1,2,3].indexOf(5));
    //       assert.equal(-1, [1,2,3].indexOf(0));
    //     });
    //   });
    // });

before(function(done) {
  Swords.remove({}, function() {
    Swords.insert({title: 'Sting',  _id: '55c050595ae876b6b79ad318'}, function() {
      done();
    });
  });
});

describe('POST api/swords', function() {
  it('creates a new resource', function(done) {
    request(app)
      .post('/api/swords')
      .send({title: 'from test'})
      .expect(201)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          done()
        }
      })
  });
});


describe('PUT api/swords/:id', function() {
  it('updates a resource', function(done) {
    request(app)
      .put('/api/swords/55c050595ae876b6b79ad318')
      .send({title:'from test'})
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.body.title, 'from test')
          done()
        }
      })
  });
});

describe('GET api/swords/:id', function() {
  it('retrieves one document', function(done) {
    request(app)
      .get('/api/swords/55c050595ae876b6b79ad318')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.body.title, 'from test')
          done()
        }
      })
  });
});

describe('GET api/swords', function() {
  it('retrieves all document', function(done) {
    request(app)
      .get('/api/swords')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.body.length, '2')
          done()
        }
      })
  });
});

describe('DELETE api/swords/:id', function() {
  it('deletes one document', function(done) {
    request(app)
      .post('/api/swords/55c050595ae876b6b79ad318')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          done()
        }
      })
  });
});
