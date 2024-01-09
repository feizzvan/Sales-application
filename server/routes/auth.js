const express = require('express');
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const authRouter = express.Router();
const jwt = require('jsonwebtoken');

//Sử dụng phương thức post để xử lý yêu cầu đăng ký từ phía người dùng
authRouter.post("/api/signup", async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ msg : "Email này đã tồn tại trong hệ thống!"});
        }
        const hashedPassword = await bcryptjs.hash(password, 8);

        let user = new User({
            email,
            password: hashedPassword,
            name,
        })
        user = await user.save();
        res.json(user);
    } catch(e){
        res.status(500).json({error: e.message});
    }
});

//Đăng nhập
authRouter.post('/api/signin', async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.status.json({msg: "Người dùng với email này không tồn tại!"});
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch) {
            return res.status.json({msg: "Mật khẩu không đúng!"});
        }

        const token = jwt.sign({id: user._id}, "passwordKey");
        res.json({token, ...user._doc });

    } catch(e) {
        res.status(500).json({error: e.message});
    }
});

module.exports = authRouter;