import React from 'react';


class CreateAddingMarker extends React.Component {
	state={
		createStars: "",	
	}

	createOneStars = this.createOneStars.bind(this)
	createTwoStars = this.createTwoStars.bind(this)
	createThreeStars = this.createThreeStars.bind(this)
	createFourStars = this.createFourStars.bind(this)
	createFiveStars = this.createFiveStars.bind(this)
	googleSubmit = this.googleSubmit.bind(this)
	
 	restaurantReview =  (event) =>{
    	document.getElementById("overlayCreateMarker").style.display = "none"
						document.getElementById("overlayBackgroundMarker").style.display = "none"
	}		

	checkWrongTextDelete =() =>{
	if(document.getElementById("AddedRestaurantwrong").style.display === "block") {
			document.getElementById("AddedRestaurantwrong").style.display="none"
		}
	}
	
	overlayClose = () => {
		this.checkWrongTextDelete()
		var starsDelete = null			
		this.viewClickStars(starsDelete)	
		document.getElementById("overlayBackgroundCreateMarkerCheck").style.display = "block"
		document.getElementById("overlayCreatingMarker").style.display = "block"
		document.getElementById("overlayAddingMarker").style.display = "none"
		document.getElementById("overlayAddingMarkerBackground").style.display = "none"
	}	
	
	createOneStars (event)  {
		this.setState({createStars: 1});
		this.viewClickStars(1)
	}

	createTwoStars(event) {
		this.setState({createStars: 2});
		this.viewClickStars(2)
	}

	createThreeStars (event)  {
		this.setState({createStars: 3});
		this.viewClickStars(3)
	}

	createFourStars (event)  {
		this.setState({createStars: 4});
		this.viewClickStars(4)
	}

	createFiveStars  (event) {
		this.setState({createStars: 5});	
		this.viewClickStars(5)
	}	
	
	viewClickStars =(length) => {
		var x = ["1addedOverlayStar", "2addedOverlayStar", "3addedOverlayStar", "4addedOverlayStar", "5addedOverlayStar"]
		var i = 0
		for(i = 0; i < length; i++){
		document.getElementById(x[i]).style.color = "#f2ab00";
		}
	
		for(  ; i < 5; i++){
			document.getElementById(x[i]).style.color = "#2e2b0c";
		}
	}	

