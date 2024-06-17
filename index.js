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
        var difference = rowData.secondScore - rowData.firstScore

        if (!rowData.name || rowData.name.trim().length == 0) {
            continue
        }

        if (i == 0) {
            // title
            $('#stats-table-header-id').html(rowData.name)
        } else if (i == 1) {
            // column labels
            $('#stats-table-id').append('<tr class="active-row"><td>' + rowData.name + '</td><td>' + rowData.firstScore + '</td><td>' + rowData.secondScore + '</td><td>Increase</td></tr>')
        } else {
            // column data
            $('#stats-table-id').append('<tr><td><b>' + rowData.name + '</b></td><td>' + rowData.firstScore + '</td><td>' + rowData.secondScore + '</td><td>' + difference + '</td></tr>')
        }
    }
}

function createTableData(csvArray) {
    var array = []
    var headers = []
    for (let i in csvArray) {
        var rowData = {}

        rowData.name = csvArray[i][0]
        rowData.firstScore = csvArray[i][1]
        rowData.secondScore = csvArray[i][2]

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
    var firstDifference = a.secondScore - a.firstScore
    var secondDifference = b.secondScore - b.firstScore
    return secondDifference > firstDifference
}
