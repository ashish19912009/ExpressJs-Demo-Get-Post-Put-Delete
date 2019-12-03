const express = require('express');
const router = express.Router();
const Members = require('../../Members');

// Get All members
router.get('/',(req, res) => {
    res.json(Members);
});

// Get Single member
router.get('/:id', (req, res) => {

const found = Members.some(member => {
    return member.id === parseInt(req.params.id)
}); 
    if(found)
    {
        res.json(Members.filter(member => member.id === parseInt(req.params.id)));
    } else{
        res.status(400).json({msg:'No Entry found !!!'});
    }
});

// Create Member
router.post('/', (req, res)=>{
    const newMember ={
        id:Math.floor(Math.random() * 1000) + 1,
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg:'Please include name and email'});
    } 
    Members.push(newMember);
    res.json(Members);
});

// Update Member
router.put('/:id', (req, res) => {

    const found = Members.some(member => {
        return member.id === parseInt(req.params.id)
    }); 
        if(found)
        {
            const updMember = req.body;
            Members.forEach(member =>{
                if(member.id === parseInt(req.params.id))
                {
                    member.name = updMember.name ? updMember.name : member.name,
                    member.email = updMember.email ? updMember.email : member.email
                    res.json({msg:'Member saved successfully', Members});
                }
            });
        } else{
            res.status(400).json({msg:'No Entry found !!!'});
        }
    });

// Delete Member
router.delete('/:id', (req, res) => {
    
    const found = Members.some(member => {
        return member.id === parseInt(req.params.id)
    }); 
        if(found)
        {
            res.json({msg:'Member Deleted', member: Members.filter(member => member.id !== parseInt(req.params.id))});
        } else{
            res.status(400).json({msg:'No Entry found !!!'});
        }
    });

module.exports = router;