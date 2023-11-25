function singIn(email, password) {
    const obj = {
        "email": email,
        "password": password
    };
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/api/signin/",
        contentType: "application/json",
        Connection: "keep-alive",
        data: JSON.stringify(obj),
        success: function(resp) {
            console.log(resp);
            const token = resp.token;
            sessionStorage.setItem('userToken', token);
            sessionStorage.setItem('userEmail', email);
            
            window.location.href = "file:///D:/aProjects/Projects/zMyGutHub/Estore/index.html";
        },
        error: function(err) {
            if(err.status == 401){
                console.log("Unauthorized");
            }
        }
    });
}

$('#singInBtn').click(function(){
    const email = $('#email').val();
    const password = $('#password').val();
    singIn(email, password);
});