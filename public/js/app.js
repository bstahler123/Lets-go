$(document).ready(function() {
    $(".on-load").hide();
    $(".choose-new").hide();
    $(".or").hide();
    var distance;
    var cityInput;
    var select;
    var highPrice;
    var lowPrice;
  





    // Here we run the function that gets the input of they user and finds the lat and long of the city

    $(".find_city").click(function() {
        cityInput = $("#city_name").val().trim();
        $("#display-city").html(cityInput);
        console.log(cityInput);
        initMapByLocation();
    });

    function initMapByLocation() {


        // setting color for custom marker
        var pinColor = "6859ED";
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor);





        // actually getting location of city typed in

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': cityInput + ', us' }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log("location : " + results[0].geometry.location.lat() + " " + results[0].geometry.location.lng());

                // Declaring new Lat and Long for location search based on user input

                var latitude1 = parseFloat(results[0].geometry.location.lat());
                var longitude1 = parseFloat(results[0].geometry.location.lng());
                var uluru = { lat: latitude1, lng: longitude1 };
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 10,
                    center: uluru
                });
                var marker = new google.maps.Marker({
                    position: uluru,
                    map: map,
                    icon: pinImage,
                    animation: google.maps.Animation.DROP
                });
                var request = {
                    location: uluru,
                    radius: 40000,
                    minPriceLevel: lowPrice,
                    maxPriceLevel: highPrice,

                    openNow: true,
                    keyword: ['restaurant']
                };

                // Create the PlaceService and send the request.
                // Handle the callback with an anonymous function.

                var service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, function(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {

                            var marker = new google.maps.Marker({
                                map: map,
                                position: results[i].geometry.location

                            });
                            var directions = "https://www.google.com/maps/dir//" + results[i].vicinity;
                            var pictures = $("<div class='col-md-2 col-sm-4 col-xs-12 thumbnail multiPlaces'><div class='resPics'><img src='" + results[i].photos[0].getUrl({ 'maxWidth': 175, 'maxHeight': 175 }) + "'></div><div class='here'>Address:  " + results[i].vicinity + "<br>Price:  " + results[i].price_level + "<br>Rating:  " + results[i].rating + " </div><a href='" + directions + "' ><div class='btn btn-primary btn-circle1'></div></a><div class='btn btn-info btn-circle1'></div><div class='btn btn-success btn-circle1'></div></div>");
                            var place = results[i];
                            console.log(results[i]);
                            console.log(pictures);
                            $(".btn-circle1").html("<i class='material-icons nav-icon'>navigation</i>");

                            pictures.appendTo($(".populate"));

                        }
                        var pick = 1 + Math.floor(Math.random() * results.length - 1);
                        console.log(pick);
                        select = (results[pick]);
                        $(".address").html("Address:  " + select.vicinity);
                        $(".price").html("Price:  " + select.price_level);
                        $(".rating").html("Rating:  " + select.rating);
                        console.log(results[pick]);

                        // If the request succeeds, draw the place location on
                        // the map as a marker, and register an event to handle a
                        // click on the marker.

                    }
                });
            }
        });
    }


    function initMapNearMe() {

        var pinColor = "6859ED";
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor);







        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude, position.coords.longitude);


            var latitude = parseFloat(position.coords.latitude);
            var longitude = parseFloat(position.coords.longitude);
            var uluru = { lat: latitude, lng: longitude };
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: uluru
            });
            var marker = new google.maps.Marker({
                position: uluru,
                map: map,
                icon: pinImage,
                animation: google.maps.Animation.DROP
            });
            var request = {
                location: uluru,
                radius: 40000,
                minPriceLevel: lowPrice,
                maxPriceLevel: highPrice,

                openNow: true,
                keyword: ['restaurant']
            };

            // Create the PlaceService and send the request.
            // Handle the callback with an anonymous function.

            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, function(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {

                        var marker = new google.maps.Marker({
                            map: map,
                            position: results[i].geometry.location

                        });
                        var directions = "https://www.google.com/maps/dir//" + results[i].vicinity;
                        var pictures = $("<div class='col-md-2 col-sm-4 col-xs-12 thumbnail multiPlaces'><div class='resPics'><img src='" + results[i].photos[0].getUrl({ 'maxWidth': 185, 'maxHeight': 170 }) + "'></div><div class='here'>Address:  " + results[i].vicinity + "Price:  " + results[i].price_level + " name " + results[i].name + "Rating:  " + results[i].rating + " </div><a href='" + directions + "' target='_blank'><div class='btn btn-primary btn-circle1'></div></a><div class='btn btn-info btn-circle2'></div><div class='btn btn-success btn-circle3'></div></div>");
                        var place = results[i];
                        console.log(results[i]);
                        console.log(pictures);
                        $(".btn-circle1").html("<i class='material-icons nav-icon'>navigation</i>");

                        pictures.appendTo($(".populate"));

                    }
                    var pick = 1 + Math.floor(Math.random() * results.length - 1);
                    console.log(pick);
                    select = (results[pick]);
                    $(".address").html("Address:  " + select.vicinity);
                    $(".price").html("Price:  " + select.price_level);
                    $(".rating").html("Rating:  " + select.rating);
                    console.log(results[pick]);

                    // If the request succeeds, draw the place location on
                    // the map as a marker, and register an event to handle a
                    // click on the marker.

                }
            });

        });
    }
    // lets go scroll to map

    $(document).on('click', '.go, .go2, .go3', function(event) {


        $('html, body').delay(1000).animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000);
    });

    // Getting the distance selected by the user
    $(".button1").on("click", function(){
        $(".on-load").slideUp(500);
        
    });
    $(".radius").on("click", function() {
        distance = $(this).val();
        console.log(distance);
        
    });

    // Getting the Price range from the user

    $(".lowPrice").on("click", function() {
        lowPrice = $(this).val();
        console.log(lowPrice);
       


    });

    $(".highPrice").on("click", function() {
        highPrice = $(this).val();
        console.log(highPrice);

    });

    







    // function to find random resturant by geo location

    function initMap() {

        var pinColor = "6859ED";
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor);



        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude, position.coords.longitude);

            // Declairing varibles for initMap function

            var latitude = parseFloat(position.coords.latitude);
            var longitude = parseFloat(position.coords.longitude);

            // var distance = document.getElementById('sel1').value;




            var uluru = { lat: latitude, lng: longitude };
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: uluru
            });
            var marker = new google.maps.Marker({
                position: uluru,
                map: map,
                icon: pinImage,
                animation: google.maps.Animation.DROP,

            });



            var request = {
                location: uluru,
                radius: distance,
                minPriceLevel: lowPrice,
                maxPriceLevel: highPrice,
                openNow: true,
                keyword: ['restaurant']

            };

            // Create the PlaceService and send the request.
            // Handle the callback with an anonymous function.
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, function(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {

                    //looping through results getting place details and loggin them

                    for (var i = 0; i < results.length; i++) {

                        var pictures = $("<img src='" + results[i].photos[0].getUrl({ 'maxWidth': 200, 'maxHeight': 200 }) + "'>");
                        var place = results[i];
                        console.log(results[i]);

                    }

                    // Selecting random place and assigning place details

                    var pick = 1 + Math.floor(Math.random() * results.length - 1);
                    console.log(pick);
                    select = (results[pick]);
                    $(".address").html("Address:  " + select.vicinity);
                    $(".price").html("Price:  " + select.price_level);
                    $(".rating").html("Rating:  " + select.rating);
                    console.log(results[pick]);
                    var directions = "https://www.google.com/maps/dir//" + select.vicinity;
                    var here = $("<a href='" + directions + "' target='_blank'><div class='btn btn-primary btn-circle1 directions-random'></div></a>");
                    here.appendTo($(".move-me"));
                    $(".btn-circle1").html("<i class='material-icons nav-icon'>navigation</i>");

                    // If the request succeeds, draw the place location on
                    // the map as a marker, and register an event to handle a
                    // click on the marker.

                    var marker = new google.maps.Marker({
                        map: map,
                        position: select.geometry.location

                    });

                }

            });
        });
    }

    // random event function

    $(".go").on("click", function() {
        initMap();

        $(".on-load").slideDown(500);
        $(".reveal-btn").hide();
        $(".reveal-btn").fadeTo(5000, 1.0);
        $(".reveal-btn").on("click", function() {
            $(".reveal").fadeTo(1000, 1);
            $(".reveal").html("<img src='" + select.photos[0].getUrl({ 'maxWidth': 200, 'maxHeight': 200 }) + "'>");

            $(".name").html(select.name);
            
            $(".choose-new").show();
            $(".choose-new-btn").show()
            $(".or").show();

        })

    });

    $(".go3").on("click", function() {
        initMapNearMe();
        $(".random").hide();
        $(".on-load").slideDown(500);
      
       
         

    });
    // This is the button that inits the map for the location search by city name

    $(".go2").on("click", function() {
        $(".reveal").empty();
        $(".random").hide();
        $(".on-load").slideDown(500);
       
       
    });

    // choose new button for the random resturant button

    $(".choose-new-btn").on("click", function() {
        initMap();
        $(".reveal").css("display", "none");
        $(".reveal").html("");
        $(".name").html("Click to reveal destination.");
        $(".choose-new-btn").hide();
        $(".reveal-btn").fadeTo(2000, 1.0);
        
    });
});
