import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            unique: true,
            default: () => new mongoose.Types.ObjectId().toString(), 
        },
        phone: {
            type: String,
            require: true,
            unique: true,
        },
        name: {
            type: String,
            require: true
        },
        point: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    });
export default mongoose.model("Product", ProductSchema);