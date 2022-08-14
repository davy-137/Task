const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./Models/product');

const cors = require('cors')
app.use(cors());
app.use(express.json());

app.get('/',async (req,res)=>{
    try{
        const productsList = await Product.find();
        res.json(productsList);
    } catch(err){
        res.json(err);
    }
})


app.post('/',async (req,res)=>{
    try{
        await Product.create(req.body);
        res.status(201).json({"message": "Resource Successfully Created"});
    } catch(err){
        res.json(err);
    }
});
mongoose.connect('mongodb+srv://davy_137:Davy123@cluster0.jlo5sxo.mongodb.net/?retryWrites=true&w=majority',()=>{
    console.log('connected to mongodb');
    app.listen(4000,() => {
        console.log('Listening on port 4000');
    })
});
