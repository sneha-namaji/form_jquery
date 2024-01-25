$(document).ready(function() {
    $("#studentForm").submit(function(event) {
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
});
// data input field 30days


function setDates() {
    var today = moment().format('YYYY-MM-DD');
    var last30Days = moment().subtract(30, 'days').format('YYYY-MM-DD');

    document.getElementById('today').value = today;
    document.getElementById('last30days').value = last30Days;
}

function validateDate() {
    var selectedDate = document.getElementById('customDate').value;
    var today = moment();
    var minDate = moment().subtract(60, 'days');

    if (moment(selectedDate).isAfter(today)) {
        alert('Future dates are not allowed.');
        document.getElementById('customDate').value = '';
    } else if (moment(selectedDate).isBefore(minDate)) {
        alert('Please select a date within the last 60 days.');
        document.getElementById('customDate').value = '';
    }
}

setDates();
