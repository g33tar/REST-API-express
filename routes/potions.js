var express = require('express');
var router = express.Router();
db = require('monk')(process.env.MONGOLAB_URI)
var Potions = db.get('potions')

router.get('/', function(req, res) {
//res.status(200).json({message: "rawr, you did it!"})
  Potions.find({}, function(err,potions){
    if (err) {
     res.send(err);
   }
   res.status(200).json(swords);
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
  Potion.findOne({_id: req.params.id}, function(err, potion){
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
    res.status(201).json(potion);
  })
})

router.delete('/:id', function(req, res){
  Potions.remove({_id: req.params.id}, function(err, potion){
    if(err){
      res.send(err)
    }
    res.status(200).json(potion)
  })
})


module.exports = router
