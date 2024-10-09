function csvDataToText(csv) {
    $.ajax({
        url: csv,
        type: 'get',
        async: false,
        success: function(csvText) {
            csvTextToArray(csvText)
        }
    })
}

function csvTextToArray(csvText) {
    Papa.parse(csvText, {
        complete: function(results) {
            csvArrayToTable(results.data)
        }
    })
}

function csvArrayToTable(csvArray) {
    var tableArray = createTableData(csvArray)

    for (let i in tableArray) {
        var rowData = tableArray[i]

        var latestScore = parseInt(rowData.latestScore) + parseInt(rowData.topLevelScore)
        var lastScore = parseInt(rowData.lastScore)

        var difference = latestScore - lastScore

        if (!rowData.name || rowData.name.trim().length == 0) {
            continue
        }

        if (i == 0) {
            // title
            $('#stats-table-header-id').html(rowData.name)
        } else if (i == 1) {
            // column labels
            $('#stats-table-id').append('<tr class="active-row"><td>' + rowData.name + '</td><td>' + rowData.topLevelScore + '</td><td>' + rowData.latestScore + '</td><td>' + rowData.lastScore + '</td><td>Increase</td></tr>')
        } else {
            // column data
            $('#stats-table-id').append('<tr><td><b>' + rowData.name + '</b></td><td>' + rowData.topLevelScore + '</td><td>' + rowData.latestScore + '</td><td>' + rowData.lastScore + '</td><td>' + difference + '</td></tr>')
        }
    }
}

function createTableData(csvArray) {
    var array = []
    var headers = []
    for (let i in csvArray) {
        var rowData = {}

        rowData.name = csvArray[i][0]
        rowData.topLevelScore = csvArray[i][1]
        rowData.latestScore = csvArray[i][2]
        rowData.lastScore = csvArray[i][3]

        if (i == 0 || i == 1) {
            headers.push(rowData)
            continue
        }

        array.push(rowData)
    }
    
    array.sort(compareIncrease)
    array.splice(0, 0, ...headers)

    return array
}

function compareIncrease(a, b) {
    var latestAScore = parseInt(a.latestScore) + parseInt(a.topLevelScore)
    var lastAScore = parseInt(a.lastScore)
    var aDifference = latestAScore - lastAScore

    var latestBScore = parseInt(b.latestScore) + parseInt(b.topLevelScore)
    var lastBScore = parseInt(b.lastScore)
    var bDifference = latestBScore - lastBScore

    return bDifference > aDifference
}
