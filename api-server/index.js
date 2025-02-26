const express = require('express');
const {findMin, findMax, findAvg, sortArr, getCount} = require('./util.js');


const app = new express();
const port = 3000;
const greeting = {message: "hello node"}
app.get('/', (req, res)=>{
    const a = 'a';
    const b = 'hhghjg';
    res.json(`print ${a} and & ${b}`)
})


app.get('/numbers/min', (req, res)=>{
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    // if(num1<num2){
    //     console.log(num1);
    // }
    // else{
    //     console.log(num2);
    // }
    // if((isNaN(num1) || isNaN(num2))){
    //     res.json({message: "not a number"})
    //     console.log(num1)
    //     console.log("================hit");
    // }else{
    //     res.json({min:num1>num2?num2:num1});
    // }

    const result = findMin(num1, num2);
    res.status(result.status).json(result.data)
    
});

app.get('/numbers/max', (req, res)=>{
    console.log("jkjjkl")
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const result = findMax(num1, num2);
    res.status(result.status).json(result.data)
});

app.get('/numberss/avg', (req, res)=>{
    const result = findAvg(req.query.numbers);
    res.status(result.status).json(result.data);
})

app.get('/numberss/sort', (req, res)=>{
    const result = sortArr(req.query.numbers, req.query.type);
    res.status(result.status).json(result.data);
})

app.get('/numberss/count', (req, res)=>{
    const result = getCount(req.query.numbers, req.query.search);
    res.status(result.status).json(result.data);
})

app.listen(port, ()=>{
    console.log(`server running on ${port}`);
});