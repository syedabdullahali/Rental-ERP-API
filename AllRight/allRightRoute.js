const express = require('express')
const router = express.Router()
//modelName
const allRightModule = require('../AllRight/allRightModule')
const signupModule = require('../Models/User')

router.get('/all', async function (req, res) {
    try {
        const map = new Map()
        const arr = []

        const response = await  allRightModule.find()
        const response2 = await signupModule.find()

        response.forEach((el)=>{
            if(!el.emailUniqId){return}
            if(!map.has(el.emailUniqId)){
                    map.set(el.emailUniqId,el)
            }
           })
          response2.forEach((el)=>{
             if(!el._id ||el.isAdmin){return}
             if(!map.has(el._id)){
                    map.set(el._id,el)
            }
           })   

           map.forEach((el)=>{
                arr.push(el)
           })

        return res.status(200).json(arr);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.get('/:id', async function (req, res) {
    try {
        const response = await allRightModule.findById({ _id: req.params.id })
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

router.get('/rights/:emailUniqId', async function (req, res) {
    try {
        const response = await allRightModule.findOne({emailUniqId: req.params.emailUniqId })
        if (!response){
             const response1 = await  signupModule.findById({ _id: req.params.emailUniqId })
             return res.status(200).json({message:'Not found',data:response1});
        }else{
            return res.status(200).json( {message:'Successfull received',data:response});
        }
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.post('/create', async (req, res) => {
    try {
        const temp = await new allRightModule(req.body)
        const response = await temp.save();
        return res.status(200).json(response);
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ error: err })
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const response = await allRightModule.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await allRightModule.findByIdAndDelete(req.params.id);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

module.exports = router
