const { response, request } = require('express')
const { Router } = require('express')
const router = Router();

const Stock = require('../models/stock')
const Product = require('../models/product')


const stockCtrl = {}

stockCtrl.getAllStock = async (req = request, res = response) => {
    const { limit = 5, from = 0} = req.query;
    const query = {estado: true}

    const [allProduct, product] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'firstName')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        allProduct,
        product
    })


}

stockCtrl.getStock = async (req = request, res = response) => {

    const { id } = req.params;
    const product = await Product.findById( id ).populate('user', 'firstName').populate('category', 'name')


    res.json(product);

}

stockCtrl.createrStock = async (req = request, res = response) => {
    const { estado, user, product, ...body } = req.body;

    const StockDB = await Stock.findOne({name: body.name})

    if( StockDB ) {
        return res.status(400).json({
            msg: `La stock ${StockDB.name}, ya existe`
        })
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id,
        product: req.product._id,

    }

    const stock = new Stock(data)

    await stock.save();

    res.status(201).json(stock)




}

stockCtrl.updateStock = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, user, product,...data } = req.body;

    if ( data.name ) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const stock = await Stock.findByIdAndUpdate(id, data, { new: true })

    res.json(product);

}


stockCtrl.deletedStock = async (req = request, res = response) => {

    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, {estado: false}, {new: true})

    res.json(product);

}

module.exports = stockCtrl