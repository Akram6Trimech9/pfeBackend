const mongoose = require('mongoose');

var rdvSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['accepted', 'refused', 'pending'],  
        default: 'pending'  
    },
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    legalForm: {
        type: String,
        required: true
    },
    employees: {
        type: String,
        required: true
    },
    salesInvoices: {
        type: String,
        required: true
    },
    purchaseInvoices: {
        type: String,
        required: true
    },
    turnover: {
        type: String,
        required: true
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Rdv', rdvSchema);