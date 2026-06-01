const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://bluehost:BLUEHOST@cluster0.q0i1lix.mongodb.net/Chronicle-exhibits?retryWrites=true&w=majority", {
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log("Connected successfully");
  process.exit(0);
})
.catch(err => {
  console.error("Connection failed:", err.message);
  process.exit(1);
});
