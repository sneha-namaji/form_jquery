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