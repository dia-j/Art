import mongoose from "mongoose";

const artSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, default: ''},
})

const artModel = mongoose.models.art || mongoose.model("Art", artSchema);

export default artModel;
