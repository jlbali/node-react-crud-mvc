import * as mongoose from 'mongoose';


var RoleSchema = new mongoose.Schema({
    title: String,
    isAdmin: Boolean,
});

const Role = mongoose.model('Role', RoleSchema);

export default Role;
