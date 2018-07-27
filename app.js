const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!


    const kittySchema = new mongoose.Schema({
        name: String,
        color: String
    });

    kittySchema.methods.speak = function() {
        const greeting = this.name
            ? "Meow name is " + this.name
            : "I dont have a name";
        console.log(greeting);
    }

    const Kitten = mongoose.model('Kitten', kittySchema);

    const silence = new Kitten({ name: 'Silence', color: 'White', tail: true });
    console.log(silence.name); // 'Silence'

    


    let fluffy = new Kitten({ name: 'fluffy' });
    // fluffy.speak(); // "Meow name is fluffy"

    fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();
    });

    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens);
    });

    const catFind = function(err,cats){
        if (err) return console.error(err);
        console.log(cats)
    };


    Kitten.find({ name: /^fluff/ }, catFind);
        
});