	googleSubmit (createStars) {
		
		var v = document.getElementById("1addedOverlayStar").style.color		
		createStars = this.state.createStars		
		if(v === "rgb(242, 171, 0)"){
			this.checkWrongTextDelete()					
			var googleLocation = document.getElementById("locationData").innerHTML
			var googleRating = this.state.createStars
			var googleName = document.getElementById("restaurantDataName").value 			
			var googleAddress = document.getElementById("restaurantDataAddress").innerHTML
			var googlePhone = document.getElementById("restaurantDataPhone").value 
			var googleEmail = document.getElementById("restaurantDataEmail").value
			var googleReviewText = document.getElementById("restaurantDataReview").value		

			var eachContactCollect = [] 
			eachContactCollect = [undefined, googleRating, googleName, googleAddress, googlePhone, googleEmail, googleReviewText]  
						     
			var loopWithoutReviewText = eachContactCollect.length - 1
			for(var checkLoop = 0; checkLoop < loopWithoutReviewText; checkLoop++){
				if (eachContactCollect[checkLoop] === "" ){
					eachContactCollect[checkLoop] = "not available" 
				}		       			
			}
		             
		   var idNameForDivSymbol =["addingPhotoSymbol", "addingAverageStarSymbol","addingNameSymbol", "addingAddressSymbol" ,"addingPhoneSymbol",  "addingWebsiteSymbol", "addingReviewSymol"] 
       	var idNameForDivText =["photoText", "addingAverageStarText","addingNameText", "addingAddressText" ,"addingPhoneText",  "addingEmailText", "addingReviewText"] 
			var bootstrapClass = ["container contactfield containerResult", "row"]						 	
			var idNameBeforeDivBootstrap = "newRestaurant";				
			var idNameBeforeDiv = "rownewRestaurant"
			var howManyAddingRestaurants = document.getElementById("addedRestaurant").childElementCount;		
			var markerID = howManyAddingRestaurants
			var restaurantImageName = ["<i class='fas fa-star symbolStarDesign'></i>","<i class='fas fa-store-alt'></i>", "<i class='fas fa-map-marked-alt'></i>","<i class='fas fa-phone'></i>", "<i class='fas fa-at'></i>"]				  
			var divMain = document.createElement("div")
			var idMain = document.createAttribute("id");
			var classMain = document.createAttribute("class");
			idMain.value = "newRestaurant" + markerID  ;
			classMain.value = "mainAddedRestaurant";
			divMain.setAttributeNode(idMain)
			divMain.setAttributeNode(classMain)
			var nodePathMain = document.getElementById("addedRestaurant")
			nodePathMain.appendChild(divMain)		
			idNameBeforeDivBootstrap = "rownewRestaurant";				
			idNameBeforeDiv = "rowrownewRestaurant"
			//Create Google Contact Divs		
			bootstrapDiv(bootstrapClass, idNameBeforeDivBootstrap, markerID) 
			googleContactDiv("col-12 streetview", undefined, markerID,idNameForDivText[0],idNameBeforeDiv)
				
			for(let loop = 1 ; loop < 6; loop++){			
				googleContactDiv ("col-2",restaurantImageName[loop-1], markerID,  idNameForDivSymbol[loop],idNameBeforeDiv)	
				googleContactDiv("col-10", eachContactCollect[loop],  markerID, idNameForDivText[loop],idNameBeforeDiv )				
			}				
			
			//Convert the string of the postion in the overlay to the google format for the location (position) of the photo
			var commaPosition = googleLocation.search(",")
			var latCreateMarker = Number(googleLocation.slice(0, commaPosition));
			var lngCreateMarker = Number(googleLocation.slice(commaPosition + 1));
 			googleLocation	= {lat: latCreateMarker,lng:  lngCreateMarker}		
			
			new window.google.maps.StreetViewPanorama(
		      	document.getElementById(idNameForDivText[0] + markerID), {
		        		position: googleLocation,
		        		pov: {
		          		heading: 40,
		          		pitch: 10
		        		}
		      	})						
					
			bootstrapClass = ["container allReviewDesign", "row"]
				
			//create Review
			idNameBeforeDivBootstrap = "reviewNewRestaurant";			
			idNameBeforeDiv = "rowreviewNewRestaurant"
			bootstrapDiv(bootstrapClass, idNameBeforeDivBootstrap, markerID) 				
			
			// create stars from the review 
			var allSymbolStars = ""
			var symbol = '<i class="fas fa-star symbolStarDesign"></i>'
			var stars = eachContactCollect[1]
			for(var i = 0; i < stars; i++){	
				allSymbolStars +=  symbol
			}			
					
  			idNameForDivSymbol = "1reviewSymbol"
			idNameForDivText = "1reviewText"
 			googleContactDiv("col-sm-12 symbolStarDesign", allSymbolStars, markerID, idNameForDivSymbol, idNameBeforeDiv, eachContactCollect[1])
 			googleContactDiv("col-sm-12",eachContactCollect[6] ,markerID, idNameForDivText, idNameBeforeDiv)
			googleButton ("write a Review", markerID, idNameBeforeDiv )	
			bootstrapClass =  ["container allReviewDesign reviewArrowDiv", "row"]
			//click to see all reviews and hidden
			bootstrapDiv(bootstrapClass, "reviewSeeMoreClick", markerID)
			reviewSeeMoreDiv("col-sm-12, symbolStarDesign reviewArrow", "<i class='fas fa-arrow-down starDesignReview'></i>" ,markerID, "arrowAddingreviewSeeMore", idNameBeforeDiv)
 						
			/*function googleStarSymbol (googleRatingNumber) {
				let googleRating = ""
	   	   var googleStarSymbol = '<i class="fas fa-star"></i>'
				for(var i = 0; i < googleRatingNumber; i++){	
					googleRating +=  googleStarSymbol 
				}  
				return googleRating
	 		}*/
	     		 
	   	function bootstrapDiv(bootstrapClass, idName, markerid){ 
	     		var divBootstrap = []	
				for(let bLoop = 0; bLoop < bootstrapClass.length; bLoop++  ){
					divBootstrap[bLoop] = document.createElement("div")
					var classAttr = document.createAttribute("class")
						var idAttr = document.createAttribute("id");		
					if (bLoop === 1){
						idAttr.value = "row"+idName + markerid	
						 
					}else {idAttr.value =idName +markerid
													
					}
					divBootstrap[bLoop].setAttributeNode(idAttr)	
					classAttr.value = bootstrapClass[bLoop]
					divBootstrap[bLoop].setAttributeNode(classAttr)		
				} 
				var nodePath = document.getElementById("newRestaurant" + markerid)	
				nodePath.appendChild(divBootstrap[0]).appendChild(divBootstrap[1]);	
			}
	
	   	function googleContactDiv (classContent, contentDiv, loopGoogleContact,idNameForDiv,idNameBeforeDiv, ratingNumber){
				 	
				var divContainer = document.createElement("div")
				var idAttr = document.createAttribute("id");
				var classAttr = document.createAttribute("class");
				idAttr.value = idNameForDiv + loopGoogleContact  ;
				classAttr.value = classContent;
				divContainer.setAttributeNode(idAttr)
				divContainer.setAttributeNode(classAttr)
				divContainer.innerHTML = contentDiv
				var nodePath = document.getElementById(idNameBeforeDiv + loopGoogleContact)
				nodePath.appendChild(divContainer)	
				if(idAttr.value === "1reviewSymbol" + loopGoogleContact ){
					var stardataAttr = document.createAttribute("stardata")
					stardataAttr.value = ratingNumber
					divContainer.setAttributeNode(stardataAttr)
				}				
										
			}
	        
			function reviewSeeMoreDiv (classContent, contentDiv, loopGoogleContact,idNameForDiv,idNameBeforeDiv){
							 	
				var divContainer = document.createElement("div")
				var idAttr = document.createAttribute("id");
				var clickAttr = document.createAttribute("onclick");
				var classAttr = document.createAttribute("class");
				idAttr.value = idNameForDiv + loopGoogleContact  ;
				clickAttr.value = "seeMoreButtonAddingReview(this.id)";
				classAttr.value = classContent;
				divContainer.setAttributeNode(idAttr)
				divContainer.setAttributeNode(classAttr)
				divContainer.setAttributeNode(clickAttr)
				divContainer.innerHTML = contentDiv
				var nodePath = document.getElementById("rowreviewSeeMoreClick" + loopGoogleContact)
				nodePath.appendChild(divContainer)				 				
			}       
	       
			function googleButton (buttonContent, loopGoogleContact, idName ){
					 	
				var bottomContainer = document.createElement("button")
				var divAttr = document.createAttribute("id");
				var classAttr = document.createAttribute("class");
				var clickAttr = document.createAttribute("onClick");
				divAttr.value = "addingReviewButton" + loopGoogleContact;
				classAttr.value = "btn buttonDesign reviewButton";
				clickAttr.value = "addingRestaurantReview(this.id)";	
				bottomContainer.setAttributeNode(divAttr)
				bottomContainer.setAttributeNode(classAttr)
				bottomContainer.setAttributeNode(clickAttr)
				bottomContainer.innerHTML = buttonContent
				var nodePath = document.getElementById(idName + loopGoogleContact)
				nodePath.appendChild(bottomContainer)						
			}	         
						
			document.getElementById("overlayAddingMarker").style.display = "none"
			document.getElementById("overlayAddingMarkerBackground").style.display = "none"
			document.getElementById("mainOverlayBackground").style.display = "none"
		} else {
			document.getElementById("AddedRestaurantwrong").style.display="block"
	 	} 
	}

