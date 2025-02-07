import app  from "./app.js";
import { connectDB } from "./db.js";
import 'dotenv/config'

connectDB();
app.listen(process.env.REACT_APP_PORT)
console.log(`Serving on ${process.env.REACT_APP_PORT}`)
// app.listen(4000);
// console.log('Server on port 4000');