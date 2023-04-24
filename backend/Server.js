const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors");
const TodoRouter = require("./routes/TodoRouter");


const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('connected to database ');
  })
  .catch((error) => {
    console.log('error connecting database ');
    console.log(error.message);
  });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Started Succcesfully');
  });

app.use("/Todo",TodoRouter);
  

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
})