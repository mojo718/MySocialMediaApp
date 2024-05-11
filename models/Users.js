//import mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;

// create userSchema 
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter valid email address']// use Regex to validate email
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    toJson: {
        virtuals: true
        },
    toObject: {
        virtuals: true
    }
});

//adding virtual property for friend count
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

//create User model using userSchema
const User = mongoose.model('User', userSchema);
// export User
module.exports = User;