const warningMap = new Map();
warningMap['default'] = "Pick some numbers between 1 and 59."
warningMap['amount'] = "You must fill every box with a number."
warningMap['value'] = "All values must be between 1-59."
warningMap['duplicate'] = "All values must be unique."

function setElementValue(id, val)
{
    const element = document.getElementById(id);
    element.value = val;
};

function setWarning(text){
    document.getElementById('warning').textContent = warningMap[text];
};

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { setElementValue, setWarning, sleep }