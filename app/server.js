// Server entry point
require('dotenv').config();
const connectDB = require("../app/config/db");
const app = require("./app");

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})