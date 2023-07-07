const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        console.log("CONNECTED!!!")
    })
    .catch(err => {
        console.log("SOMETHING WENT WRONG!!!")
        console.log(err);
    })

const result = mongoose.connection.collection('result');

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.get('/predict', (req, res) => {
    result.findOne({}, { sort: { date: -1 } })
        .then((data) => {
            const number = data.index; // Replace with your desired number
            res.json({ number });
        })
        .catch((err) => {
            console.log("Unable to get data from database", err);
        })
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});