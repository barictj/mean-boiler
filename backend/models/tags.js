const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Tags = new Schema({
    name: {
        type: String,
        default: 'No TagName'
    },
}
)

module.exports = mongoose.model('Tags', Tags);
