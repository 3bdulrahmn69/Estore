/* */
function createUser(firstName, lastName, email, password) {
    const obj = {
        "first_name": firstName ,
        "last_name": lastName,
        "email": email,
        "password": password
    };
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/api/signup/",
        contentType: "application/json",
        Connection: "keep-alive",
        data: JSON.stringify(obj),
        success: function(resp) {
            // wanna handle duplicate email error
            console.log(resp);
            window.location.href = "file:///D:/aProjects/Projects/zMyGutHub/Estore/Templates/Verfication.html";
        },
    });
};

$('#createUserBtn').click(function(){
    if ($('#Fname').val() === "" || $('#Lname').val() === "" || $('#email').val() === "" || $('#Password').val() === "" || $('#cPassword').val() === "") {
        alert("Please fill all the fields.");
        if($('#Fname').val() === ""){
            $('#Fname').css("border", "1px solid red");
        }else{
            $('#Fname').css("border", "1px solid #ced4da");
        }
        if($('#Lname').val() === ""){
            $('#Lname').css("border", "1px solid red");
        }else{
            $('#Lname').css("border", "1px solid #ced4da");
        }
        if($('#email').val() === ""){
            $('#email').css("border", "1px solid red");
        }else{
            $('#email').css("border", "1px solid #ced4da");
        }
        if($('#Password').val() === ""){
            $('#Password').css("border", "1px solid red");
        }else{
            $('#Password').css("border", "1px solid #ced4da");
        }
        if($('#cPassword').val() === ""){
            $('#cPassword').css("border", "1px solid red");
        }else{
            $('#cPassword').css("border", "1px solid #ced4da");
        }
        return;
    }
    let password = $('#Password').val();
    let confirmPassword = $('#cPassword').val();
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
    createUser($('#Fname').val(), $('#Lname').val(), $('#email').val(), password);
});