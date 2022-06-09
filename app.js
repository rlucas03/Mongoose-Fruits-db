// documentation for this at https://mongodb.github.io/node-mongodb-native/3.5/quick-start/quick-start/
// created a new db using our nodejs app using mongo db driver to create fruitsDB.

const mongoose = require('mongoose');

// mongoose makes a connection to our mongodb server and then look for a db called fruitsDB and if it doesnt exist it will create it.
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true});

// new scheme is a blueprint for our struxture for our data in our database 
// added mongoose number min max validation on rating key/value
// all this validation is on mongoose validation docs
const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, 'Please check your data entry, no name specified!']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});
// use singular fruit instead of fruits that sticks to the structure specified in the fruitScheme(2nd param)
const Fruit = mongoose.model('Fruit', fruitSchema);

// new document

const fruit = new Fruit ({
  name: 'Apple',
  rating: 10,
  review: 'Pretty solid as a fruit.'
});


// fruit.save();
/* this calls the save method in
 mongoose to save this fruit document
into a fruits collection inside our fruitsDB */
// every time .save method runs it will add another apple



const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});
// favouriteFruit: fruitSchema this tells mongoose we are embedding a fruit document inside the property favouriteFruit in our person document

// mongoose automatically converts singular form 'Person' into plural 'People' collection
const Person = mongoose.model('Person', personSchema);

const mango = new Fruit({
  name: 'Mango',
  score: 6,
  review: 'Decent fruit.'
});

mango.save();



Person.updateOne({_id: '603fccde2108840dd373fe7e'}, {favouriteFruit: mango}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log('updated johns fav fruit');
    mongoose.connection.close();
  }
});

// const person = new Person ({
//   name: 'Amy',
//   age: 12,
//   favouriteFruit: pineapple
//   // her fav fruit is the pineapple document we created up top a bit
// });

// person.save();

const kiwi = new Fruit({
  name: 'Kiwi',
  score: 10,
  review: 'The best fruit!'
});

// const orange = new Fruit({
//   name: 'Orange',
//   score: 6,
//   review: 'Gets stuck in my teeth'
// });

// const banana = new Fruit({
//   name: 'Banana',
//   score: 10,
//   review: 'Weird texture'
// });


// 2nd param a callback to log any err
// calling insert many function 
// Fruit.insertMany([kiwi,orange,banana], function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Succesfully saved all the fruits to fruitsDB');
//   }
// });

/* reading into our fruits db, this call back function has 2 parameters, error and 2nd is whatever it finds back
 we are searching thru our fruits collection to find everything
 to summarize we tap into our 
fruits collection thru the fruit 
model, we call the find function and
 when thats completed a callback function
  gets triggered and we have the possibility
   of having an error if anything went wrong 
   with finding our fruits otherwise we get 
   our results back called fruits. */
Fruit.find(function(err, fruits){
  if (err) {
    console.log(err);
  } else {
    // fruit in foreach func can be named ANYTHING.
    // tapping into fruits array that we got back from our database above ^^ with foreach, foreach accepts a callback which has single parameter which is each individual object inside the array
  // we can close conn here because callback function already has run and has the data we want.
    
    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    });



// update the peach, i gave the id, what i wanted to change and a callback func to log any err
  // Fruit.updateOne({_id: '603fbbaff033f80a83a66464'}, {name: 'Peach'}, function(err){
  //   if (err){
  //     console.log(err);
  //   } else {
  //     

  //     console.log('Succesfully updated the document.');
  //   }
  // });
    // deleting peach record. Change to Fruit.deleteOne to switch back to fruit collection from people
  // Person.deleteMany({name: 'John'}, function(err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('Succesfully deleted a document');
  //     mongoose.connection.close();
  //   }
  // });



    // console.log(fruits); logs entire fruits array

  }
});





const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
}
