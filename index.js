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
        if (i == 0) {
            $('#stats-table-header-id').html(csvArray[i][0])
            continue
        } else if (i == 1) {
            $('#stats-table-id').append('<tr class="active-row"><td>' + csvArray[i][0] + '</td><td>' + csvArray[i][1] + '</td></tr>')
            continue
        }

        $('#stats-table-id').append('<tr><td>' + csvArray[i][0] + '</td><td>' + csvArray[i][1] + '</td></tr>')
    }
}
