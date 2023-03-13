function createEmployeeRecord(demograhpics) {
    const employeeRecord = {
        firstName: demograhpics[0],
        familyName: demograhpics[1],
        title: demograhpics[2],
        payPerHour: demograhpics[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    return employeeRecord
}

function createEmployeeRecords (arrOfArr) {
    const records = arrOfArr.map(createEmployeeRecord)
    return records
}

function createTimeInEvent(record, dateStamp) {
    const clockIn = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0,10)
    }

    record.timeInEvents.push(clockIn)

    return record
}

function createTimeOutEvent(record, dateStamp) {
    const clockOut = {
        type: 'TimeOut',
        hour: parseInt(dateStamp.slice(11)), 
        date: dateStamp.slice(0,10)
    }

    record.timeOutEvents.push(clockOut)

    return record
}

function hoursWorkedOnDate(record, date) {
    let hourIn = ''
    let hourOut = ''

    for (const element of record.timeInEvents) {
        if (element.date === date) {
            hourIn = element.hour
        }
    }
    for (const element of record.timeOutEvents) {
        if (element.date === date) {
            hourOut = element.hour
        }
    }


    return (hourOut - hourIn) / 100

}

function wagesEarnedOnDate (record, date) {
    const hours = hoursWorkedOnDate(record, date)
    return hours * record.payPerHour
}

function allWagesFor (record) {
    let money = 0

    for (let element of record.timeInEvents) {
      money += wagesEarnedOnDate(record, element.date)
    }

    return money
}

function calculatePayroll(arrOfObj) {
    let payroll = 0

    for (let obj of arrOfObj) {
        payroll += allWagesFor(obj)
    }

    return payroll
}