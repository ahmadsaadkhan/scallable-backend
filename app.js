const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
dotenv.config();

const app = express();
// require('./config/db');

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.use('/', (req, res) => {
    res.send(`App is running on port ${PORT}`);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
