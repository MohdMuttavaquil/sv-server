import mongoose from "mongoose";

const dbConnaction = ()=>{ 
  mongoose.connect(process.env.DB_CONNACTION).then(()=>{
  console.log("DB Connected")
})
}

export default dbConnaction