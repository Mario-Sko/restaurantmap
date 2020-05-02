import React from 'react';
import CreateAddingMarker from './createAddingMarker';


// global variabel for the reviews counts and for the restaurant dispaly
var loopAllReview= 0
var restaurantDetailsDisplay = []

// globale variable for Google restaurants marker
var globalMarkerGoogle = []
var globalMarkerId = []

//global variable for all added markers 
var allMarkerIds = [] 
var allMarkers = [] 
var markerCount = 0

class ContactDisplayapp extends React.Component {

	clickDeleteMarker= this.clickDeleteMarker.bind(this)
	//clickCreateMarker= this.clickCreateMarker.bind(this)

	componentDidMount= ()=>{
				this.renderMap()
		}
	
	renderMap = () => {
			loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAUHeuQyv0kYAJcdHFUZbnD7abiHMQhF6U&callback=initMap&libraries=places")
			window.initMap = this.initMap	
	}
	 
	initMap = () => {
		var idNumberMarker =[]
		var contactOneMaker =[]	
		var GooglerMakerID = 0
	
		// Create A Map
		var map = new window.google.maps.Map(document.getElementById('map'), {
			center: {lat: 53.3442514, lng: -6.2650063},
			zoom: 12
		})
		
		var infoWindow = new window.google.maps.InfoWindow();
		
		//Beginn Geo Location
		if(navigator.geolocation) { 
	    	navigator.geolocation.getCurrentPosition(function(position) {
		   	var pos = {
	    			lat: position.coords.latitude,
	      	  	lng: position.coords.longitude,  
				};
	
				//location for nearbbysearch
				if (pos.lat !== undefined || pos.lng !== undefined){    	
	     			var dublin = new window.google.maps.LatLng(pos.lat,pos.lng);
					var request = {
	   				location: dublin, radius: '2000', type: ['restaurant']
					}				
				}else {
					dublin = new window.google.maps.LatLng(53.3742514,-6.2250063);
					request = {
	   				location: dublin, radius: '2000', type: ['restaurant']
					}		
	  			}		
	   
				clickAddMarker()
	
				function clickAddMarker(){		
			
					// This event listener calls addMarker() when the map is clicked.
	        		window.google.maps.event.addListener(map, 'click', function(event) {
	         		addMarker(event.latLng, map);
				
						var geocoder = new window.google.maps.Geocoder();          
						var latlng = event.latLng
						var formLng = event.latLng.lng()
						var formLat = event.latLng.lat()
 		 				geocoder.geocode({'location': latlng}, function(results, status) {
    						if (status === 'OK') {
	      					var formatAddress = results[0].formatted_address       
   	   					document.getElementById("restaurantDataAddress").innerHTML = formatAddress
   	   					document.getElementById("locationData").innerHTML = formLat + "," + formLng
   	   					
   	   					document.getElementById("mainOverlayBackground").style.display = "block"
   	   					document.getElementById("overlayAddingMarkerBackground").style.display = "block"
								document.getElementById("overlayAddingMarker").style.display = "block"
	      				}
	         		})			
					});
	
					function addMarker(location, map) {	
						//var markerid= 0
   			      var marker = new window.google.maps.Marker({
	         			position: location,
	         			map: map,
	         			id: markerCount 
	        			});
 						allMarkerIds.push(marker.id); 
 						allMarkers.push(marker)
						markerCount++
												
						window.google.maps.event.addListener(marker, "click", function(){	
							document.getElementById("newRestaurant" + this.id).scrollIntoView({
								behavior: 'smooth'
							});	
	        			 });
						}	
					}
 
					service.nearbySearch(request, callback);
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
		
				function handleLocationError(browserHasGeolocation, infoWindow, pos) {
				   infoWindow.setPosition(pos);
				   infoWindow.setContent(browserHasGeolocation ?
		   	   	'Error: The Geolocation service failed. Please turn on the Geolocation service to see restaurants' :
		   	   	'Error: Your browser doesn\'t support geolocation.');
				   infoWindow.open(map);
				}
			
				var markerUser = new window.google.maps.Marker({
					map:map,
					icon:'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
					id: idNumberMarker, 
				});			
								 
				var service = new window.google.maps.places.PlacesService(map);
			  
			
				function callback(results, status, pagination,places) {
			  		if (status === window.google.maps.places.PlacesServiceStatus.OK) {
			    		for (var i = 0; i < results.length ; i++) {
						createMarkers(results)    
			    		}
			  		}
				}	 
			
			   function createMarkers(places) {
			  		var loopGoogleContact = 0
			 		var infowindow = new window.google.maps.InfoWindow();
			
			      for (var i = 0, place; place = places[i]; i++) {
			      	var image = {
			            url: place.icon,
			            size: new window.google.maps.Size(71, 71),
			            origin: new window.google.maps.Point(0, 0),
			            anchor: new window.google.maps.Point(17, 34),
			            scaledSize: new window.google.maps.Size(25, 25)
			          };
			          
			    		var request = { reference: place.reference };
			         service.getDetails(request, function(details, status) {
			         	if (status === window.google.maps.places.PlacesServiceStatus.OK) {
									
								var markerGoogle = new window.google.maps.Marker({		          
				            	map: map,
				            	icon: image,
				            	title: details.name,
				            	position: details.geometry.location,
				            	id:  GooglerMakerID,             
				          	});			   
				          	globalMarkerGoogle[GooglerMakerID++] = markerGoogle
			 					window.google.maps.event.addListener(markerGoogle, 'click', function() {
			             		infowindow.setContent('<div><strong>' +   this.title + ' </strong><br></div>');
			              		infowindow.open(map, this);
			              		document.getElementById("GoogleRestaurant" + this.id).scrollIntoView( {
										behavior: 'smooth'
									})	
								})	
								globalMarkerGoogle[loopGoogleContact] =  markerGoogle
						 	
								document.getElementById("search").onclick = function(markerGoogle){
				
									var searchingStart = document.getElementById("searchBegin").value
									var searchingEnd =  document.getElementById("searchEnd").value
									var textWrongInputSearching =  document.getElementById("wrongInputStars")
									var wrongInputType =  document.getElementById("wrongInputType")
									var restaurantsWithAverage = []
							
									//check is Searching End (example 5 stars higher than Searching Start ( example 1 star)
									wrongInputType.style.display = "none"
									textWrongInputSearching.style.display = "none";
							
									searchingStart = parseInt(searchingStart)
									searchingEnd = parseInt(searchingEnd)
				
									if( (searchingStart === 1 || searchingStart === 2 || searchingStart === 3 || searchingStart === 4 || searchingStart === 5) && (searchingEnd === 1 || searchingEnd === 2 || searchingEnd === 3 || searchingEnd === 4 || searchingEnd === 5)){   
									
										if( searchingStart <= searchingEnd){
											textWrongInputSearching.style.display = "none";		
										}else{
											textWrongInputSearching.style.display = "block";
										}
									
										SearchResults("averageStarText", "GoogleRestaurant", globalMarkerId,globalMarkerGoogle)
										//search added Restauraut
										if(document.getElementById("addedRestaurant").childElementCount != 0 ){						
											SearchResults("addingAverageStarText", "newRestaurant", allMarkerIds, allMarkers)						
										}
				
									}else {
										if( wrongInputType.style.display === "block" ){
											wrongInputType.style.display = "none";
										}else{
										wrongInputType.style.display = "block";
										}
									}
								
									function SearchResults(IdNameStars, IdNameEachRestaurant, idsOfMarkers, allMarker){						
										for (var i = 0; i < idsOfMarkers.length; i++){
											restaurantsWithAverage[i] = document.getElementById(IdNameStars+ idsOfMarkers[i]).innerHTML
											restaurantsWithAverage[i] = Math.round(restaurantsWithAverage[i])
										}	
							
				
										//Check searching result with stars of the restaurants
										var restaurantStarsForResult = []	
							
										for(let i = 0; i < idsOfMarkers.length; i++){	
											if( restaurantsWithAverage[i] >= searchingStart && restaurantsWithAverage[i] <= searchingEnd){
												//right 
												restaurantStarsForResult[i] = 1
											}else{
											//false
												restaurantStarsForResult[i] = 0
											}		
										}
										
										if(IdNameStars === "addingAverageStarText"){
																	
										}
										
						
										for(let i = 0; i < idsOfMarkers.length; i++){	
											if( restaurantStarsForResult[i] === 1){
											allMarker[i].setVisible(true)
												document.getElementById(IdNameEachRestaurant+ idsOfMarkers[i]).style.display = "block"
											
											}else{
												allMarker[i].setVisible(false)
												document.getElementById(IdNameEachRestaurant + idsOfMarkers[i]).style.display = "none";
											}		
										}					
									}	  
								}				
		        								
								var googleContactWebsite = details.website	
							 	var googleRating = details.rating				
					  		   var googleContactReview = details.reviews;
						      var googleContactName = details.name;
								var phone = details.formatted_phone_number;
								var address = details.formatted_address;
								var photo				
							   	
							   var eachContactCollect = [ photo, googleRating, googleContactName, address, phone, googleContactWebsite, googleContactReview, GooglerMakerID]
							     
							   //-1 because googleId is associated to GooglerMakerID
								for(var checkLoop = 0; checkLoop < eachContactCollect.length - 1; checkLoop++){
									if (eachContactCollect[checkLoop] === undefined){
										eachContactCollect[checkLoop] = "not available" 
									}		       
							    }
									      	
							   if(eachContactCollect[5] !== "not available"){
							   	eachContactCollect[5] = '<a class="linkwebsite" href=' + googleContactWebsite +  '>go to website</a>'	       
							   }
				  
				   			contactOneMaker.push(photo, googleContactName, address, phone, googleContactWebsite, googleContactReview)
				  				restaurantDetailsDisplay[loopGoogleContact]= eachContactCollect 
				           
							   var idNameForDivSymbol =["photoSymbol", "averageStarSymbol", "addressSymbol" ,"phoneSymbol",  "websiteSymbol", "reviewSymol"] 
					       	var idNameForDivText =["photoText", "averageStarText", "addressText" ,"phoneText",  "websiteText", "reviewText"] 
								var bootstrapClass = ["container contactfield containerResult", "row"]						 	
								var eachRestaurantDiv = "eachRestaurant";				
								var idNameBeforeDiv = "roweachRestaurant"
								var markerID = markerGoogle.id    
								globalMarkerId[loopGoogleContact] = markerID  
								var restaurantImageName = ["<i class='fas fa-star symbolStarDesign'></i>","<i class='fas fa-store-alt'></i>", "<i class='fas fa-map-marked-alt'></i>","<i class='fas fa-phone'></i>", "<i class='fas fa-at'></i>", ]			
								var divContainer = document.createElement("div")
								var idAttr = document.createAttribute("id");
								var classAttr = document.createAttribute("class");
								idAttr.value = "GoogleRestaurant" + markerID ;
								divContainer.setAttributeNode(idAttr)
								divContainer.setAttributeNode(classAttr)
					
								var nodePath = document.getElementById("googleData")
								nodePath.appendChild(divContainer)					
				 
				
					idNameBeforeDiv = "roweachRestaurant" + markerID
					
					//Create Google Contact Divs		
					bootstrapDiv(bootstrapClass, eachRestaurantDiv, markerID) 
					googleContactDiv("col-sm-12 streetview", undefined, markerID,idNameForDivText[0],idNameBeforeDiv)
					
					
					var placeLocation = details.geometry.location;
					photo = new window.google.maps.StreetViewPanorama(
		      	document.getElementById(idNameForDivText[0] + markerID), {
		        		position: placeLocation,
		        		pov: {
		          		heading: 40,
		          		pitch: 10
		        		}
		      	});	
				
					for(let loop = 1 ; loop < 6; loop++){		
						googleContactDiv ("col-2",restaurantImageName[loop-1], markerID,  idNameForDivSymbol[loop],idNameBeforeDiv)	
						googleContactDiv("col-10", eachContactCollect[loop],  markerID, idNameForDivText[loop],idNameBeforeDiv )				
					}				
		
					var reviewLoops = 0
					var contentReview = []
					contentReview[loopAllReview] = []   
					var googleReviewEachRestaurant =[]
					bootstrapClass = ["container allReviewDesign", "row"]
				
					//create Review
					eachRestaurantDiv = "rowgoogleRestaurantReview"  ;			
					idNameBeforeDiv = "rowgoogleRestaurantReview" + markerID 
					bootstrapDiv(bootstrapClass, eachRestaurantDiv, markerID) 				
					
					for (var key in googleContactReview){
						var reviewRating = []
						var reviewText = []				
					
					 	if (reviewLoops <5){	
	  						googleReviewEachRestaurant = googleContactReview[key]   
	   	  				reviewRating[reviewLoops] = googleReviewEachRestaurant.rating
	   	  				reviewText[reviewLoops] = googleReviewEachRestaurant.text
							reviewRating[reviewLoops] = googleStarSymbol(googleReviewEachRestaurant.rating)  				
	   	  				idNameForDivSymbol = ["1reviewSymbol","2reviewSymbol","3reviewSymbol","4reviewSymbol","5reviewSymbol"]
							idNameForDivText = ["1reviewText","2reviewText","3reviewText","4reviewText","5reviewText"]
		 					googleContactDiv("col-sm-12 symbolStarDesign", reviewRating[reviewLoops],markerID, idNameForDivSymbol[reviewLoops], idNameBeforeDiv)
		 					googleContactDiv("col-sm-12", reviewText[reviewLoops],markerID, idNameForDivText[reviewLoops], idNameBeforeDiv)

							//added attribute to each review			
							var getDiv = document.getElementById(reviewLoops +1 + "reviewSymbol" + markerID)				
							var starDataAttr = document.createAttribute("stardata");
							starDataAttr.value =googleReviewEachRestaurant.rating;			
							getDiv.setAttributeNode(starDataAttr)								
							reviewLoops++	 								
						}		
					}	
								
					idNameBeforeDiv = "rowgoogleRestaurantReview"
					googleButton ("write a Review", markerID, idNameBeforeDiv )	
					bootstrapClass =  ["container allReviewDesign reviewArrowDiv", "row"]

					//click to see all reviews and hidden
					bootstrapDiv(bootstrapClass, "reviewSeeMoreClick", markerID)
					reviewSeeMoreDiv("col-sm-12, symbolStarDesign reviewArrow", "<i class='fas fa-arrow-down starDesignReview'></i>" ,markerID, "reviewSeeMore", idNameBeforeDiv)
			 						
					loopGoogleContact++	
		    	
		 	  		}
				})
		          
				function googleStarSymbol (googleRatingNumber) {
					let googleRating = ""
		   	   var googleStarSymbol = '<i class="fas fa-star"></i>'
					for(var i = 0; i < googleRatingNumber; i++){	
						googleRating +=  googleStarSymbol 
					}  
					return googleRating
		 		}
		     		 
		   	function bootstrapDiv(bootstrapClass, idName, markerid){ 
		     		var divBootstrap = []	
					for(let bLoop = 0; bLoop < bootstrapClass.length; bLoop++  ){
						divBootstrap[bLoop] = document.createElement("div")
						var classAttr = document.createAttribute("class")
							var idAttr = document.createAttribute("id");		
						if (bLoop === 1){
							idAttr.value = "row"+idName + markerid								 
						}else {
							idAttr.value =idName +markerid													
						}
						divBootstrap[bLoop].setAttributeNode(idAttr)	
						classAttr.value = bootstrapClass[bLoop]
						divBootstrap[bLoop].setAttributeNode(classAttr)		
					} 
					var nodePath = document.getElementById("GoogleRestaurant" + markerid)	
					nodePath.appendChild(divBootstrap[0]).appendChild(divBootstrap[1]);	
				}
		
		   	function googleContactDiv (classContent, contentDiv, loopGoogleContact,idNameForDiv,idNameBeforeDiv){
					 	
					var divContainer = document.createElement("div")
					var idAttr = document.createAttribute("id");
					var classAttr = document.createAttribute("class");
					idAttr.value = idNameForDiv + loopGoogleContact  ;
					classAttr.value = classContent;
					divContainer.setAttributeNode(idAttr)
					divContainer.setAttributeNode(classAttr)
					divContainer.innerHTML = contentDiv
					var nodePath = document.getElementById(idNameBeforeDiv)
					nodePath.appendChild(divContainer)				
										
			  		GooglerMakerID++ 				
				}
		        
				function reviewSeeMoreDiv (classContent, contentDiv, loopGoogleContact,idNameForDiv,idNameBeforeDiv){
								 	
					var divContainer = document.createElement("div")
					var idAttr = document.createAttribute("id");
					var clickAttr = document.createAttribute("onclick");
					var classAttr = document.createAttribute("class");
					idAttr.value = idNameForDiv + loopGoogleContact  ;
					clickAttr.value = "seeMoreButtonReview(this.id)";
					classAttr.value = classContent;
					divContainer.setAttributeNode(idAttr)
					divContainer.setAttributeNode(classAttr)
					divContainer.setAttributeNode(clickAttr)
					divContainer.innerHTML = contentDiv
					var nodePath = document.getElementById("rowreviewSeeMoreClick" + loopGoogleContact)
					nodePath.appendChild(divContainer)				
										
			  		GooglerMakerID++ 				
				}       
		           
				function googleButton (buttonContent, loopGoogleContact, idName ){
						 	
					var bottomContainer = document.createElement("button")
					var divAttr = document.createAttribute("id");
					var classAttr = document.createAttribute("class");
					var clickAttr = document.createAttribute("onClick");
					divAttr.value = "ReviewButton" + loopGoogleContact;
					classAttr.value = "btn buttonDesign reviewButton";
					clickAttr.value = "restaurantReview(this.id)";	
					bottomContainer.setAttributeNode(divAttr)
					bottomContainer.setAttributeNode(classAttr)
					bottomContainer.setAttributeNode(clickAttr)
					bottomContainer.innerHTML = buttonContent
					var nodePath = document.getElementById(idName + loopGoogleContact)
					nodePath.appendChild(bottomContainer)						
				}	         
			}			
		}
		
	}
	clickDeleteMarker(){
		
	markerCount = markerCount - 1	
	allMarkers[allMarkers.length - 1].setMap(null)	
	allMarkerIds.pop()
		
	allMarkers.pop()
	document.getElementById("overlayBackgroundCreateMarkerCheck").style.display = "none"
	document.getElementById("mainOverlayBackground").style.display = "none"
	}

render() {
	var allContacts = [];
	var allGoogleContacts = [];	 
	this.componentDidMount()
	this.renderMap()
	this.initMap()
 	   
 	return (<div>	
				<div className= "container">
				<div className= "row searchInputDesign">
				<div id="overlayBackgroundCreateMarkerCheck" className="overlayDesignDeleteMarker">
					<div id="overlayCreatingMarker" className="overlayDesign deleteMarkerOverlay">		
						<p>Yout Marker is deleted</p>								
						<button div="deleteMarkerId" onClick ={this.clickDeleteMarker}>Ok</button>					
						</div>
					</div>	
				<CreateAddingMarker />
				<div className="col-sm-12"> 
					<h1 className="titleDesign">Search the Best Restaurants</h1>
				</div>
					<div id="wrongInputStars" className="wrongInputSearching col-sm-12"> End is not higher or egal than Start
					</div>
					<div id="wrongInputType" className="wrongInputSearching col-sm-12"> Please put a number between 1 and 5
					</div>
					<form className="tableDesign" onSubmit={this.searchSubmit}>
						<div className ="col-sm-12 ">
							<table className="tableDesign">
								<tbody>								
									<tr>
										<td className="tableFormDesign">
											<input id={"searchBegin"} className="form-control tableDesign" type="number"   min="1" max="5" placeholder="minimum rating"/>
										</td>
										<td className="tableFormDesign">
											<input id={"searchEnd"} className="form-control tableDesign" onChange={this.checkInputEnd} type="number" min="1" max="5" placeholder="maximum rating"/>
										</td>
									</tr>	
								</tbody>			
							</table>				
						</div>	
					</form>					
					<div className ="searchButtonDesign">
						<button id={"search"} type="button " className="btn buttonDesign buttonSearchDesign" onClick={this.handleSearch}>Search</button>
					</div>												
				</div>				
			</div>
			<div id="addedRestaurant"></div>
			<div id="allGoogleRestaurants">{allGoogleContacts}</div>					
			<div id="allRestaurants">{allContacts}</div>		
		</div>
	 )
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
