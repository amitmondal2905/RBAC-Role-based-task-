const express = require('express');
const cors = require("cors");
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const compression = require('compression');//100kb to 50kb
// Compression is a performance middleware. It automatically "zips" (shrinks) the data your server sends to the user's browser or Postman.
// Without compression: If your task list is 100KB, the server sends 100KB.
// With compression: The server shrinks it to maybe 20KB, and the browser "unzips" it instantly.
// It makes your API much faster, especially for users with slow internet. It's a standard feature in production apps.
const rateLimit = require('express-rate-limit')
const authRoutes = require('./routes/authRoutes')
const roleRoutes = require('./routes/roleRoutes')
const taskRoutes = require('./routes/taskRoutes')
const userRoutes = require('./routes/userRoutes')
const errorMiddleware = require("./middlewares/errorMiddleware")


const app = express();

app.use(helmet())
app.use(cors())

app.use(morgan('dev'))
app.use(compression())

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

const limiter = rateLimit({
    windowMs: 15 *60 *1000,
    max: 100
})

app.use('/api', limiter);
app.use('/api/auth', authRoutes)
app.use('/api/roles', roleRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)
app.use(errorMiddleware)



app.get('/', (req, res) => {
    res.json({ message: "Welcome to RBAC assignment System API"})
})




module.exports = app;
