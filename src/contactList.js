import React from 'react';
import RatingStar from './ratingStar';
import RatingComment from './ratingComment'
import CreateReview from './createReview'
//import './contactList.css';


class ContactList extends  React.Component {
	state = {
		
		iterationAllStars:  0,
		allRatings: this.props.item.ratings,
		marginColumn: "col-1",
		textareaColum: "col-10",
		pictureColumn: "col-sm-2",
		textColumn: "col-sm-10",
		reviewColumn:  "col-sm-12",
		bootstrapContainer: "container",
		bootstrapRow: "row",
		allSymbolStars: null,
		value: "",
		createStars: "",
		isCreatingReview: false, 
		isSearch: false,
		valueSearchBegin: "",
		valueSearchEnd: "",
	}
	
	textareaChange = this.textareaChange.bind(this);	
	createOneStar = this.createOneStar.bind(this)
	createTwoStars = this.createTwoStars.bind(this)
	createThreeStars = this.createThreeStars.bind(this)
	createFourStars = this.createFourStars.bind(this)
	createFiveStars = this.createFiveStars.bind(this)
	handleSearch = this.handleSearch.bind(this)
	handleSearchStop = this.handleSearchStop.bind(this)
	inputSearchBegin = this.inputSearchBegin.bind(this)
	inputSearchEnd = this.inputSearchEnd.bind(this)
	allStarsCalculate = this.allStarsCalculate
	handleCreateReview = this.handleCreateReview.bind(this);
	handleStopWritingReview = this.handleStopWritingReview.bind(this);
  
	handleSearch(){
		this.setState({isSearch: true});	 
	}
  
	 handleSearchStop(){
		this.setState({isSearch: false});
	}
  
	inputSearchBegin(event) {
		this.setState({valueSearchBegin: event.target.value});		
	}

	inputSearchEnd(event) {
		this.setState({valueSearchEnd: event.target.value});	
	}

	handleCreateReview() {	 
		var v = document.getElementById("1star" + this.props.item.idNumber).style.color
		console.log("color: " + v)
		if(v == "rgb(242, 171, 0)"){
		this.setState({isCreatingReview: true});
			if(document.getElementById("wrong" +this.props.item.idNumber).style.visibility == "visible") {
				document.getElementById("wrong" +this.props.item.idNumber).style.visibility="hidden"
			}	
		} else {
			document.getElementById("wrong" +this.props.item.idNumber).style.visibility="visible"		
	 	} 
	}

	handleStopWritingReview() {
		this.setState({isCreatingReview: false});
	}

	allStarCalculateReviewWriting = () => {
		var iteration = 0
		var countStars = 0
		this.state.allRatings.map((eachAverage, index) => {
			iteration = iteration + 1 
			countStars = countStars + eachAverage.stars
		})	
  //countStars = countStars + this.state.createStars
	
		var divCounts = document.getElementById("reviewRow" + this.props.item.idNumber).childNodes //document.getElementsByTagName("reviewRow" + this.props.item.idNumber );
		var numTabs = 0;
		for (var i = 0; i < divCounts.length; i++) {
			numTabs++;
		}
		
		var allStarsWriting = 0
		var  eachStarWriting 
		var j = 0
		for( ; j < numTabs;){
			eachStarWriting = document.getElementById("reviewRow" + this.props.item.idNumber).children[j].getAttribute("starData"); //document.getElementsByTagName("reviewRow" + this.props.item.idNumber );
			eachStarWriting = parseInt(eachStarWriting)
			allStarsWriting = allStarsWriting + eachStarWriting
			j = j + 2
		}	
			
		numTabs = numTabs / 2
		countStars = countStars + allStarsWriting
 		iteration = iteration + numTabs
		countStars = countStars / iteration
		return countStars = (Math.round(countStars * 10)/10).toFixed(1)
	}
	
	allStarsCalculate = () => { 
	
if(document.getElementById("star" + this.props.item.idNumber) == null){ 
	
		var iteration = 0
		var countStars = 0
		this.state.allRatings.map((eachAverage, index) => {
		iteration = iteration + 1 
		countStars = countStars + eachAverage.stars
		})	
	

	
		if (isNaN(countStars) || countStars == "") {
			return this.state.allStars = "No Review" 
		}				

			//this.setState({allStars : countStars})
			console.log("star " + this.state.allStars)
		
		
		countStars = countStars / iteration
		return countStars = (Math.round(countStars * 10)/10).toFixed(1)
		}
}
		starsInSymbol = (stars) => {
			this.state.allSymbolStars = []
			var symbol = '<i className="fas fa-star"></i>'

			for(var i = 0; i < stars; i++){	
				this.state.allSymbolStars[i] =  symbol
			}
			return  this.state.allSymbolStars
		}

