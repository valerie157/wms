const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// schema //
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Add a name"]
    },
    email: {
        type: String,
        required: [true, "Add an email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Enter a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Add a password"],
        minLength: [6, "Password must be 6 characters"],
        maxLength: [255, "Password not be more than 20 characters"]
    },
    photo: {
        type: String,
        default: "https://picsum.photos/200/300"
    },
    phone: {
        type: String,
        default: "+2548969"
    },
    biography: {
        type: String,
        maxLength: [100, "Biography not be more than 100 characters"],
        default: "bio"
    }
},
    {
        timestamps: true,
    }
);

//encrypt password before saving to the db//
userSchema.pre("save", async function(next){

    //hash password//
    
})
const User = mongoose.model("User", userSchema);
module.exports = User;
