function initAutocomplete(){
    var dbdrive = <%- dbdrive %>;
    for(i=0; i<dbdrive.length; i++){
        console.log('dbdrive looks like ' + dbdrive[1]);
        var map = new google.maps.Map(document.getElementById(i), {
        center: {lat: 32.880376, lng: -117.235065},
        zoom: 15,
        mapTypeId: 'roadmap',
        mapTypeControl: false,
        });
    }
}