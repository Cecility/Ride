$(document).ready(function(){
    $('#log-out-btn').click(function(){
       firebase.auth().signOut().then(function(){
           $.post('/logout', function(){
               window.location.href = '/';
           });
       }, function(error){
           console.log('Error happened while logging out ' + error);
       });
    });
});