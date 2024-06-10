import {model, Schema} from 'mongoose'

const tireSchema = new Schema({
    user: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true,
    },
    linea:{
        type: Number,
        // required: true,
    }, 
    itemCode:{
        type: String,
        required: true,
    },
    barCode:{
        type: String,
        // required: true,
    },
    helmetMeasurement:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    helmetDesign:{
        type: String,
        required: true,
    },
    requiredBand:{
        type: String,
        required: true,
    },
    antiquityDot:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        // required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
},{
    timestamps: true,
});

export default model ('Tire' , tireSchema);