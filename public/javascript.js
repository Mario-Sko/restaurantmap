
function seeMoreButtonReview(clickid){
	var markerId = clickid.slice(13)
	var arrowIdDiv = "reviewSeeMore"
	var wrappedIdDiv = "rowgoogleRestaurantReview"
	ToogleReview(arrowIdDiv,wrappedIdDiv, markerId )
	}

function restaurantReview(clicked_id){    
	var markerId =clicked_id.slice(12)
	//a == adding restaurants
   var whereIsTheRestaurant = "g"
   CompletingReviewoverlay(markerId, whereIsTheRestaurant)   		
}

function  CompletingReviewoverlay(markerId, whereIstheRestaurant){ 
     var markerIdWithWhereIsTheRestaurant
	var getRestaurantName     
     if(whereIstheRestaurant == "a"){
        	getRestaurantName = "rowrownewRestaurant"
        	//a == added restaurants
         markerIdWithWhereIsTheRestaurant = "a" + markerId
     }else{
     		getRestaurantName = "roweachRestaurant"
        	// g == restaurants from google api
         markerIdWithWhereIsTheRestaurant = "g" + markerId
     }
     
		if(document.getElementById("reviewWritingOverlay").firstChild != null){
			document.getElementById("reviewWritingOverlay").firstChild.remove()
		}
    	document.getElementById("overlayBackground").style.display = "block"
    	document.getElementById("overlay").style.display = "block"
    	document.getElementById("mainOverlayBackground").style.display = "block"
   	 	
		var NameOfRestaurant = document.getElementById(getRestaurantName + markerId).childNodes[4].innerHTML
		
		//create div to get the restaurant name and the id of the restaurant    	
    	var divContainer = document.createElement("div")
		var divAttr = document.createAttribute("id");
		var classAttr = document.createAttribute("class");
		divAttr.value = "writeReview" + markerIdWithWhereIsTheRestaurant;
		classAttr.value = "titleOverlay";	
	 	divContainer.setAttributeNode(divAttr)
		divContainer.setAttributeNode(classAttr)
		divContainer.innerHTML = "Write a Review for " + NameOfRestaurant
		var nodePath = document.getElementById("reviewWritingOverlay")
		nodePath.appendChild(divContainer)	
}		

function createStars(clicked_id){
	
	var i = 0
	for(i = 0; i < starData ; i++){
		document.getElementById([i+1]+starName).style.color = "#f2ab00";
	}

	for(i+1; i < 5; i++){
		document.getElementById([i+1]+starName).style.color = "#2e2b0c";
	}

}

function googleSubmit(){
    	document.getElementById("overlayBackground").style.display = "none"		    	
}

function googleCancel(){
	
	for(i = 1; i <= starData; i++){
		document.getElementById([i]+starName).style.color = "#2e2b0c";
	}    	
	document.getElementById("textReview").innerHTML = "";   	
   document.getElementById("overlayBackground").style.display = "none" 	
	starData = ""
}

function ToogleReview(arrowIdDiv,wrappedIdDiv, markerId ){

	if (document.getElementById(arrowIdDiv + markerId).firstElementChild.className == "fas fa-arrow-up starDesignReview"){
		
		document.getElementById(wrappedIdDiv + markerId).style.height = "100px"
		document.getElementById(wrappedIdDiv + markerId).style.overflow = "hidden"
		document.getElementById(arrowIdDiv  + markerId).innerHTML = '<i class="fas fa-arrow-down starDesignReview"></i>'
	}else{
		console.log("zwei")
		document.getElementById(wrappedIdDiv+ markerId).style.height = "auto"
		document.getElementById(wrappedIdDiv + markerId).style.overflow = "visible"
		document.getElementById(arrowIdDiv + markerId).innerHTML = '<i class="fas fa-arrow-up starDesignReview"></i>'

	}
}	

function seeMoreButtonAddingReview(clickid){
	var markerId = clickid.slice(24)
	var arrowIdDiv = "arrowAddingreviewSeeMore" 
	var wrappedIdDiv = "reviewNewRestaurant" 

	ToogleReview(arrowIdDiv,wrappedIdDiv, markerId )

	}

function addingRestaurantReview(clicked_id) {    

	var markerId = clicked_id.slice(18)
	//a == adding restaurants
   var whereIsTheRestaurant = "a"
      
   CompletingReviewoverlay(markerId, whereIsTheRestaurant)
		
}