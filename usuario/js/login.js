function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    console.log('Id Profile: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    console.log('Id Token ' + googleUser.getAuthResponse().id_token);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        //una vez deslogueado
        console.log("Adios")
    });
}

