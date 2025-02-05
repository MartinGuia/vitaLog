import app  from "./app.js";
import { connectDB } from "./db.js";
// import "dotenv/config";

connectDB();
// app.listen(process.env.PORT || 4000);
// console.log(`Server listening on port ${process.env.PORT}`);
app.listen(4000);
console.log('Server on port 4000');