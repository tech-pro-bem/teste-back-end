const router = require('express').Router();

const Volunteers = require('../controllers/Volunteers');

router.post('/',async(req, res) => {
    const {name, age} = req.body

    if(!name || !age){
        return res.status(422).json({error: "Name and age are required"});
    }

    const volunteer = {
        name,
        age
    }

    try {
        await Volunteers.create(volunteer);

        res.status(201).json({message: 'Volunteer created successfully'});
    } catch (error) {
        res.status(500).json({error: error});
    }

});

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        
        const volunteer = await Volunteers.findById(id);

        if(!volunteer){
            return res.status(422).json({error: "Volunteer not found"});
        }

        res.status(200).json(volunteer);
    } catch (error) {
        res.status(500).json({error: error});
    }

});

router.put('/:id', async (req, res) => {
    const {id} = req.params;

    const {name, age} = req.body;

    const volunteer = {
        name,
        age
    }

    try {
        
        const foundVolunteer = await Volunteers.findByIdAndUpdate(id, volunteer);
        

        if(!foundVolunteer){
            return res.status(422).json({error: "Volunteer not found, could not update"});
        }

        

        res.status(200).json(volunteer);

    } catch (error) {
        return res.status(422).json({error: error});
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const volunteer = await Volunteers.findByIdAndDelete(id);

        if (!volunteer){
            return res.status(422).json({error: "Volunteer not found, could not delete"});
        }

        res.status(200).json({message: `Volunteer ${volunteer.name} deleted successfully`});
    } catch (error) {
        res.status(422).json({error: error});
    }
});

module.exports = router