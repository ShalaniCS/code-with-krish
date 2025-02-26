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

function sortArr(str, order){
    const charArr = str.split(',');
    let numArr = [];
    for(let i=0; i<charArr.length; i++){
        numArr.push(parseFloat(charArr[i]));
    }
    for(let i=0; i<numArr.length; i++){
        if(isNaN(numArr[i])){
            return{
                status: 400,
                data:{
                    error: "enter only numberss"
                }
            };
        }
    }
    if(!(order=="asc" || order =="dec")){
        return{
            status: 400,
            data:{
                error: "enter asc or dec"
            }
        };
    }
    if(order == "asc"){
        numArr.sort((a,b)=>(a-b));
    }
    if(order == "dec"){
        numArr.sort((a,b)=>(b-a));
    }
    return {
        status: 200,
        data:{
            sortedArray : numArr
        }
    };
}

function getCount(str, element){
    const arr = str.split(',');
    let count = 0;
    for(let i=0; i<arr.length; i++){
        if(arr[i] == element){
            count = count + 1;
        }
    }
    return{
        status: 200,
        data:{
            element_count: count
        }
    }
}

module.exports = {
    findMin,
    findMax,
    findAvg, 
    sortArr,
    getCount
};