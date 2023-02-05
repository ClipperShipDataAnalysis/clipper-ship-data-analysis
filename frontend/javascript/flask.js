$(document).ready(function() {
    $.ajax({

        type: "POST",
        url: "/data",
        data: String,
        success: function(data) {
            // Update the HTML with the received result
            //$("#result").html(JSON.stringify(result));
            $("#result").html(result);
            console.log("Flask bitch");
        }
    });
});