$(document).ready(function () {
    $("#txtUnmarried").click(function () {
        debugger;
        $("#txtNameOfSpouse").attr("disabled", "disabled");
    });
    $("#txtMarried").click(function () {
        $("#txtNameOfSpouse").removeAttr("disabled", "disabled");
    });
});