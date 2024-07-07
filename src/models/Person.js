const mongoose = require('mongoose')


//cria a collection de Person
const Person = mongoose.model("Person", {
    name: String,
    salary: Number,
    approved:Boolean,
})

module.exports = Person