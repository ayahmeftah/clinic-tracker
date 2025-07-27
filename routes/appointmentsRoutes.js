const Appoint = require('../models/Appointment')
const router = require('express').Router()
const Doctor = require('../models/Doctor')

// list all appointments
router.get('/', async (req, res) => {
    try {
        const allAppoint = await Appoint.find().populate("doctor")
        res.render('Appointment/all-appointments.ejs', { allAppoint })
    } catch (error) {
        console.log(error)
    }
})


// form to create new appointment
router.get('/new', async (req, res) => {
    try {
        const allDoctors = await Doctor.find()
        res.render('Appointment/create.ejs', { allDoctors })
    } catch (error) {
        console.log(error)
    }
})

// create new appointment
router.post('/', async (req, res) => {
    try {
        const newAppointment = await Appoint.create(req.body)
        const foundDoctor = await Doctor.findById(req.body.doctor)
        foundDoctor.appointments.push(newAppointment._id)
        await foundDoctor.save()
        res.redirect('/appointments')
    } catch (error) {
        console.log(error)
    }
})

// show details of one appointment, including its notes
router.get('/:id', async (req, res) => {
    try {
        const foundAppoint = await Appoint.findById(req.params.id).populate("doctor")
        res.render('Appointment/appoint-details.ejs', { foundAppoint })
    } catch (error) {
        console.log(error)
    }
})

// form to edit appointment
router.get('/:id/edit', async (req, res) => {
    try {
        const allDoctors = await Doctor.find()
        const foundAppoint = await Appoint.findById(req.params.id)
        res.render('Appointment/edit-appointment.ejs', { foundAppoint, allDoctors })
    } catch (error) {
        console.log(error)

    }
})

// update appointment
router.put('/:id', async (req, res) => {
    try {
        const foundAppoint = await Appoint.findByIdAndUpdate(req.params.id, req.body)
        res.redirect(`/appointments/${req.params.id}`)
    } catch (error) {
        console.log(error)

    }
})

// delete appointment
router.delete('/:id', async (req, res) => {
    try {
        const deleteAppoint = await Appoint.findByIdAndDelete(req.params.id)
        res.redirect('/appointments')
    } catch (error) {
        console.log(error)
    }
})

// add and display notes
router.post('/:id/notes', async (req, res) => {
    try {
        const foundAppoint = await Appoint.findById(req.params.id)
        foundAppoint.notes.push(req.body)
        await foundAppoint.save()
        res.redirect(`/appointments/${foundAppoint._id}`)
    } catch (error) {
        console.log(error)
    }
})

// delete individual notes
router.post('/:id/notes/delete', async (req, res) => {
    try {
        const foundAppoint = await Appoint.findById(req.params.id)
        const foundNote = req.body.noteId

        for (let i = 0; i < foundAppoint.notes.length; i++) {
            if (foundAppoint.notes[i]._id.toString() === foundNote) {
                foundAppoint.notes.splice(i, 1)
                break
            }
        }
        await foundAppoint.save()
        res.redirect(`/appointments/${foundAppoint._id}`)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router