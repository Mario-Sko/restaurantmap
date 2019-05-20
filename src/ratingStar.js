import React from 'react';

const ratingStar = ( props ) => {
	
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
	
			
 return (
	<div className={"col-sm-12 eachReviewDesign"}>		
		{allStarsSymbolDisplay()}
		
					
				
	</div>
  )
};

export default ratingStar;