const mongoose=require('mongoose')
const GoalSchema=mongoose.Schema(
    {   
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'

    },
        text:{
            type:String,
            required:[true,'please add a text value']
        },
    },
    {
        TimeStamps:true,
    }
)
module.exports=mongoose.model('Goal',GoalSchema)