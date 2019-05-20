
function seeMoreButtonReview(clickid){
var markerId = clickid.slice(13)
console.log("worke: " + document.getElementById("reviewSeeMore" + markerId).firstElementChild.className )

	if (document.getElementById("reviewSeeMore" + markerId).firstElementChild.className == "fas fa-arrow-up starDesignReview"){
		document.getElementById("googleRestaurantReview" + markerId).style.height = "100px"
		document.getElementById("googleRestaurantReview" + markerId).style.overflow = "hidden"
		document.getElementById("reviewSeeMore" + markerId).innerHTML = '<i class="fas fa-arrow-down starDesignReview"></i>'

	}else{
		document.getElementById("googleRestaurantReview" + markerId).style.height = "auto"
		document.getElementById("googleRestaurantReview" + markerId).style.overflow = "visible"
		document.getElementById("reviewSeeMore" + markerId).innerHTML = '<i class="fas fa-arrow-up starDesignReview"></i>'
		var divContainer = document.getElementById("reviewSeeMore" + markerId)
		var clickAttr = document.createAttribute("onclick");
		clickAttr.value = "seeMoreButtonReview(this.id)";
		divContainer.setAttributeNode(clickAttr)


}

}


function restaurantReview(clicked_id)
{    

		if(document.getElementById("reviewWritingOverlay").firstChild != null){
			document.getElementById("reviewWritingOverlay").firstChild.remove()
		}
    	document.getElementById("overlayBackground").style.display = "block"
   
	 	var markerId = clicked_id.slice(12)
		var restaurantName = document.getElementById("rowGoogleRestaurant"+markerId).childNodes[4].innerHTML
		console.log(restaurantName)
		//create div to get the restaurant name and the id of the restaurant    	
    	var divContainer = document.createElement("div")
		var divAttr = document.createAttribute("id");
		var classAttr = document.createAttribute("class");
		divAttr.value = "writeReview" + markerId;
		classAttr.value = "titleOverlay";	
	 	divContainer.setAttributeNode(divAttr)
		divContainer.setAttributeNode(classAttr)
		divContainer.innerHTML = "Write a Review for " + restaurantName
		var nodePath = document.getElementById("reviewWritingOverlay")
		nodePath.appendChild(divContainer)	
		
		
		
}


function createStars(clicked_id){
	
	
	
	var i = 0
	console.log("data: "+ starData + " Name :" + starName)
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

/*
document.getElementById("buttonGoogleCancel").addEventListener("click", function (){
	
//	for(i = 1; i <= starData; i++){
//		document.getElementById([i]+starName).style.color = "#2e2b0c";
//	}    	
		
		//document.getElementById("textReview").innerHTML = "";   	
    	
    	
    	document.getElementById("overlayBackground").style.display = "none"
    	
    	
//	starData = ""
})*/