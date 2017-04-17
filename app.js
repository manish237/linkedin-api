/*
* Fo8Nd0Qgp2
* */

/***********************************************************
Event Listeners
 ************************************************************/

function renderSucceesLogOut() {
    console.log("logged out!!!")

}
function renderProfileData(profiles) {
    console.log(profiles);
    var str = profiles.firstName + " -- " + profiles.lastName;
    console.log(str)
    $('.user-data-content').empty()
    $('.user-data-content').append(str);
    $('.ln-login-images').hide();
    $('.ln-auth-success').hide();
    $('.user-data').show();
    $('.ln-logout').show();
    $('.logout-success').hide();


    //use information captured above
}

function renderAuthSuccess()
{
    $('.ln-login-images').hide();
    $('.ln-auth-success').show();
    $('.user-data').hide();
    $('.ln-logout').hide();
    $('.logout-success').hide();
}

function renderLogOut()
{
    $('.ln-login-images').show();
    $('.ln-auth-success').hide();
    $('.user-data').hide();
    $('.ln-logout').hide();
    $('.logout-success').show();
}

function handleAuth()
{
    IN.User.authorize(function(){
        renderAuthSuccess();
    });
}

function handleDataPull()
{
    if(IN.User.isAuthorized()!==true){
        IN.User.authorize(function(){
            renderAuthSuccess();
        });
    }
    else
    {
        IN.API.Raw().url('people/~:(id,first-name,last-name,headline,location,industry,num-connections,summary,specialties,positions,picture-url,public-profile-url)?format=json').method('GET').body().result(renderProfileData);
    }
}

function handleLogOut()
{
    IN.User.logout(renderLogOut);
}


$('.ln-login-link').click(function(event){
    event.preventDefault();
    handleAuth();
});

$('.ln-data-link').click(function(event){
    event.preventDefault();
    handleDataPull();
});


$('.ln-logout-link').click(function(event){
    event.preventDefault();
    handleLogOut();
});

//Initialization on page load
$(function(){
    $('.ln-login-images').show();
    $('.ln-auth-success').hide();
    $('.user-data').hide();
    $('.ln-logout').hide();
    $('.logout-success').hide();
});