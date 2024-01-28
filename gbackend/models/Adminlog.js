const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminLogSchema = Schema({
    // Define fields for adminlog schema
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    // Add other fields as needed
}); // Specify the collection name if needed

const AdminLog = mongoose.model('adminLog', AdminLogSchema);

module.exports = AdminLog;
