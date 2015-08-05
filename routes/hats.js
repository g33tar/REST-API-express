var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/hats');
var Hats = db.get('hats');

// router.get('/', function(req, res) {
//   Hats.find({}, function(err, hat){
//     if (err) {
//      res.send(err);
//    }
//    res.status(200).json(hat);
//  })
// });

router.post('/', function(req, res){
  Hats.insert(req.body, function(err, hat){
    if(err){
      res.send(err);
    }
    res.status(201).json(hat)
  })
})

router.get('/:id', function(req, res){
  Hats.findOne({_id: req.params.id}, function(err, hat){
    if(err){
      res.send(err)
    }
    res.status(200).json(hat)
  })
})

router.put('/:id', function(req, res){
  Hats.findAndModify({_id: req.params.id}, req.body, function(err, hat){
    if(err){
      res.send(err)
    }
    res.status(200).json(req.body)
  })
})

router.post('/:id', function(req, res){
  Hats.remove({_id: req.params.id}, function(err, hat){
    if(err){
      res.send(err)
    }
    res.status(200).json(hat)
  })
})





module.exports = router
