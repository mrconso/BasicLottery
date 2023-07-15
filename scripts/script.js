import { setElementValue, setWarning, sleep } from "./util.js"

//Keep track of my picks
let myNumbers = [];
let myResults = [];

// The amount of numbers that can be picked
const pickAmount = 6;
const inputIDs = ['PickOne', 'PickTwo','PickThree','PickFour','PickFive', 'PickSix'];
const resultIDs = ['ResultOne', 'ResultTwo','ResultThree','ResultFour','ResultFive', 'ResultSix'];
const loseMessages = ["Better Luck Next Time!", "Nice Try!", "Ooh So Close!"];
const prizes = [0, 0, 0, 50, 100, 200, 300];

////////////////////////////
///        Buttons       ///
////////////////////////////
const btnStart = document.getElementById('btnStart');
btnStart.addEventListener('click', async function(){
    clearNumberArr()
    await play();
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
btnLD.addEventListener('click', async function(){
    clearNumberArr()
    setRandomPicks(false);
    await suspense();
    setRandomPicks(true);
    evaluateWin();
    console.log("Lucky Dip")
    console.log("My Numbers: " + myNumbers);
    console.log("Results: " + myResults)
});

const btnWin = document.getElementById('btnWin');
btnWin.addEventListener('click', async function(){
    clearNumberArr()
    let valid = errorCheck();
    if (valid)
    {
        setFixedResults();
        evaluateWin();
    }
});
////////////////////////////
///        Start         ///
////////////////////////////
async function play()
{
    let valid = errorCheck();
    if (valid)
    {
        await suspense();
        setRandomPicks(true);
        evaluateWin();
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

async function suspense() {
    let timer = 10;
    while (timer > 0)
    {
        resultIDs.forEach(id => {
                let rand = Math.floor((Math.random() * 59) + 1);
                setElementValue(id, rand);
            });
        await sleep(200);
        timer--;
    };
};

function evaluateWin()
{
    //Could use indexOf(number) !== -1 if includes not supported
    let matches = myNumbers.filter(number => myResults.includes(number));
    console.log("Matches: " + matches);

    let prize = prizes[matches.length];
    if (prize > 0){
        document.getElementById("prize").textContent = "You have won " +  prize;
    }
    else
    {
        document.getElementById("prize").textContent = loseMessages[matches.length];
    }

    let matchText =

    document.getElementById("matches").textContent = matches.length == 1 ? matches.length + " Match" : matches.length + " Matches";

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
    document.getElementById("prize").textContent = "Are ya feeling lucky?";
    document.getElementById("matches").textContent = "";
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

////////////////////////////
///       Win Test      ///
////////////////////////////
function setFixedResults(results){
    let arr = resultIDs;
    for (let i = 0; i < arr.length; i++)
    {
        setElementValue(arr[i], i+1);
        myResults.push(i+1);
    };
};

function clearNumberArr()
{
    myNumbers = [];
    myResults = [];
}