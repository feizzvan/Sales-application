//Imports from packages
const express = require('express'); 
const mongoose = require('mongoose');
//Imports from other files
const authRouter = require("./routes/auth");

//Init
const PORT = 3000;
const app = express();
const DB ="mongodb+srv://feizzvan:nhung1905@cluster0.vw8kwln.mongodb.net/?retryWrites=true&w=majority";

//middleware: phần mềm trung gian
app.use(express.json());
app.use(authRouter);

//Connections
mongoose.connect(DB).then(() => {
    console.log('Kết nối thành công!');
}).catch(e => {
    console.log(e);
});

//localhost
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Được kết nối tại cổng ${PORT}`);
});
