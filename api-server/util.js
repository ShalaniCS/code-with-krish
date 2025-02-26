function findMin (num1, num2){
    if(isNaN(num1) || isNaN(num2)){
        return{
            status:400,
            data:{
                error:"both parameters should be numbers",
            },
        };
    }
    return{
        status:200,
        data:{
            min: Math.min(num1, num2),
        }
    };
}

function findMax(num1, num2){
    if(isNaN(num1) || isNaN(num2)){
        return{
            status:400,
            data:{
                error: "both parameters should be numbers"
            }
        }
    }
    return{
        status: 200,
        data:{
            max: Math.max(num1, num2),
        }
    };
}

function findAvg(str){
    const charArr = str.split(',');
    let numArr = [];
    let total = 0;
    let avg = 0;
    for(let i=0; i<charArr.length; i++){
        numArr.push(parseFloat(charArr[i]));
    }
    for(let i=0; i<numArr.length; i++){
        if(isNaN(numArr[i])){
            return{
                status: 400,
                data:{
                    error: "enter only numbers"
                }
            };
        }
        total = total + numArr[i];
    }
    avg = total/numArr.length;
    return{
        status:200,
        data:{
            average: avg,
        }
    };
}

module.exports = {
    findMin,
    findMax,
    findAvg
};