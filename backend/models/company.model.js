import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true

    },
    description:{
        type:String,
        

    },
    website:{
        type:String,
       

    },
    location:{
        type:String,
       

    },
    logo:{
        type:String, //url of logo

    },
    userId:{
        type:String,
        ref:'User',
        required:true,
    }
    
   



},{timestamps:true});

export const Company = mongoose.model('Company',companySchema);