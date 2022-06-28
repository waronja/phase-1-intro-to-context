// Your code here
function createEmployeeRecord(employeeArray) {
    let testEmployee = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return testEmployee;
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
}

const getHour = function(dateTime) {
    return parseInt(dateTime.match(/\d{4}$/)[0])
}

const getDate = function(dateTime) {
    return dateTime.match(/\d{4}-\d{2}-\d{2}/)[0]
}

function createTimeInEvent(employeeObject, timeIn) {
    employeeObject.timeInEvents.push({
        type: "TimeIn",
        date: getDate(timeIn),
        hour: getHour(timeIn)
    })
    return employeeObject;
}

function createTimeOutEvent(employeeObject, timeOut) {
    employeeObject.timeOutEvents.push({
        type: "TimeOut",
        date: getDate(timeOut),
        hour: getHour(timeOut)
    })
    return employeeObject;
}

function hoursWorkedOnDate(employeeObject, dateGiven) {
    let timeIn = employeeObject.timeInEvents.find(event => 
        event.date == dateGiven)
    let timeOut = employeeObject.timeOutEvents.find(event => 
        event.date == dateGiven)
    let totalTime = (timeOut.hour - timeIn.hour) / 100
    return totalTime;
}

function wagesEarnedOnDate(employeeObject, dateGiven) {
    let hours = hoursWorkedOnDate(employeeObject, dateGiven)
    return employeeObject.payPerHour * hours;
}

function allWagesFor(employeeObject) {
    return employeeObject.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employeeObject, event.date)
    }, 0)
}

function calculatePayroll(employeeRecord) {
    return employeeRecord.reduce((total, employee) => {
        return total + allWagesFor(employee)
    }, 0)
}