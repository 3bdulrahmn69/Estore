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
            // wanna handle dubplicate email error
            console.log(resp);
        },
    });
};

$('#createUserBtn').click(function(){
    password = $('#Password').val();
    confirmPassword = $('#cPassword').val();
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
    createUser($('#Fname').val(), $('#Lname').val(), $('#email').val(), password);
});