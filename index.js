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
    for (let i in csvArray) {
        var name = csvArray[i][0]
        var firstScore = csvArray[i][1]
        var secondScore = csvArray[i][2]
        var difference = secondScore - firstScore

        if (!name || name.trim().length == 0) {
            continue
        }

        if (i == 0) {
            // title
            $('#stats-table-header-id').html(name)
        } else if (i == 1) {
            // column labels
            $('#stats-table-id').append('<tr class="active-row"><td>' + name + '</td><td>' + firstScore + '</td><td>' + secondScore + '</td><td>Increase</td></tr>')
        } else {
            // column data
            $('#stats-table-id').append('<tr><td><b>' + name + '</b></td><td>' + firstScore + '</td><td>' + secondScore + '</td><td>' + difference + '</td></tr>')
        }
    }
}
