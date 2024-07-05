const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const CashIn = require('./models/CashIn')
const CashOut = require('./models/CashOut')
const EmployeeModel = require('./models/User')
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/cashbook")

app.post('/login',async(req,res)=>{
    const{email,password} = req.body;
    const a = await EmployeeModel.findOne({email:email})
    console.log(a);
    if(a){
        if(password == a.password){
            res.status(200).json({message:"Success"})
        }
        else{
            res.status(200).json({message:"The password incorrect"})
        }
    }
})

app.post('/register', async(req, res) => {
    console.log(req.body)
    const x= new  EmployeeModel(req.body)
    await x.save()
    res.send(x)
});

app.post('/users',async(req,res)=>{
    try{
        const {email} = req.body;
        const users = await EmployeeModel.findOne({email :email});
        res.json(users);
    }
    catch(e)
    {
        res.json(e);
    }


})
//cashin routes
app.post('/cashin',(req,res)=>{
    CashIn.create(req.body)
    .then(cashin => res.json(cashin))
    .catch(err=>res.json(err))

})
app.get('/cashin', (req, res) => {
    CashIn.find()
      .then(cashin => res.json(cashin))
      .catch(err => res.json(err));
  });
  
  app.delete('/cashin/:id', (req, res) => {
    CashIn.findByIdAndDelete(req.params.id)
      .then(() => res.json({ message: 'Transaction deleted successfully' }))
      .catch(err => res.json(err));
  });

//chashout routes
app.post('/cashout', (req, res) => {
    CashOut.create(req.body)
    .then(cashout => res.json(cashout))
    .catch(err => res.json(err));
});

app.get('/checkout', (req, res) => {
    CashOut.find()
      .then(checkout => res.json(checkout))
      .catch(err => res.json(err));
  });
  
  app.delete('/checkout/:id', (req, res) => {
    CashOut.findByIdAndDelete(req.params.id)
      .then(() => res.json({ message: 'Transaction deleted successfully' }))
      .catch(err => res.json(err));
  });

  app.get('/transactions', async (req, res) => {
    try {
        const cashIns = await CashIn.find();
        const cashOuts = await CashOut.find();
        res.json([...cashIns, ...cashOuts]);
    } catch (err) {
        res.status(500).json(err);
    }
});

  
app.listen(3001,()=>{
    console.log("server is running")
})