import React from 'react';



	

class CreateGoogleReview extends React.Component {
state={
		createStars: "",	
		value:"",
	
	}


	createOneStars = this.createOneStars.bind(this)
	createTwoStars = this.createTwoStars.bind(this)
	createThreeStars = this.createThreeStars.bind(this)
	createFourStars = this.createFourStars.bind(this)
	createFiveStars = this.createFiveStars.bind(this)
	textareaChange = this.textareaChange.bind(this);
	googleSubmit = this.googleSubmit.bind(this)
//	restaurantReview = this.restaurantReview.bind(this)
	
 restaurantReview =  (event) =>{
    	document.getElementById("overlayBackground").style.display = "none"
    	console.log("jetzteewrr " + "clicked_id")
    	
    	//return clicked_id
}

checkWrongTextDelete =() =>{
if(document.getElementById("wrong").style.display == "block") {
			document.getElementById("wrong").style.display="none"
			}

}

	
overlayClose = () => {
	this.checkWrongTextDelete()
	document.getElementById("textReview").value = ""
			var starsDelete = null			
			this.viewClickStars(starsDelete)	
		
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

textareaChange(event) {
		this.setState({value: event.target.value});
		
	  }



	

	
	googleSubmit (createStars) {
		// <i id={"1star" + this.props.item.idNumber} className="fas fa-star overlayEachStar" onClick={this.createOneStar}></i>
		 
		var v = document.getElementById("1GoogleStar").style.color
		
createStars = this.state.createStars
		
		
		
		if(v == "rgb(242, 171, 0)"){
		//this.setState({isCreatingReview: true});
			this.checkWrongTextDelete()
			var getMarkerID = document.getElementById("reviewWritingOverlay").firstChild.id
			 getMarkerID = getMarkerID.slice(11)			
			var contentTextarea = document.getElementById("textReview").value
			var allStars = starsInSymbol(createStars)
			console.log(allStars)
			//create review
			
			googleContactDiv (getMarkerID,contentTextarea)
			googleContactDiv (getMarkerID,allStars)
			
			document.getElementById("textReview").value = ""
			var starsDelete = null			
			this.viewClickStars(starsDelete)			
			
						
			document.getElementById("overlayBackground").style.display="none"	
		} else {
		 
		document.getElementById("wrong").style.display="block"
		
	 }


	function googleContactDiv (getMarkerID,contentTextarea){
		
				var divContainer = document.createElement("div")
				var classAttr = document.createAttribute("class");
				classAttr.value = "col-sm-12";				
				divContainer.setAttributeNode(classAttr)
				divContainer.innerHTML = contentTextarea
				var nodePath = document.getElementById("rowgoogleRestaurantReview" + getMarkerID)
			return  nodePath.insertBefore(divContainer, nodePath.childNodes[0]);
								
	}
	 
	function starsInSymbol(createStars){
		var allSymbolStars = ""
		var symbol = '<i class="fas fa-star symbolStarDesign"></i>'
		var stars = createStars
		//this.state.createStars
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
								<textarea id="textReview" className="textareaDesign" onClick={this.textareaChange} > </textarea>
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
