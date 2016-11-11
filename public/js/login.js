$(document).ready(function(){
    var username, useremail, picUrl, domain, userRef;
    var login_btn = document.getElementById("sign-in-button");

    var config = {
        apiKey: "AIzaSyCkkZLilGWMKEobaGnn5wq6eeiWsV4julU",
        authDomain: "ride-175f3.firebaseapp.com",
        databaseURL: "https://ride-175f3.firebaseio.com",
        storageBucket: "ride-175f3.appspot.com",
        messagingSenderId: "344088152572"
      };

    firebase.initializeApp(config);

    $("#sign-in-button").on("click", function(){
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
            'prompt' : 'select_account'
        });
        firebase.auth().signInWithPopup(provider);
        });

    firebase.auth().onAuthStateChanged(function(currentUser){
        if(currentUser != null){
        // The signed-in user info.
        username = currentUser.displayName;
        console.log("User name is " + currentUser.displayName);
        useremail = currentUser.email;
        if(currentUser.photoUrl != undefined)   
            picUrl  = currentUser.photoUrl;
        else 
            picUrl = "null";
        domain = useremail.substring(0,useremail.lastIndexOf("@"));
        console.log("user mail is " + useremail);
        console.log("userpicUrl is " + picUrl);
        console.log("domain is " + domain);
        firebase.database().ref("users").once('value', function(snapshot){
          if(!snapshot.hasChild(domain)){
              firebase.database().ref("users/" + domain).set({
                  name: username,
                  email:useremail,
                  profile_picture: picUrl
              });
              console.log("user created");
              window.location.href = "main";
          }
          else{
              console.log("user exists");
              window.location.href = "main";
          }
      });
        }
    });
});