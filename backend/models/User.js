import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
       type: String,
       required: true,
       Unique: true 
    },
    fullName: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        Unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
    },
    followers: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    following: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    profileImg: {
        type: String,
        default: "",

    },
    bio:{
        type: String,
        default: "",
    },
    link: {
        type: String,
        default: "",
    },
    likedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            default: [],
        }
    ]



    
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User