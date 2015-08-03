var express = require('express');
var router = express.Router();
db = require('monk')('localhost/swords')
var Swords = db.get('swords')

router.get('/', function(req, res) {
  res.status(200).json({ message: 'rawr! you did it!' });
});

router.post('/', function(req, res){
  Swords.insert(req.body, function(err, sword){
    if(err){
      res.send(err);
    }
    res.status(201).json(sword)
  })
})



module.exports = router
