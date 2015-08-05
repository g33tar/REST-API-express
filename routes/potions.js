var express = require('express');
    router = express.Router();
    db = require('monk')('localhost/potions')
    Potions = db.get('potions')

router.get('/', function(req, res) {
//res.status(200).json({message: "rawr, you did it!"})
  Potions.find({}, function(err, potions){
    if (err) {
     res.send(err);
   }
   res.status(200).json(potions);
 })
});

router.post('/', function(req, res){
  Potions.insert(req.body, function(err, potion){
    if(err){
      res.send(err);
    }
    res.status(201).json(potion)
  })
})

router.get('/:id', function(req, res){
  Potions.findOne({_id: req.params.id}, function(err, potion){
    if(err){
      res.send(err)
    }
    res.status(200).json(potion)
  })
})

router.put('/:id', function(req, res){
  Potions.findAndModify({_id: req.params.id}, req.body, function(err, potion){
    if (err) {
      res.send(err);
    }
    res.status(200).json(req.body);
  })
})

router.post('/:id', function(req, res){
  Potions.remove({_id: req.params.id}, function(err, potion){
    if(err){
      res.send(err)
    }
    res.status(200).json(potion)
  })
})


module.exports = router
