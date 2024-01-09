//import thư viện mongoose
const mongoose = require('mongoose');

const userChema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message: 'Hãy nhập đúng định dạng địa chỉ email!'
        },
    },
    password: {
        required: true, 
        type: String,
    },
    address: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "user",
    },
    //card
})
//Tạo model User để thao tác với csdl
const User = mongoose.model('User', userChema);
//Xuất model User để có thể sử dụng nó trong các file khác của ứng dụng
module.exports = User;