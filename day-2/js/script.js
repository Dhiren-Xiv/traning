var employeeList = [];
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
    
    $(".showEmployeeTable").click((event) => {
        event.preventDefault();
        if(employeeList.length !== 0){
            $(".employeeTable").removeClass('d-none');
            let tableBody = "";
            employeeList.forEach(employee => {
                tableBody += "<tr class='text-center'>";
                tableBody += `<td>${employee.firstName}</td>
                            <td>${employee.lastName}</td>
                            <td>${employee.gender}</td>
                            <td>${employee.maratialStatus}</td>
                            <td>${employee.nameOfSpouse}</td>
                            <td>${employee.otherDetails}</td>
                            <td>
                                <button class="btn editEmployee" data-id=${employee.id}>
                                    <i class="fa fa-edit"></i>
                                </button> 
                                <button class="btn removeEmployee" data-id=${employee.id}>
                                    <i class="fa fa-times"></i>
                                </button>
                            </td>`;
                tableBody += "</tr>";

            });
            $(".employeeTableBody").html(tableBody);
        } else {
            $(".employeeTable").addClass('d-none');
        }

    });

    if(employeeList.length === 0){
        $(".employeeTable").addClass('d-none');
    }else {
        $(".showEmployeeTable").click();
    }

});

$(document).on('click', '.removeEmployee', event => {
    event.preventDefault();
    let id = parseInt($(event.currentTarget).data('id'));
    employeeList.splice(id,1);
    $(".showEmployeeTable").click();
});

$(document).on('click', '.editEmployee', event => {
    event.preventDefault();
    let id = parseInt($(event.currentTarget).data('id'));
    let employee = employeeList[id];
    $("#employeeId").val(employee.id);
    $("#txtFirstName").val(employee.firstName);
    $("#txtLastName").val(employee.lastName);
    (employee.gender === 'male') ? $("#txtMale").attr("checked", "checked") : $("#txtFemale").attr("checked", "checked")
    (employee.maratialStatus === 'unmarried') ? $("#txtMarried").attr("checked", "checked") : $("#txtUnmarried").attr("checked", "checked")
    $("#txtNameOfSpouse").val(employee.nameOfSpouse);
    $("#txtOtherDetails").val(employee.otherDetails);
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
    let spouseNameErrors = validateSpouseName();
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
        let employeeId = $("#employeeId").val();
        let data = {
            id: (employeeId) ? employeeId : employeeList.length,
            firstName: $("#txtFirstName").val(),
            lastName: $("#txtLastName").val(),
            gender: $("input[name='gender']").val(),
            maratialStatus: $("input[name='maratialStatus']").val(),
            nameOfSpouse: $("#txtNameOfSpouse").val(),
            otherDetails: $("#txtOtherDetails").val()
        }
        if(employeeId){
            employeeList.splice(parseInt(employeeList),1,data)
        } else {
            employeeList.push(data);
            console.log('employeeList: ', employeeList);
            result = {
                status: 'success',
                data: {
                    msg: 'Thank you!'
                }
            }
        }
        
        $(".resetEmployee").click();
        $(".showEmployeeTable").click();
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