import React, { Component } from 'react';
import './App.css';
import ContactList from './contactList';
import Map from './map';



class ContactDisplayapp extends React.Component {
  constructor() {
    super();
    this.state = { contacts: [],
					bootstrapContainer: "container",
	bootstrapRow: 'row',
	ContactMapColumn: "col-sm-6",
	currentID: "ssdfds",

	
				
				   		   };

    fetch("data.json")
      .then(response => response.json())
      .then(json => {this.setState({contacts: json})})
      .catch(error => console.log(error));
   
    

}
 

componentDidMount(){
		this.renderMap()
}

renderMap = () => {
	loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyALHLlYYr0eLnJLlJIrXtMSgacfOMFb96I&libraries=places&callback=initMap")
	//	loadScript("https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJL6wn6oAOZ0gRoHExl6nHAAo&fields=name,formatted_address,address_component,geometry&key=AIzaSyALHLlYYr0eLnJLlJIrXtMSgacfOMFb96I&callback=initMap")
		window.initMap = this.initMap	
		//window.unvisibleMarker = this.unvisibleMarker
		//window.addMarker=this.addMarker
}

/*
unvisibleMarker= () => {
	var map = new window.google.maps.Map(document.getElementById('map'), {
			center: {lat: 53.3442514, lng: -6.2650063},
			zoom: 14
			})
var marker = new window.google.maps.Marker({
		position: new window.google.maps.LatLng(53.3465514, -6.2655063 ),
		map:map,
		icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
		});
}
	*/
initMap = () => {
		var lat = []
		var lng = []
		var idNumberMarker =[]
		var contactDetails = []
		var markerList = []



		
	for (var contact of this.state.contacts) {
		   
		
		  lat.push(contact.lat);
		  lng.push(contact.lng);
		  idNumberMarker.push(contact.idNumber);
		  contactDetails.push(contact)
		
    }
	
		// Create A Map
	var map = new window.google.maps.Map(document.getElementById('map'), {
		//center: {lat: -33.867, lng: 151.195},
		center: {lat: 53.3442514, lng: -6.2650063},
		zoom: 12
	})
	
	var infoWindow = new window.google.maps.InfoWindow();


  //added place APi

 // Create the places service.
        var service = new window.google.maps.places.PlacesService(map);
        var getNextPage = null;
        var moreButton = document.getElementById('more');
        moreButton.onclick = function() {
          moreButton.disabled = true;
          if (getNextPage) getNextPage();
        };
 var pyrmont = {lat: 53.3442514, lng: -6.2650063};

        // Perform a nearby search.
        service.nearbySearch(
            {location: pyrmont, radius: 500, type: ['restaurant']},
            function(results, status, pagination) {
              if (status !== 'OK') return;

              createMarkers(results);
              moreButton.disabled = !pagination.hasNextPage;
              getNextPage = pagination.hasNextPage && function() {
                pagination.nextPage();
              };
            });
      

      function createMarkers(places) {
        var bounds = new window.google.maps.LatLngBounds();
        var placesList = document.getElementById('places');

        for (var i = 0, place; place = places[i]; i++) {
          var image = {
            url: place.icon,
            size: new window.google.maps.Size(71, 71),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(17, 34),
            scaledSize: new window.google.maps.Size(25, 25)
          };

          var marker = new window.google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
          });

          var li = document.createElement('li');
          li.textContent = place.name;
          placesList.appendChild(li);

          bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);
      }
  
  //END PLaCE API

	//Beginn Geo Location
	 
	var markerUser = new window.google.maps.Marker({
	//	position: new window.google.maps.LatLng(x, y ),
		map:map,
		icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
		id: idNumberMarker, 
	});
	 
	 
	if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
			  
			};

            markerUser.setPosition(pos);
			markerUser.setTitle('Here you are');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
    } else {
			// Browser doesn't support Geolocation
			handleLocationError(false, infoWindow, map.getCenter());
	}
    
	//END GEOLOCATION
	    
	
	var loops = lat.length
	//call all position in the array to create the markers
		for(var i = 0; i < loops; i++){
			addMarker(lat[i], lng[i], idNumberMarker[i])
		}
		
	function addMarker(x, y, idNumberMarker){
	
		var marker = new window.google.maps.Marker({
			position: new window.google.maps.LatLng(x, y ),
			map:map,
			icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
			id:  idNumberMarker, 
			});
		//all Marker in one List to hidden and show in the search
		markerList.push(marker)
  	
  //Filter of the restaurants^
		document.getElementById("search").onclick = function(){



			var searchingStart = document.getElementById("searchBegin").value
			var searchingEnd =  document.getElementById("searchEnd").value
			var textWrongInputSearching =  document.getElementById("wrongInputStars")
			var wrongInputType =  document.getElementById("wrongInputType")
			var restaurantsWithAverage = []
			var howManyRestaurants =[]
			var countAllStarsSearch = 0
			console.log("contact " +  contactDetails[0].lng)
			//check is Searching End (example 5 stars higher than Searching Start ( example 1 star)
			wrongInputType.style.display = "none"
			textWrongInputSearching.style.display = "none";
			if( (searchingStart == 1 || searchingStart == 2 || searchingStart == 3 || searchingStart == 4 || searchingStart == 5) && (searchingEnd == 1 || searchingEnd == 2 || searchingEnd == 3 || searchingEnd == 4 || searchingEnd == 5)){   
			
			if( searchingStart <= searchingEnd){
				textWrongInputSearching.style.display = "none";
				
			}else{
				textWrongInputSearching.style.display = "block";

			}
		 
			for  (var contact of contactDetails) {
		   
				howManyRestaurants.push(contact.idNumber);	
			}
	
			for (var i = 0; i < howManyRestaurants.length; i++){
			
				restaurantsWithAverage[i] =[]
				for(var j =0; j < 1; j++){
				restaurantsWithAverage[i][j] = document.getElementById("star" +[i]).innerHTML
				
				}
			}
			
			// count all stars each restaurant
			var countAllStarsSearch = []
			var countAllRestraurantDisplay = []
		
			for(var i = 0; i < howManyRestaurants.length; i++){
				countAllStarsSearch[i] = parseInt(document.getElementById("star" + [i]).innerHTML)
				countAllRestraurantDisplay[i] = document.getElementById("restaurant" + [i])
			}
		
			//Check searching result with stars of the restaurants
			var restaurantStarsForResult = []	
			
			for(var i = 0; i < howManyRestaurants.length; i++){	
				if( countAllStarsSearch[i] >= searchingStart && countAllStarsSearch[i] <= searchingEnd){
					//right
					restaurantStarsForResult[i] = 1
				}else{
					//false
					restaurantStarsForResult[i] = 0
				}		
			}
		

		
		
			for(var i = 0; i < howManyRestaurants.length; i++){	
				if( restaurantStarsForResult[i] == 1){
					markerList[i].setVisible(true)
					countAllRestraurantDisplay[i].style.display = "block";
					
				}else{
					markerList[i].setVisible(false)
					countAllRestraurantDisplay[i].style.display = "none";

				}		
			}
		
		
		
		
		
		
		}else {
			if( wrongInputType.style.display == "block" ){
				wrongInputType.style.display = "none";
					
			}else{
				wrongInputType.style.display = "block";
			}
		}	  
	} 
		 
	window.google.maps.event.addListener(marker, "click", function(){	
		var marker = this;
        var currentID =  this.id
		document.getElementById("restaurant" + this.id).scrollIntoView( {
		behavior: 'smooth'
		})	
	});	 
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

function SerchingStartHigherEnd (searchingStart, searchingEnd, textWrongInputSearching)  {

	if( searchingStart <= searchingEnd){
		textWrongInputSearching.style.display = "none";		
	}else{
		textWrongInputSearching.style.display = "block";
	}
}		



	} 

render() {
	var allContacts = [];
		
    for (var contact of this.state.contacts) {
		   
		allContacts.push(<ContactList item={contact}/> )
			
      }
	 
	this.componentDidMount()
	this.renderMap()
	this.initMap()
 	   
 return 	<div>
				<div className= {"container"}>
				<div className= {"container searchInputDesign"}>
					<div id="wrongInputStars" className="wrongInputSearching"> End is not higher or egal than Start
					</div>
					<div id="wrongInputType" className="wrongInputSearching"> Please put a nambuer between 1 and 5
					</div>
					 <form onSubmit={this.searchSubmit}>
					<input id="searchBegin" class="form-control" type="number"   min="1" max="5" placeholder="put a number"/>
					<input id="searchEnd" class="form-control" onchange={this.checkInputEnd} type="number" min="1" max="5" placeholder="put a number"/>
					<button id={"search"} type="button" className="btn buttonDesign" onClick={this.handleSearch}>Search</button>
					</form>			
				</div>
			</div>
				<div id="allRestaurants">{allContacts}</div>			
			</div>
  }
}

function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default ContactDisplayapp;