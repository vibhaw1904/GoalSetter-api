const asyncHandler=require('express-async-handler')
const Goal=require('../model/goalModel')
const User=require('../model/userModel')
//@desc getGoals
//@route GET/api/goals
//@access private
const getGoals=asyncHandler(async(req,res)=>{
    const goals=await Goal.find({user:req.user.id})
    res.status(200).json(goals)
})
//@desc setGoals
//@route POST/api/goals
//@access private
const setGoals=asyncHandler(async(req,res)=>{

    if(!req.body.text){
        res.status(400)
        throw new Error('please add the text filed')
    }
    const goals=await Goal.create({
        text:req.body.text,
        user:req.user.id
    })
    res.status(200).json(goals)
})
//@desc updateGoals
//@route PUT/api/goals
//@access private
const updateGoals=asyncHandler( async(req,res)=>{
    const goals=Goal.findById(req.params.id);
  const user=await User.findById(req.user.id);
  if(!user){
    res.status(401)
    throw new Error('user not found')
  }
  if(goals.user.toString()!==user.id){
    res.status(401)
    throw new Error('not Authrized')
  }
    if(!goals){
        res.status(400)
        throw new Error('no goals found')
        
    }
    const updateGoals=await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    })


    res.status(200).json(updateGoals )
})
//@desc deleteGoals
//@route delte/api/goals
//@access private
const deleteGoals=asyncHandler( async(req,res)=>{
    // res.status(200).json({message:`delete goals ${req.params.id}`})
    const goals=await Goal.findByIdAndDelete(req.params.id);
    if(!goals){
        res.status(400)
        throw new Error('invalid id')
    }
    // await goals.delete()
    const user=await User.findById(req.user.id);
  if(!user){
    res.status(401)
    throw new Error('user not found')
  }
  if(goals.user.toString()!==user.id){
    res.status(401)
    throw new Error('not Authrized')
  }

    
    return res.json({ id:req.params.id });
})
module.exports={
    getGoals,setGoals,deleteGoals,updateGoals
}

