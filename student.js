$(document).ready(function () {
    $("#studentForm").submit(function (event) {
        event.preventDefault();

        var name = $(".name_class").val();
        var rollNo = $(".rollNo").val();
        var gender = $("input[name='gender']:checked").val();
        var dob = $(".dob").val();
        var studentClass = $(".class_inp").val();
        var mobile = $(".mobile").val();

        var tableRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(rollNo),
            $("<td>").text(gender),
            $("<td>").text(dob),
            $("<td>").text(studentClass),
            $("<td>").text(mobile)
        );

        $("#studentData").append(tableRow);
        // Clear form inputs
        $("#studentForm")[0].reset();

    });

    $(".name_th").on("click", function () {
        var columnIndex = $(this).index();
        sortedTable(columnIndex);
    });
});

function sortedTable(columnIndex) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById('studentData');
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[columnIndex];
            y = rows[i + 1].getElementsByTagName("td")[columnIndex];

            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}


// data input field 30days


function setDates() {
    var today = moment().format('YYYY-MM-DD');
    var last30Days = moment().subtract(30, 'days').format('YYYY-MM-DD');
    var last60Days = moment().subtract(60, 'days').format('YYYY-MM-DD');

    document.getElementById('today').value = today;
    document.getElementById('last30days').value = last30Days;
    document.getElementById('last60days').value = last60Days;
}
setDates();

//validation code
function validateDate() {
    var fromDate = moment(document.getElementById('fromDate').value);
    var toDateInput = document.getElementById('toDate');
    var toDate = moment(toDateInput.value);
    var today = moment();
    var minDate = moment().subtract(60, 'days');

    if (fromDate.isAfter(today)) {
        alert('Future dates are not allowed.');
        document.getElementById('fromDate').value = '';
    }
     else if (fromDate.isBefore(minDate)) {
        alert('Please select a date within the last 60 days.');
        document.getElementById('fromDate').value = '';
    }

     else {
        // Enable the "To" date input
        toDateInput.removeAttribute('disabled');


        if (toDate.isAfter(today)) {
            alert('Future dates are not allowed.');
            toDateInput.value = '';
        } 

        else if (toDate.isBefore(fromDate)) {
            alert('To date should be after From date.');
            toDateInput.value = '';
        }
        
        else if (toDate.isAfter(fromDate.clone().add(5, 'days'))) {
            alert('Please select a date within the next 5 days from the From date.');
            toDateInput.value = '';
        }
    }
}