		creatingYourReview = () => {
			document.getElementById("overlayBackground" + this.props.item.idNumber).style.display="block"
			document.getElementById("overlayBackground").style.display="block"
		
		}

		overlayClose = () => {
			document.getElementById("overlayBackground" + this.props.item.idNumber).style.display="none"	
			document.getElementById("overlayBackground").style.display="none"	
		}

		createOneStar (event)  {
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
	 
	  textareaChange(event) {
			this.setState({value: event.target.value});
	  }

	viewClickStars =(length) => {
		var x = ["1star", "2star", "3star", "4star", "5star"]
		var i = 0
		for(i = 0; i < 5; i++){
			document.getElementById(x[i] +  this.props.item.idNumber).style.color = "#2e2b0c";
	}	
	
	for(i = 0; i < length; i++){
		document.getElementById(x[i] +  this.props.item.idNumber).style.color = "#f2ab00";
	
	}
}

render() {
	const isCreatingReview = this.state.isCreatingReview;
	const isSearch = this.state.isSearch;
   let button;

	if(isSearch == true){		
		var searchingStart = document.getElementById("searchBegin").value
		var searchingEnd = document.getElementById("searchEnd").value	
	}

	if (isCreatingReview ==true) { 

		var loopsAllStars =  this.state.createStars	
		var star = 	'<i class="fas fa-star symbolStarDesign"></i>'
	
		var allStarsSymbolDisplay =() => {
			var allStars ="";
		
			for(var i = 0; i < loopsAllStars; i++){
				allStars = star + allStars
			}
			return allStars
		}
	
		var contentReview = [this.state.value, allStarsSymbolDisplay()]
		var loopsContentReview = contentReview.length
		
		//Create review content
		for(var i = 0; i < loopsContentReview; i++){
			var divContainer = document.createElement("div")
			var classAttr = document.createAttribute("class");
			var starData = document.createAttribute("starData");
			if( i == 1){	
				classAttr.value = "col-sm-12 eachReviewDesign";
				starData.value = loopsAllStars
			}else{ 
				classAttr.value = "col-sm-12";
			}
			divContainer.setAttributeNode(classAttr)
			divContainer.setAttributeNode(starData)
			divContainer.innerHTML = contentReview[i]
			var n = document.getElementById("reviewRow" + this.props.item.idNumber)
			n.insertBefore(divContainer, n.childNodes[0])		
		}		
	}

	//save the values, close overlay, if you write again, the website write not automatically
   if (isCreatingReview == true) {
		var changeCalculate = this.allStarCalculateReviewWriting() 
    	document.getElementById("star" + this.props.item.idNumber).innerHTML = changeCalculate
	 	button = <ButtoncreateReview onClick={this.handleStopWritingReview} />;
	 	{this.handleStopWritingReview()}  
	 	{this.overlayClose()}
    }

	function ButtoncreateReview(props) {	
		return (
			<button type="button" className="btn buttonDesign buttonDesingoverlay" onClick={props.onClick}>
				Create
			</button>
		);
	}		
	var v = []
	var allRatings = this.props.item.ratings
	
	var eachRating = (
		
		allRatings.map((review, index) => {
			var stars = review.stars
								
			return 	<div id={this.props.item.idNumber + "reviewNumber" + index }  className={"container"}><div className={"row"}> <RatingStar 
							stars= {review.stars} //{this.props.item.ratings.stars}
							comment= {review.comment}
							allStarsSymbol = {this.starsInSymbol(stars)}
							pictureColumn = {this.state.pictureColumn}
							textColumn = {this.state.textColumn}
							reviewColumn = {this.state.reviewColumn}
							bootstrapContainer = {this.state.bootstrapContainer}
							bootstrapRow = {this.state.bootstrapRow}
							allSymbolStars = {this.state.allSymbolStars}
						/>
						<RatingComment
							stars= {review.stars} //{this.props.item.ratings.stars}
							comment= {review.comment}
							allStarsSymbol = {this.starsInSymbol(stars)}
							pictureColumn = {this.state.pictureColumn}
							textColumn = {this.state.textColumn}
							reviewColumn = {this.state.reviewColumn}
							bootstrapContainer = {this.state.bootstrapContainer}
							bootstrapRow = {this.state.bootstrapRow}
							allSymbolStars = {this.state.allSymbolStars}
						/>
						</div>
						</div>		
				})	
			)

return(	
			<div id={"restaurant" + this.props.item.idNumber}>	
				<div className= "container">
					<div className= "row">	
						<div><img className="imgDesign" src={this.props.item.img}></img>
						</div>
					</div>
				</div>
				<div className= "container containerResult">
					<div className= "row">		
						<div id={"star" + this.props.item.idNumber}  className="col-sm-10 contactfield resultFontDesign">{this.allStarsCalculate()} </div>
						<div className="col-sm-2 contactfield"  ><i className="fas fa-star symbolStarDesign"></i></div>
					</div>
				</div>
				<div className= "container" >
					<div className= "row">
						<div className= "col-sm-2 contactfield" ><i className="fas fa-store-alt symbolDesign"></i></div>
						<div id = {"name" + this.props.item.idNumber} className="col-sm-10 contactfield" >{this.props.item.name}</div>
					</div>
				</div>	
				<div className= "container">
					<div className= "row">
						<div className= "col-sm-2 contactfield" > <i className="fas fa-map-marked-alt symbolDesign"></i> </div>
						<div id =  {"address " +  this.props.item.idNumber}  className="col-sm-10 contactfield"  >{this.props.item.address}</div>
					</div>
				</div>
				<div className= "container">
					<div className= "row">
						<div className= "col-sm-2 contactfield" > <i className="fas fa-phone symbolDesign"></i> </div>
						<div id = {"phone" + this.props.item.idNumber}  className="col-sm-10  contactfield">{this.props.item.phone}</div>
					</div>
				</div>
				<div id={"emailContainer"  + this.props.item.idNumber} className= "container">
					<div className= "row">
						<div className="col-sm-2 contactfield"> <i className="fas fa-at symbolDesign"></i> </div>
						<div id = {"email" + this.props.item.idNumber}  className="col-sm-10 contactfield">{this.props.item.email}</div>
					</div>
				</div>
				<div className="container allReviewDesign">
					<div className="row">
						<div className= "container">
							<div id={"reviewRow"  + this.props.item.idNumber} className="row">
							</div>
						</div>
						{eachRating}	
					</div>
				</div>
				<div id={"overlayBackground"  + this.props.item.idNumber } className={"overlayBackgroundDesignNumber"}>
					<div id={"overlay" + this.props.item.idNumber} className="overlayDesign">
						<div className= {"container"}>
							<div className= {"row"}>
								<div className={"col-1"} ></div>
								<div className={"col-sm-10"} >
									<form onSubmit={this.reviewSubmit}>
										<div id={"wrong" +this.props.item.idNumber} className="wrong"> I am sorry, you forgot to give us 5 stars
										</div>
										<div className={"overlayStarDesign"} >	
											<i id={"1star" + this.props.item.idNumber} className="fas fa-star overlayEachStar" onClick={this.createOneStar}></i> 
											<i id={"2star" + this.props.item.idNumber} className="fas fa-star overlayEachStar" onClick={this.createTwoStars}></i>  
											<i id={"3star" + this.props.item.idNumber} className="fas fa-star overlayEachStar" onClick={this.createThreeStars}></i> 
											<i id={"4star" + this.props.item.idNumber} className="fas fa-star overlayEachStar" onClick={this.createFourStars}></i> 
											<i id={"5star" + this.props.item.idNumber} className="fas fa-star overlayEachStar" onClick={this.createFiveStars}></i> 
										</div>
										<textarea className="textareaDesign" value={this.state.value} onChange={this.textareaChange}> 
										</textarea>
										<div>
											<div className= {this.state.bootstrapContainer}>
												<div className= {this.state.bootstrapRow}>
													<div className="col-sm-6"> 
														<button id={"cancel" + this.props.item.idNumber} type="button" className="btn buttonDesign buttonDesingoverlay" onClick={this.overlayClose}>Cancel
														</button>
													</div>
													<div className="col-sm-6"> 
														<ButtoncreateReview id={"sumit" + this.props.item.idNumber}  type="submit" value="Submit"  onClick={this.handleCreateReview} />
													</div>
												</div>
											</div>
										</div>
									</form>
								</div>
							<div className="col-1" ></div>		
						</div>
					</div>
				</div>
			</div>
		<div>
			<button  id={"button" + this.props.item.idNumber} type="button" className="btn buttonDesign" onClick={this.creatingYourReview}>Write
			</button>
		</div>
	</div>
  )
 }
}
export default ContactList;
