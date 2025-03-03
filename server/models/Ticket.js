const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'closed'],
        default: 'pending'
    },
    remark: {
        type: String, // Paragraph string
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date // New field to track updates
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);
