const express = require('express');

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
    if((isNaN(num1) || isNaN(num2))){
        res.json({message: "not a number"})
        console.log(num1)
        console.log("================hit");
    }else{
        res.json({min:num1>num2?num2:num1});
    }
    
});

app.listen(port, ()=>{
    console.log(`server running on ${port}`);
});