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
        required: true,
    },
    department:{
        ref: "Department",
        type: Schema.Types.ObjectId,
    },
    tires:[{
        ref: "Tire",
        type: Schema.Types.ObjectId,
    }],
    clients:[{
        ref: "Client",
        type: Schema.Types.ObjectId,
    }],
},{
    timestamps: true
})

export default model ('User' , userSchema);