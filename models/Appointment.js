const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    content: String
})

const appointSchema = new mongoose.Schema({
    patientName: String,
    date: Date,
    reason: String,
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    notes: [notesSchema]

})

const Appointment = mongoose.model('Appointment', appointSchema)

module.exports = Appointment