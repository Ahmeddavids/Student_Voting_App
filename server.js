require('./config/dbConfig');
const cors = require('cors');
const morgan = require("morgan");
const express = require('express');
const PORT = process.env.PORT || 2020;
const candidateRouter = require('./routers/candidateRoutes');
const userRouter = require('./routers/userRouter')

const app = express();
app.use(cors({origin: "*"}));

app.use(morgan("dev"))
app.use(express.json());
app.use('/candidate', candidateRouter)
app.use('/api', userRouter)

app.listen(PORT, () => {
    console.log(`Server is listening to PORT: ${PORT}`);
})