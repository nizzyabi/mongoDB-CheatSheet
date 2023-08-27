// requires 

require('dotenv').config();
let mongoose = require('mongoose');

// #1 connection
const mySecret = process.env['MONGO_URI'] // comes from .env file
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected")
  })
  .catch(err => {
    console.log("error", err)
  })

// #2 
// Person model

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
})

// #3

// Create person withint the mongoose personSchema
var Person = mongoose.model("Person", personSchema);

// make person real by making his name and setting his data to the things wihtin the schema


var createAndSavePerson = function(done) {
  var janeFonda = new Person({ name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"] });

  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

// #4 Creating many records
var arrayOfPeople = [
  { name: 'Elsa', age: 20, favoriteFoods: ['eggs', 'mushroom'] },
  { name: 'Maha', age: 20, favoriteFoods: ['salmon'] },
  { name: 'Leila', age: 44, favoriteFoods: ['fishies'] }
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.log(err);
    done(null, people);
  })
};

// #5 find people
const findPeopleByName = function(personName, done){
  Person.find({name: personName}, function (err, personFound){
    if (err) return console.log(err);
    done(null, personFound);
  })
}

// #6 find ONE

const findOneByFood = function(food, done){
  Person.findOne({favoriteFoods: food}, function(err, data){
    if(err) console.log(err);
    done(null, data);
  })
}

// # 7 findByID
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, data){
    if(err) console.log(err);
    done(null, data)
  })
};

// #8 Updates
const findEditThenSave = (personId, done) => {
  // init hamburger
  var foodToAdd = "hamburger";
  // id check
  Person.findById(personId, (err, person) => {
    // error check
    if (err) console.log(err);
    // push
    person.favoriteFoods.push(foodToAdd)
    // save
    person.save((err, updatedPerson) => {
      if(err) console.log(err);
      done(null, updatedPerson);
    }) 
  })
}

// #9 New Updates using findOneAndUpdated
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

// #10 remove by Id
const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, function (err, personRemoved){
    if (err) {
      console.log(err)
    } else {
      done(null, personRemoved);
    }
  })
};

// #11 remove()

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      done(null, data);
    }
  })
};

// #12 query search that searches for specific things  using exec()
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 0 })
    .limit(2)
    .select({ age: 0 })
    .exec(function(err, data) {
      done(null, data);
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;