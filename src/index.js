import express from "express";
import {connect} from "./config/database.js"
import apiRoutes from "./routes/index.js"
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use("/api", apiRoutes )


const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connect();
  console.log("Mongo db connected");
  
});
