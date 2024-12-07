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
    tires:[{
        ref: "Tire",
        type: Schema.Types.ObjectId,
    }],
    // clients:[{
    //     ref: "Client",
    //     type: Schema.Types.ObjectId,
    // }],
    workOrders:[{
        ref: "WorkOrder",
        type: Schema.Types.ObjectId,
    }],
},{
    timestamps: true
})

export default model ('User' , userSchema);