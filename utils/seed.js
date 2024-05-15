const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); //import for @faker-js/faker (bobby suggested this for random seeds)
const dotenv = require('dotenv');
dotenv.config();

// Define Mongoose models based on the schemas we defined earlier
const User = require('../models/Users'); 
const Thought = require('../models/Thoughts'); 

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => console.error('MongoDB connection error:', err));

async function createSeedData() {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create a list to hold users and thoughts
    const users = [];
    const thoughts = [];

    for (let i = 0; i < 10; i++) {
        const username = faker.internet.userName();
        const email = faker.internet.email();

        // Create user
        const user = new User({
            username,
            email,
            thoughts: [],
            friends: []
        });

        // Save user
        await user.save();
        users.push(user);

        // Create 1-2 thoughts per user
        for (let j = 0; j < faker.number.int({ min: 1, max: 2 }); j++) {
            const thoughtText = faker.lorem.sentence();
            const thought = new Thought({
                thoughtText,
                username,
                reactions: []  // No reactions array initially
            });

            // Save thought
            await thought.save();
            thoughts.push(thought);

            // Associate thought with user
            user.thoughts.push(thought._id);
        }

        // Randomly add friends (up to 2) from the list of already created users
        for (let k = 0; k < faker.number.int({ min: 1, max: 2 }); k++) {
            const friendIndex = faker.number.int({ min: 0, max: users.length - 1 });
            user.friends.push(users[friendIndex]._id);
        }

        // Save changes to user (added thoughts and friends)
        await user.save();
    }

    console.log('Mongoose Database seeded successfully');
    mongoose.disconnect();
}

createSeedData().catch(err => {
    console.error('Failed to seed mongoose database:', err);
    mongoose.disconnect();
});
