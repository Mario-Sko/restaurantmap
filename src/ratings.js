import React from 'react';
//<div> <i className="fas fa-star"></i>{props.allSymbolStars}	</div>
					//<div className= {props.reviewColumn}>stars: {test}</div>


const ratings = ( props ) => {
	
	var loops =  props.stars
	var allStars = []
	var star = (
	<i className="fas fa-star symbolStarDesign"></i>
	)
	
	var allStarsSymbolDisplay = () => {
		allStars = [];
		for(var i = 0; i < loops; i++){
			 allStars[i] = star
		}
		
		 return allStars.map(x => x);
	}
	
	
	

	//			
    return (
		<div  className={props.bootstrapContainer}>
			<div className={props.bootstrapRow + " eachReviewDesign"}>
			
					<div className={props.reviewColumn}>{allStarsSymbolDisplay()}</div>
		
					
					<div className= {props.reviewColumn}>{props.comment}</div>
			</div>
		</div>
    )
};

export default ratings;