	render() {
     
    return ( 
    	
    <div id="overlayAddingMarkerBackground" className="overlayBackgroundMarkerDesign">
				<div id="overlayAddingMarker" className="overlayDesign">
					<div className= "container">
						<div className= "row">
							<div className="col-1"></div>
							<div className="col-sm-10" >						
							 <form>
								<div className="container">
									<div className="row">
										<div id="titleAddedName" className="col-sm-12 titleDesign"><h2>Add a Restaurant</h2></div>
							 			<div id ="reviewWritingOverlay" className="col-sm-12"></div>
										<div id= "AddedRestaurantwrong" className="col-sm-12 wrong"> I am sorry, you forgot to give us 5 stars</div>
										<div id="locationName" className="col-sm-4">Coordinates</div>				
										<div id="locationData" className="col-sm-8"></div>
										<div id="starName" className="col-sm-4">Give Stars</div>	
										<div id="starData" className="col-sm-8 overlayStarDesign" >	
											<i id="1addedOverlayStar" className="fas fa-star overlayEachStar" onClick={this.createOneStars}></i> 
											<i id="2addedOverlayStar" className="fas fa-star overlayEachStar" onClick={this.createTwoStars}></i>  
											<i id="3addedOverlayStar" className="fas fa-star overlayEachStar" onClick={this.createThreeStars}></i> 
											<i id="4addedOverlayStar" className="fas fa-star overlayEachStar" onClick={this.createFourStars}></i> 
											<i id="5addedOverlayStar" className="fas fa-star overlayEachStar" onClick={this.createFiveStars}></i> 
										</div>
										<div id="restaurantGiveName" className="col-sm-4">Name</div>
										<input id="restaurantDataName" className="col-sm-8 textarDesign"></input>							
										<div id="restaurantGiveAddress" className="col-sm-4">Address</div>
										<div id="restaurantDataAddress" className="col-sm-8 textarDesign"></div>										
										<div id="restaurantGivePhone" className="col-sm-4">Phone</div>
										<input id="restaurantDataPhone" className="col-sm-8 textarDesign"></input>
										<div id="restaurantGiveEmail" className="col-sm-4">Email</div>
										<input id="restaurantDataEmail" className="col-sm-8 textarDesign"></input>
										<div className="col-sm-12 eachReviewDesign"> Write a Review</div>
										<textarea id="restaurantDataReview" className="col-sm-12 textareaDesign" value={this.state.value} onChange={this.textareaChange}> 
										</textarea>																			
										<div>
											<div  className="container">
												<div className= "row overlayButton">
													<div className="col-sm-6"> 
														<button id="buttonAddedRestaurantCancel" className="btn buttonDesign buttonDesingoverlay" type="button" onClick={this.overlayClose} >Cancel</button>
													</div>
													<div className="col-sm-6"> 
														<button id="buttongGoogleSumit" className="btn buttonDesign buttonDesingoverlay"  type="button"  onClick={this.googleSubmit}> submit  </button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>							
							</form>						
							</div>
						<div className="col-1" >
						</div>
					</div>
				</div>
			</div>
		</div>    
	   )
	}
}

export default CreateAddingMarker;
