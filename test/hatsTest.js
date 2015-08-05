var app = require('./../app.js')
    db = require('monk')('localhost/hats')
    Hats = db.get('hats')
    assert = require('assert')
    request = require('supertest')

before(function(done){
  Hats.remove({}, function(){
    Hats.insert({name: 'The Sorting Hat',  _id:'55e050595ae876b6b79ad318'}, function(){
      done();
    })
  })
})

describe('POST api/hats', function(){
  it('creates a new resource', function(done){
    request(app)
    .post('/api/hats')
    .send({name: 'Dunce'})
    .expect(201)
    .end(function(err, res){
      if (err){
        throw err;
      } else {
        done()
      }
    })
  })
})

describe('GET api/hats/:id', function() {
  it('retrieves one document', function(done) {
    request(app)
      .get('/api/hats/55e050595ae876b6b79ad318')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.body.name, 'The Sorting Hat')
          done()
        }
      })
  });
});

describe('PUT api/hats/:id', function(){
  it('updates a document', function(done){
    request(app)
    .put('/api/hats/55e050595ae876b6b79ad318')
    .send({name:'Wizard\'s Hat'})
    .expect(200)
    .end(function(err, res){
      if (err){
        throw err
      }else{
        assert.equal(res.body.name, 'Wizard\'s Hat')
        done()
      }
    })
  })
})
describe('DELETE api/hats/:id', function(){
  it('deletes one document', function(done){
    request(app)
    .post('/api/hats/55e050595ae876b6b79ad318')
    .expect(200)
    .end(function(err, res){
      if (err){
        throw err
      } else {
        done()
      }
    })
  })
})
