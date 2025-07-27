const Doctor = require('../models/Doctor')
const router = require('express').Router()
const Appoint = require('../models/Appointment')

// list all doctors
router.get('/', async (req, res)=>{
    try {
        const allDoctors = await Doctor.find()
        res.render('Doctor/all-doctors.ejs',{allDoctors})
    } catch (error) {
        console.log(error)
    }
})

// form to add a new doctor
router.get('/new', async (req, res)=>{
    try {
        res.render('Doctor/create.ejs')
    } catch (error) {
        console.log(error)
    }
})

// create a new doctor
router.post('/', async (req, res)=>{
    try {
        const newDoctor = await Doctor.create(req.body)
        res.redirect('/doctors')
    } catch (error) {
        console.log(error)
    }
})

// show doctor details with all their appointments
router.get('/:id', async (req, res)=>{
    try {
        const foundDoctor = await Doctor.findById(req.params.id).populate("appointments")
        res.render('Doctor/doctor-details.ejs',{foundDoctor})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router