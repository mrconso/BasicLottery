import { setElementValue, setWarning } from "./util.js"

//Keep track of my picks
let myNumbers = [];
let myResults = [];



// The amount of numbers that can be picked
const pickAmount = 6;
const inputIDs = ['PickOne', 'PickTwo','PickThree','PickFour','PickFive', 'PickSix'];
const resultIDs = ['ResultOne', 'ResultTwo','ResultThree','ResultFour','ResultFive', 'ResultSix'];

////////////////////////////
///        Buttons       ///
////////////////////////////
const btnStart = document.getElementById('btnStart');
btnStart.addEventListener('click', function(){
    clearNumberArr()
    play();
    console.log("Draw")
    console.log("My Numbers: " + myNumbers);
    console.log("Results: " + myResults)
});

const btnReset = document.getElementById('btnReset');
btnReset.addEventListener('click', function(){
    resetPicks();
    console.log("Reset");
    console.log(myNumbers);
});

const btnLD = document.getElementById('btnLD');
btnLD.addEventListener('click', function(){
    clearNumberArr()
    setRandomPicks(false);
    setRandomPicks(true);
    console.log("Lucky Dip")
    console.log("My Numbers: " + myNumbers);
    console.log("Results: " + myResults)
});
////////////////////////////
///        Start         ///
////////////////////////////
function play()
{
    let valid = errorCheck();
    if (valid)
    {
        setRandomPicks(true);
    }
    else { clearNumberArr(); }
};

function errorCheck()
{
    let valid = true;
    inputIDs.forEach(id => {
        try
        {
            if (parseInt(document.getElementById(id).value))
            {
                myNumbers.push(parseInt(document.getElementById(id).value));
            }
        }
        catch (error)
        {
            console.log("Not a valid number");
        }
    });

    if (myNumbers.length !== pickAmount)
    {
        valid = false;
        setWarning("amount");
        return;
    }
    for (let i = 0; i < myNumbers.length; i++)
    {
        if (myNumbers[i] > 59 || myNumbers[i] < 1)
        {
            valid = false;
            setWarning("value");
            return;
        }
    }
    return valid;
}

////////////////////////////
///        Reset         ///
////////////////////////////
function resetPicks(){
    setWarning("default");
    clearNumberArr();

    inputIDs.forEach(id => {
        setElementValue(id, "");
    });

    resultIDs.forEach(id => {
        setElementValue(id, "");
    });
};

////////////////////////////
///       Lucky Dip      ///
////////////////////////////
function setRandomPicks(results){
    let arr = results ? resultIDs : inputIDs;
    for (let i = 0; i < arr.length; i++)
    {
        let rand = Math.floor((Math.random() * 59) + 1);
        setElementValue(arr[i], rand);
        results ? myResults.push(rand) : myNumbers.push(rand);

    };
};

function clearNumberArr()
{
    myNumbers = [];
    myResults = [];
}