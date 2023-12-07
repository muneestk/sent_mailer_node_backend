import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    companyEmail:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    }
})

const mailSenter = mongoose.model('mailSenter',emailSchema)
export default mailSenter