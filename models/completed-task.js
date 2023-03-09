const mongoose = require('mongoose');

const completedSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
});

const Completed = mongoose.model('completed', completedSchema);

module.exports = Completed;
