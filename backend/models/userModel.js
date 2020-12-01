import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name:{type: String, required: true},
        email:{type: String, required: true, unique: true},
        password:{type: String, required: true},
        isAdmin:{type: Boolean, default: false, required: true},
        isSeller: { type: Boolean, default:false }
    },
    {
        timestamps: true
    }
);

// User colletion in MongoDB -> function with 2 input (modelname, schema)
const User = mongoose.model("User", userSchema);
export default User;