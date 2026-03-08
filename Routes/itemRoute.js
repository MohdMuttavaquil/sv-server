import express from 'express'
import { categoryItems, getItems, homeSuggestion, itemById, trendingItems } from '../Controller/iitemsController.js'

const itemRoute = express.Router()

itemRoute.get('/allItems', getItems)
itemRoute.post('/category', categoryItems)
itemRoute.get('/trending', trendingItems)
itemRoute.get('/:id', itemById)
itemRoute.post('/suggestion', homeSuggestion)

export default itemRoute