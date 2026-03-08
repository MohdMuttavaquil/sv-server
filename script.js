import express from 'express'
import "dotenv/config"
import dbConnaction from './Config/dbConfig.js'
import userRoute from './Routes/userRoute.js'
import productRoute from './Routes/productRoute.js'
import itemRoute from './Routes/itemRoute.js'
import cors from 'cors'
import orderRoute from './Routes/orderRoute.js'
import cartRoute from './Routes/cartRoute.js'

const app = express()
app.use(cors({
  allowedHeaders: ["Content-Type", "token"]
}))


app.use(express.json())
const PORT = 3000

// Db connaction 
dbConnaction()

//Routes  
app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
app.use('/api/items', itemRoute)
app.use('/api/order', orderRoute)
app.use('/api/cart', cartRoute)


app.get('/', (req, res)=>{
   res.send("Servier is running ")
})

app.listen(PORT, ()=>{
    console.log(`servrer is running on ${PORT}`)
})