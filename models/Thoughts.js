const mongoose = require('mongoose');
const { schema } = mongoose;

const reactionSchema = new schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now, get: createdAtVal => createdAtVal.toISOString()
    }
}, {
    toJSON: { getters: true }
});
const thoughtSchema = new Schema({
    thoughtText:
    {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => createdAtVal.toISOString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    toObject: {
        virtuals: true
    }
});
// create virtual reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//create Thought model using thoughtSchema
const Thought = mongoose.model('Thought', thoughtSchema);

//export Thought
module.exports = Thought;