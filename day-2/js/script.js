$(document).ready(function () {
    $(".saveEmployee").click((event) => {
        event.preventDefault();
        let data = validateEmplyoee();
        $(`#${data.data.focusField}`).focus();
        if (data.status == 'error') {
            alert(data.data.msg);
        } else {
            alert(data.data.msg);
        }
    });
    $("input[name='maratialStatus']").click((event) => {
        let value = $(event.currentTarget).val();
        if (value === "unmarried") {
            $("#txtNameOfSpouse").attr("disabled", "disabled");
        } else {
            $("#txtNameOfSpouse").removeAttr("disabled", "disabled");

        }
    });
});

var validateEmplyoee = () => {
    let errorMessages = [];
    let focusField = '';
    let result = {}

    // this is to check for first name errors.
    let firstNameErorrs = validateName("txtFirstName");
    if (firstNameErorrs) {
        errorMessages = [...errorMessages, firstNameErorrs];
        focusField = "txtFirstName";
    }
    // this is to check for last name errors.
    let lastNameErorrs = validateName("txtLastName");
    if (lastNameErorrs) {
        errorMessages = [...errorMessages, lastNameErorrs];
        (!focusField) ? focusField = "txtLastName" : focusField;
    }
    // this is to check the spouse name errors.
    let spouseNameErrors = validateSpouseName("");
    if (spouseNameErrors) {
        errorMessages = [...errorMessages, spouseNameErrors];
        (!focusField) ? focusField = "txtNameOfSpouse" : focusField;
    }
    // this is to check for Other Details.
    let otherDetailsErrors = fieldRequired("txtOtherDetails");
    if (otherDetailsErrors) {
        errorMessages = [...errorMessages, otherDetailsErrors];
        (!focusField) ? focusField = "txtOtherDetails" : focusField;
    }


    // creating a response.
    if (errorMessages.length > 0) {
        result = {
            status: 'error',
            data: {
                msg: errorMessages.join(".\n"),
                focusField
            }
        }
    } else {
        result = {
            status: 'success',
            data: {
                msg: 'Thank you!'
            }
        }
    }
    return result;
};

let validateName = (id) => {
    let fieldVal = $(`#${id}`).val();
    let fieldName = $(`#${id}`).data('name');
    let fieldErrors = [];
    let error = fieldRequired(id);
    var expr = new RegExp(/^[A-Z][A-Z,a-z]+/);
    if (error) fieldErrors.push(error);
    if (fieldErrors.length == 0) {
        if (!expr.test(fieldVal)) {
            fieldErrors.push(`${fieldName} must have first charater Capital`);
        }
        if (fieldVal.legth >= 10) {
            fieldErrors.push(`${fieldName} must have 10 or less charater`);
        }
    }
    debugger;
    return (fieldErrors.length > 0) ? fieldErrors : false;
};

let fieldRequired = (id) => {
    let fieldVal = $(`#${id}`).val();
    let fieldName = $(`#${id}`).data('name');
    if (fieldVal.length == 0) {
        return `${fieldName} is required`;
    }
};
let validateSpouseName = () => {
    let enableSpouseName = $("#txtNameOfSpouse").attr('disabled');
    return (!enableSpouseName) ? fieldRequired('txtNameOfSpouse') : false;
}