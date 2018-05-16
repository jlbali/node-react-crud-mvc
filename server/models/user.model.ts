import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true}, // Se guarda encriptado..
    email: {type: String},
    id_role: mongoose.Schema.Types.ObjectId,
});


UserSchema.pre('save', async function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt y hashear
    try {
        var salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        var hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch(err){
        throw Error("Error en preSave de User: " + err);
    }
});


// No esta andando, no lo levanta el user.
UserSchema.methods.comparePasswords = async function(candidatePassword) {
    var user = this;
    try {
        var isMatch = await bcrypt.compare(candidatePassword, user.password);
        return isMatch;
    } catch(err){
        console.log("Compare Password error: ", err);
        throw Error("Error en ComparePassword: " + err);
    }
};


const User = mongoose.model('User', UserSchema);




export default User;

/*
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
*/

