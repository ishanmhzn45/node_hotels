const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

router.post('/signup', async (req, res) => {
    try {
        const data = req.body //assuming the request body contains person data  

        //Create a new Person docmenuItemument using the Mongoose Model
        const newPerson = new Person(data);

        //Save the new person to  the database
        const response = await newPerson.save();
        console.log('Data Saved');

        const payload= {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));

        const token = generateToken(payload);
        console.log("Token is:", token);

        res.status(200).json({response: response, token: token});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
})

// Login Route
router.post('/login', async(req, res) => {
    try{
        // Extract username and password fromm the body
        const{username, password} = req.body;
        
        // Find the user by username
        const user = await Person.findOne({username: username});

        // If suer doesnot exist
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate token 
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // return token as response 
        res.json({token});
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
});

// Profile route 
router.get('/profile', jwtAuthMiddleware, async(req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
})

// Get method to get the person data
router.get('/',jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data Fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log('mampakha error');
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/:id', async (req, res) => {
    try{
        const  personId = req.params.id;
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true,  //Return the updated data or document
            runValidators: true
        })

        if(!response) {
            return res.status(404).json({error: 'Person not found.'})
        }

        console.log('Person data updated');
        res.status(200).json(response)
    }catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if(!response) {
            return res.status(404).json({error: 'Person not found.'})
        }
        console.log('data deleted');
        res.status(200).json({message: 'Person Deleted Successfully'})

    }catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router;