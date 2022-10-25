const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });


router.post('/', (req, res) => {
  const newData = req.body;
  collection.insertOne(newData)
  .then((result) => {
    res.json(result.ops[0])
})
  .catch((err) => {
  console.error(err)
  res.status(500)
  res.json({status: 500, error: err})
})
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  //_id is key from db, its value is instance of objectID, which will be whatever ID we pass in
  collection.deleteOne({_id: ObjectID(id)})
  .then((result) => {
    res.json(result)
  })
  .catch((err) => {
    console.error(err)
    res.status(500)
    res.json({status: 500, error: err})
})
})

router.put('/:id', (req,res) => {
  const id = req.params.id;
  const updatedData = req.body;
  collection.updateOne(
    {_id: ObjectID(id)},
//need two her because first finds object to update by id and second is new data to update it with
    {$set: updatedData}
  )
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    console.error(err)
    res.status(500)
    res.json({status: 500, error: err})
})
})

  return router;
};

module.exports = createRouter;

// //this is responsible for handling requests
// const express = require('express');
// const ObjectID = require('mongodb').ObjectID;
// //need to declare id here so we can create insatnces of it in this file whenever we want

// const createRouter = function (collection) {

//   const router = express.Router();

//   // we pass a route to listen out for and then a function with req and response object
//   router.get('/', (req, res) => {
//   //if you dont pass arguement to find it returns everything
//   //toArray is an asynchronus operation, we dont know how many results its going to return,or how long it takes,
//   // so we can add a .then on
//     collection.find().toArray()
//     .then((docs) => {
//       res.json(docs)
//     })
//   })

// //in mongodb ids are instances of objects, bg long numbers, this is what is stored on the db, not
// //simple ids, so thats what we need to search for here.
//   router.get('/:id', (req, res) => {
//     const id = req.params.id;
// //findone method requires an object, need to pass it as an instance of this object thatnwe have declared here
// //as id
//     collection.findOne({_id: ObjectID(id)})
//     .then((doc) => {res.json(doc)})
// //want to stop programme,let user know it doesnt work if it cant find the id searched for
//     .catch((err) => {
//       console.error(err)
//       res.status(500)
//       res.json({status: 500, error: err})
//     })

//   })
// //collection =table, document=row(instance of column), column=keys ,field=

// router.post('/', (req, res) => {
//   const newData = req.body;
//   collection.insertOne(newData)
//   .then((result) => {
//     res.json(result.ops[0])
// })
//   .catch((err) => {
//   console.error(err)
//   res.status(500)
//   res.json({status: 500, error: err})
// })
// })

// router.delete('/:id', (req, res) => {
//   const id = req.params.id;
//   //_id is key from db, its value is instance of objectID, which will be whatever ID we pass in
//   collection.deleteOne({_id: ObjectID(id)})
//   .then((result) => {
//     res.json(result)
//   })
//   .catch((err) => {
//     console.error(err)
//     res.status(500)
//     res.json({status: 500, error: err})
// })
// })

// router.put('/:id', (req,res) => {
//   const id = req.params.id;
//   const updatedData = req.body;
//   collection.updateOne(
//     {_id: ObjectID(id)},
// //need two her because first finds object to update by id and second is new data to update it with
//     {$set: updatedData}
//   )
//   .then((result) => {
//     res.json(result);
//   })
//   .catch((err) => {
//     console.error(err)
//     res.status(500)
//     res.json({status: 500, error: err})
// })
// })

//   return router;

// };
// //if we dont have front end function for one of these we need to test it in insomnia-no front end 
// //update so need to test on insomnia



// module.exports = createRouter;
