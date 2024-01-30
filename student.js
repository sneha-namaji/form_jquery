$(document).ready(function () {
    var sortOrder = 1; // 1 for ascending, -1 for descending
    loadRecords();

    $("#studentForm").submit(function (event) {
        event.preventDefault();

        var name = $(".name_class").val();
        var rollNo = $(".rollNo").val();
        var gender = $("input[name='gender']:checked").val();
        var dob = $(".dob").val();
        var studentClass = $(".class_inp").val();
        var mobile = $(".mobile").val();

        saveRecord({ name, rollNo, gender, dob, studentClass, mobile });
        addRecordToTable({ name, rollNo, gender, dob, studentClass, mobile });
        $("#studentForm")[0].reset();
    });
    var sortOrderName = 1; 
    $(".name_th").on("click", function () {
        var columnIndex = $(this).index();
        sortOrder *= -1; // Toggle between ascending and descending
        sortedTable(columnIndex, sortOrder);
        toggleSortIcon(sortOrderName);
    });

    $("#searchInput").on("input", function () {
        var query = $(this).val().toLowerCase();
        filterTable(query);
    });

    // Delete record functionality
    $("#studentData").on("click", ".delete-record", function () {
        var row = $(this).closest("tr");
        var name = row.find("td:eq(0)").text(); // Get name of the record to delete
        deleteRecord(name);
        row.remove(); // Remove row from UI
    });

    function loadRecords() {
        var records = JSON.parse(localStorage.getItem('studentRecords')) || [];
        records.forEach(function (record) {
            addRecordToTable(record);
        });
    }
    
    function saveRecord(record) {
        var records = JSON.parse(localStorage.getItem('studentRecords')) || [];
        records.push(record);
        localStorage.setItem('studentRecords', JSON.stringify(records));
    }

    function addRecordToTable(record) {
        var deleteIcon = $("<span>").addClass("delete-record").html(" &#10060;");
        var tableRow = $("<tr>").append(
            $("<td>").text(record.name),
            $("<td>").text(record.rollNo),
            $("<td>").text(record.gender),
            $("<td>").text(record.dob),
            $("<td>").text(record.studentClass),
            $("<td>").text(record.mobile),
            $("<td>").append(deleteIcon) // Add delete icon
        );

        $("#studentData").append(tableRow);
    }
    function toggleSortIcon(sortOrder) {
        var sortIcon = document.getElementById('sortIcon');
        if (sortOrder === 1) {
            sortIcon.innerHTML = '&#9650;'; // Up arrow
        } else {
            sortIcon.innerHTML = '&#9660;'; // Down arrow
        }
    }
    function sortedTable(columnIndex, sortOrder) {
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

                var xText = x.innerText || x.textContent;
                var yText = y.innerText || y.textContent;

                // Compare based on sortOrder (1 for ascending, -1 for descending)
                if (sortOrder * (xText.localeCompare(yText)) > 0) {
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
// search functionality
    function filterTable(query) {
        $("#studentData tr").filter(function() {
            var found = false;
            $(this).find("td").each(function() {
                var cellText = $(this).text().toLowerCase();
                // Check if the cell text contains the query
                if (cellText.indexOf(query) > -1) {
                    found = true;
                    return false; // Break the loop
                }
            });
            $(this).toggle(found);
        });
    }
      
// Delete functionality
    function deleteRecord(name) {
        var records = JSON.parse(localStorage.getItem('studentRecords')) || [];
        var updatedRecords = records.filter(function(record) {
            return record.name !== name; // Filter out the record to delete
        });
        localStorage.setItem('studentRecords', JSON.stringify(updatedRecords));
    }
});


var sortOrder = 0; // 1 for ascending, -1 for descending



function sortedTable(columnIndex, sortOrder) {
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

            var xText = x.innerText || x.textContent;
            var yText = y.innerText || y.textContent;

            // Compare based on sortOrder (1 for ascending, -1 for descending)
            if (sortOrder * (xText.localeCompare(yText)) > 0) {
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
//moment.js


function setDates() {
    var today = moment().format('YYYY-MM-DD');
    var last30Days = moment().subtract(30, 'days').format('YYYY-MM-DD');
    var last60Days = moment().subtract(60, 'days').format('YYYY-MM-DD');

    document.getElementById('today').value = today;
    document.getElementById('last30days').value = last30Days;
    document.getElementById('last60days').value = last60Days;


    document.getElementById('fromDate').setAttribute('max', today);
}

setDates();

// validation
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

        toDateInput.removeAttribute('disabled');


        if (toDate.isAfter(today)) {

            toDateInput.value = '';

        }

        else if (toDate.isBefore(fromDate)) {

            toDateInput.value = '';
        }

        else if (toDate.isAfter(fromDate.clone().add(5, 'days'))) {
            toDateInput.value = '';
        }
    }
    disableFutureDates()

}

// disableling the dates
function disableFutureDates() {
    var fromDateInput = document.getElementById('fromDate');
    var toDateInput = document.getElementById('toDate');
    var today = moment();

    var minDisableDate = fromDateInput.value !== '' ? moment(fromDateInput.value).subtract('days').format('YYYY-MM-DD') : today.format('YYYY-MM-DD');
    var maxDisableDate = fromDateInput.value !== '' ? moment(fromDateInput.value).add(5, 'days').format('YYYY-MM-DD') : today.format('YYYY-MM-DD');

    toDateInput.setAttribute('min', minDisableDate);

    if (fromDateInput.value === today.format('YYYY-MM-DD')) {
        toDateInput.setAttribute('max', today.format('YYYY-MM-DD'));
    } else {
        var maxDisableDate = fromDateInput.value !== '' ? moment(fromDateInput.value).add(5, 'days').format('YYYY-MM-DD') : today.format('YYYY-MM-DD');

        // Check if the selected date is 1, 2, 3, or 4 days back from today
        if (moment(today).diff(fromDateInput.value, 'days') >= 1 && moment(today).diff(fromDateInput.value, 'days') <= 4) {
            toDateInput.setAttribute('max', today.format('YYYY-MM-DD'));
        } else {
            toDateInput.setAttribute('max', maxDisableDate);
        }
    }
}


