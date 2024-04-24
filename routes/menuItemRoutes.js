const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


router.post('/', async (req, res) => {
    try {
        const data = req.body

        const newItem = new MenuItem(data);

        const newMenuItem = await newItem.save();
        console.log('New Item Saved in the server.');
        res.status(200).json(newMenuItem);
    } catch (err) {
        console.log('Chimabu naya item save garda error falyo. Error yo ho :', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('Naya item Vetyo Mampakha.');
        res.status(200).json(data);
    } catch (err) {
        console.log("Mampakha vetenw Yo error falyo :", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/:tasteType', async (req, res) => {
    try{
        const tasteType = req.params.tasteType;
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
            const response = await MenuItem.find({taste: tasteType});
            console.log ('response fetched');
            res.status(200).json(response);
        }else {
            console.log(' Yo taste vako khana xainna hami sanga');
            res.status(404).json({error: 'Invalid taste type'})
        }
    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async (req, res) => {
    try{
        const menuItemId = req.params.id;
        const updateMenuItem = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuItemId, updateMenuItem, {
            new: true,
            runValidators: true 
        })
        
        if(!response){
            return res.status(404).json({error: 'MenuItem Not Found.'})
        }

        console.log('Menu Item data updated');
        res.status(200).json(response);
    }catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const menuItemId = req.params.id;

        const response = await MenuItem.findByIdAndDelete(menuItemId);
        if(!response) {
            return res.status(404).json({error: 'Menu Item not found.'})
        }
        console.log('data deleted');
        res.status(200).json({message: 'Menu Item Deleted Successfully'})
    }catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;