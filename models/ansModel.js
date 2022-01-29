const mongoose=require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const answerSchema=new mongoose.Schema({

    answeredBy:{
        type:objectId,
        ref:"myUserQuora",
        required:true
    },
    questionId:{
        type:objectId,
        ref:"myQuesQuora",
        required:true
    },
    text:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
    
},{timestamps:true})

module.exports=mongoose.model("myAnswerQuora",answerSchema)