const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        trim: true
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 64,
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSession: {}
},
    {timestamps: true}
);

userSchema.pre('save', function(next){
    let user = this;
    if(user.isModified('password')) {
        return bcrypt.hash(user.password, 16, function(err, hash){
            if(err) {
                console.log(err);
                return next(err);
            }
            user.password = hash;
            return next()
        })
    } else {
        return next()
    }
})

module.exports = mongoose.model('User', userSchema)