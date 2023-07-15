const warningMap = new Map();
warningMap['default'] = "Pick some numbers between 1 and 59."
warningMap['amount'] = "You must fill every box with a number."
warningMap['value'] = "The values are incorrect."

function setElementValue(id, val)
{
    const element = document.getElementById(id);
    element.value = val;
};

function setWarning(text){
    document.getElementById('warning').textContent = warningMap[text];
};

export { setElementValue, setWarning }