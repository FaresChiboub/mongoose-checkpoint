const express = require("express");
const app = express();
const port = 3000;
const connectDb = require("./config/connectDb");
const user = require("./model/user");

require("dotenv").config();

connectDb();

//Create and Save a Record of a Model:

const create = async () => {
  try {
    const newUser = new user({
      name: "zfzfz",
      age: 45,
      favoriteFood: ["pizza"],
    });
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};
8;
create();

//Create Many Records with model.create()

const createMany = async () => {
  try {
    const result = await user.insertMany([
      { name: "wzklhfezulh", age: 20, favoriteFood: ["steak"] },
      { name: "lfefgt", age: 30, favoriteFood: ["cheese"] },
      { name: "afezgzefe", age: 40, favoriteFood: ["rice"] },
    ]);

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
createMany();

//Use model.find() to Search Your Database

const findUsers = async () => {
  try {
    const result = await user.find();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
findUsers();

//Use model.findOne() to Return a Single Matching Document from Your Database

const findOneUser = async () => {
  try {
    const result = await user.findOne({ favoriteFood: "pizza" });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
findOneUser();

//Use model.findById() to Search Your Database By _id

const findUserId = async () => {
  try {
    const result = await user.findById("65d87faa33e9d393479e5f54");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
findUserId();

//Perform Classic Updates by Running Find, Edit, then Save
const addFavoriteFood = async (personId) => {
  try {
    const person = await user.findById(personId);
    if (person) {
      person.favoriteFood.push("hamburger");
      await person.save();
      console.log("Favorite food added successfully:", person);
    } else {
      console.log("Person not found");
    }
  } catch (error) {
    console.log("Error adding favorite food:", error);
  }
};

const personIdToUpdate = "65d8d9db344ebac19da96e46";
addFavoriteFood(personIdToUpdate);

//Delete One Document Using model.findByIdAndRemove

const deletePersonById = async (personId) => {
  try {
    const deletedPerson = await user.findByIdAndRemove(personId);
    if (deletedPerson) {
      console.log("Person deleted successfully:", deletedPerson);
    } else {
      console.log("Person not found");
    }
  } catch (error) {
    console.log(error);
  }
};
const personIdToDelete = "65d87f4856f5fc1b666e2f29";
deletePersonById(personIdToDelete);

//MongoDB and Mongoose - Delete Many Documents with model.remove()

const deletePeopleByName = async () => {
  try {
    const result = await user.remove({ name: "Mary" });
    console.log("Number of people deleted:", result.deletedCount);
  } catch (error) {
    console.log(error);
  }
};
deletePeopleByName();

//Chain Search Query Helpers to Narrow Search Results

user
  .find({ favoriteFoods: "Burritos" })
  .sort({ name: 1 })
  .limit(2)
  .select("-age")
  .exec()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

/*, this code finds people who like burritos, sorts them by name, 
limits the results to 2 documents, excludes the age field, 
and then executes the query,
 handling any errors and logging the result.
*/

// Start the server and listen on the specified port

app.listen(port, (err) => {
  err ? console.log("error") : console.log("server is running");
});
