var app = require('./../app.js')
    db = require('monk')('localhost/swords')
    Potions = db.get('potions')
    assert = require('assert')
    request = require('supertest')

before(function(done){
  Potions.remove({}, function() {
    Potions.insert({title: 'VooDoo',
     _id:'55d050595ae876b6b79ad318'}, function(){
      done();
    });
  });
});

describe('POST api/potions', function() {
  it('creates a new resource', function(done) {
    request(app)
      .post('/api/potions')
      .send({title: 'from test'})
      .expect(201)
      .end(function(err, res){
        if (err) {
          throw err;
        } else {
          done()
        }
      })
  });
});


describe('PUT api/potions/:id', function() {
  it('updates a resource', function(done) {
    request(app)
      .put('/api/potions/55d050595ae876b6b79ad318')
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

describe('GET api/potions/:id', function() {
  it('retrieves one document', function(done) {
    request(app)
      .get('/api/potions/55d050595ae876b6b79ad318')
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

describe('GET api/potions', function() {
  it('retrieves all document', function(done) {
    request(app)
      .get('/api/potions')
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

describe('DELETE api/potions/:id', function() {
  it('deletes one document', function(done) {
    request(app)
      .post('/api/potions/55d050595ae876b6b79ad318')
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
