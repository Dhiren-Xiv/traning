var expr = /[A-z][A-Z,a-z]+/
var save_btn = document.getElementById('save_btn');
var reset_btn = document.getElementById('reset_btn');
save_btn.onclick = function(){
    var error_msg ="";
    error_msg += checkFnameCap();+'<br />'
    error_msg += checkLnameCap();+'<br />'
}
reset_btn.onclick = function(){
}
// check name Capitalize
function checkFnameCap(){
    var first_name = document.getElementById("first_name");
    if(this.expr.test(first_name)){
        return "Enter First Name with first letter Capital";
    }
}
function checkLnameCap(){
    var last_name = document.getElementById("last_name");
    if(this.expr.test(last_name)){
        return "Enter Last Name with first letter Capital";
    }
}


// check maratial status
function checkstatus(){
    var maratial_stauts = document.getElementById('maratial_status').value
    if(maratial_stauts == "unmarried"){
        document.getElementById('name_spous').disabled = true;
    }else{
        document.getElementById('name_spous').disabled = false;
    }
}