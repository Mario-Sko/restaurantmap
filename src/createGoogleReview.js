import React from 'react';

// create a review from the google restaurant near your place (geo location)

class CreateGoogleReview extends React.Component {
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
    	document.getElementById("overlayBackground").style.display = "none"
	}		

	checkWrongTextDelete =() =>{
	if(document.getElementById("wrong").style.display === "block") {
			document.getElementById("wrong").style.display="none"
		}
	}
	
	overlayClose = () => {
		this.checkWrongTextDelete()
		document.getElementById("textReview").value = ""
		var starsDelete = null			
		this.viewClickStars(starsDelete)	
		document.getElementById("mainOverlayBackground").style.display = "none"
		document.getElementById("overlayBackground").style.display="none"	
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
		var x = ["1GoogleStar", "2GoogleStar", "3GoogleStar", "4GoogleStar", "5GoogleStar"]
		var i = 0
		for(i = 0; i < length; i++){
		document.getElementById(x[i]).style.color = "#f2ab00";
		}
	
		for(  ; i < 5; i++){
			document.getElementById(x[i]).style.color = "#2e2b0c";
		}
	}	
	
	googleSubmit (createStars) {		
		var v = document.getElementById("1GoogleStar").style.color		
		createStars = this.state.createStars
		if(v === "rgb(242, 171, 0)"){
			this.checkWrongTextDelete()
			var getMarkerID = document.getElementById("reviewWritingOverlay").firstChild.id
			 getMarkerID = getMarkerID.slice(11)			
			var contentTextarea = document.getElementById("textReview").value
			var allStars = starsInSymbol(createStars)
			
			//create review
			
			googleContactDiv (getMarkerID,contentTextarea, "reviewText")
			googleContactDiv (getMarkerID,allStars,"reviewSymbol", createStars)
						
			document.getElementById("textReview").value = ""
			var starsDelete = null			
			this.viewClickStars(starsDelete)		
			document.getElementById("mainOverlayBackground").style.display = "none"		
			document.getElementById("overlayBackground").style.display="none"	
		} else {
			document.getElementById("wrong").style.display="block"
	 	}

		function googleContactDiv (getMarkerID,contentTextarea, currentIdName,createStars){
		   let whereIstheRestaurant = getMarkerID.slice(0,1)
		   getMarkerID = getMarkerID.slice(1)
		   var idNameReviewSection
		   var howManyReviews
		   var idName 
			if (whereIstheRestaurant === "g"){
			
				//parseint for the textreview because this is always .5 
				var BeforeHowManyReviews= parseInt(document.getElementById("rowgoogleRestaurantReview" + getMarkerID).childElementCount / 2)
				idName = BeforeHowManyReviews + currentIdName + getMarkerID				
				idNameReviewSection = "rowgoogleRestaurantReview"				
				howManyReviews=  parseInt(document.getElementById("rowgoogleRestaurantReview" + getMarkerID).childElementCount / 2)
			}else{
				idNameReviewSection = "rowreviewNewRestaurant"
				BeforeHowManyReviews= parseInt(document.getElementById("rowreviewNewRestaurant" + getMarkerID).childElementCount / 2)
				idName = BeforeHowManyReviews + currentIdName + getMarkerID	
				howManyReviews=  parseInt(document.getElementById("rowreviewNewRestaurant" + getMarkerID).childElementCount / 2)	
		
			}
			var divContainer = document.createElement("div")
			var idAttr = document.createAttribute("id");
			var classAttr = document.createAttribute("class");
			idAttr.value = idName;				
			classAttr.value = "col-sm-12";				
			divContainer.setAttributeNode(idAttr)
			divContainer.setAttributeNode(classAttr)
			divContainer.innerHTML = contentTextarea		
			var nodePath = document.getElementById(idNameReviewSection + getMarkerID)
			nodePath.insertBefore(divContainer, nodePath.childNodes[0]);
			
			if(currentIdName ==="reviewSymbol"){
				
				var getDiv = document.getElementById(idName)				
				var starDataAttr = document.createAttribute("stardata");
				starDataAttr.value = createStars;			
				getDiv.setAttributeNode(starDataAttr)					
						
				//calculate the average stars reviews
				var allStarsSummarize = 0
				for(let i = 0; i < howManyReviews -1; i++){
					var starsEachReview = parseInt(document.getElementById([i + 1] + currentIdName + getMarkerID).getAttribute("stardata"))		
					allStarsSummarize += starsEachReview
				}
				 
				allStarsSummarize = allStarsSummarize + createStars					
				var averageStars = allStarsSummarize / howManyReviews
				averageStars = (Math.round(averageStars * 10)/10).toFixed(1)
				if( idNameReviewSection === "rowgoogleRestaurantReview"){				
					document.getElementById("averageStarText" +getMarkerID ).innerHTML = averageStars				
				}else{						
					document.getElementById("addingAverageStarText" +getMarkerID ).innerHTML = averageStars			
				}						
			}
		}
		
		function starsInSymbol(createStars){
			var allSymbolStars = ""
			var symbol = '<i class="fas fa-star symbolStarDesign"></i>'
			var stars = createStars
			for(var i = 0; i < stars; i++){	
				allSymbolStars +=  symbol
			}
			return  allSymbolStars
		}	 	 
	}

render() {
   
    return ( 
	    	<div id="overlayBackground" className="overlayBackgroundDesignNumber">
					<div id="overlay" className="overlayDesign">
						<div className= "container">
							<div className= "row">
								<div className="col-1"></div>
								<div className="col-sm-10" >
								 <form >
								 	<div id ="reviewWritingOverlay"></div>
									<div id= "wrong" className="wrong"> I am sorry, you forgot to give us 5 stars</div>
									<div className="overlayStarDesign" >	
										<i id="1GoogleStar" className="fas fa-star overlayEachStar" onClick={this.createOneStars}></i> 
										<i id="2GoogleStar" className="fas fa-star overlayEachStar" onClick={this.createTwoStars}></i>  
										<i id="3GoogleStar" className="fas fa-star overlayEachStar" onClick={this.createThreeStars}></i> 
										<i id="4GoogleStar" className="fas fa-star overlayEachStar" onClick={this.createFourStars}></i> 
										<i id="5GoogleStar" className="fas fa-star overlayEachStar" onClick={this.createFiveStars}></i> 
									</div>
									<textarea id="textReview" className="textareaDesign"></textarea>
									<div>
										<div  className="container">
											<div className= "row overlayButton">
												<div className="col-sm-6"> 
													<button id="buttonGoogleCancel" className="btn buttonDesign buttonDesingoverlay" type="button"  onClick={this.overlayClose}  >Cancel</button>
												</div>
												<div className="col-sm-6"> 
													<button id="buttongGoogleSumit" className="btn buttonDesign buttonDesingoverlay"  type="button"  onClick={this.googleSubmit}> submit  </button>
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

export default CreateGoogleReview;
