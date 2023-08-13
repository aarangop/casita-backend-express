import app, {configureEnv} from "../app";
import mongoose from "mongoose";

configureEnv(process.env.NODE_ENV)

const port = process.env.PORT || 3000

// Connect to database
const dbUri = process.env.DB_URI || "localhost:27127";
mongoose.connect(dbUri).then(r => console.log("Connected to database"))
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});
