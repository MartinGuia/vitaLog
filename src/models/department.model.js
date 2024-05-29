import { model, Schema } from 'mongoose'

const departmentSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    user:[{
        ref: "User",
        type: Schema.Types.ObjectId,
    }],
})

export default model ('Department' , departmentSchema);