/*
* Fo8Nd0Qgp2
* */

/***********************************************************
 Object to hold search params for API call
 ************************************************************/
var authParams = {
    url:'https://www.linkedin.com/oauth/v2/authorization',
    response_type: 'code',
    client_id: '865d4q7wjtg8xe',
    redirect_uri:'http://localhost:63342',
    state:'Fo8Nd0Qgp2'
}


/***********************************************************
 UI Renderer using the data returned.
 ************************************************************/
function displayYTSearchData(data) {
    console.log(data)
}

/***********************************************************
 Processor function to load data from API
 ************************************************************/

function getAuthToken(searchParams, callback) {

    var query = {
        response_type: authParams.response_type,
        client_id: authParams.client_id,
        redirect_uri:authParams.redirect_uri,
        state:authParams.state
    }
    //console.log(query)
    $.getJSON(authParams.url, query, callback)
}

/***********************************************************
Event Listeners
 ************************************************************/

function renderSucceesLogOut() {
    console.log("logged out!!!")

}
function renderProfileData(profiles) {
    console.log(profiles);
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