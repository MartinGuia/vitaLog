import {model, Schema} from 'mongoose'

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        min: 6,
        required: true,
    },
    department:{
        ref: "Department",
        type: Schema.Types.ObjectId,
        required: false,
    },
},{
    timestamps: true
})

export default model ('User' , userSchema);