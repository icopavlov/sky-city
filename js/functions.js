
/*-----------------------------------------------------------------*/
/*	General
/*-----------------------------------------------------------------*/

function attachSliderFunctionallityTo( section, options ) {
	try {
		section.slick( "getSlick" );
	} catch {
		$( section ).slick( options !== undefined ? options : {} );
	}
}

function isOpen( section ) {
	return $( section ).hasClass( OPEN_ITEM_CLASS );
}

function open( section ) {
	$( section ).addClass( OPEN_ITEM_CLASS );
}

function close( section ) {
	$( section ).removeClass( OPEN_ITEM_CLASS );
}

function openSlider( serviceGroup ) {
//	serviceGroup.slick( "slickNext" );
	serviceGroup.slick( "slickGoTo", 1 );
}

function closeSlider( serviceGroup ) {
//	serviceGroup.slick( "slickPrev" );
	serviceGroup.slick( "slickGoTo", 0 );
}

function toggle( section ) {
	$( section ).toggleClass( OPEN_ITEM_CLASS );
}

function openSectionHandler( sectionToOpen ) {
	let section = $( sectionToOpen ), 
		sectionHeight = section.outerHeight(),
		sectionHeader = section.find( "header" ),
		sectionHeaderHeight = sectionHeader.outerHeight(),
		sectionHeaderFigure = sectionHeader.find( "figure" ),
		sectionHeaderButton = sectionHeader.find( ".button.open" ),
		sectionMain = section.find( "main" ),
		sectionMainHeight = sectionMain.outerHeight(),
		sectionOpen = false;
	section.height( sectionHeaderHeight );
	section.on( "click", function( e ) {
		let target = $( e.target );
		if ( target.is( "header .button.open" ) ) {
			if ( !sectionOpen ) {
				// sectionHeaderFigure.animate( { "margin-top": -sectionHeaderHeight } );
				section.animate( { "height": sectionHeight }, 500 );
				section.addClass( "open" );
				sectionHeaderButton.html( "По-малко" );
				UIkit.scroll( sectionHeaderButton ).scrollTo( sectionMain );
			} else {
				// sectionHeaderFigure.animate( { "margin-top": 0 } );
				section.removeClass( "open" );
				section.animate( { "height": sectionHeaderHeight }, 500 );
				sectionHeaderButton.html( "Повече" );
				UIkit.scroll( sectionHeaderButton ).scrollTo( sectionHeader );
			}
			sectionOpen = !sectionOpen;
		}
		
	} );
}

/* function openSectionHandler( sectionToOpen ) {
	let section = $( sectionToOpen ), 
		sectionHeight = section.outerHeight(),
		sectionHeader = section.find( "header" ),
		sectionHeaderHeight = sectionHeader.outerHeight(),
		sectionHeaderFigure = sectionHeader.find( "figure" ),
		sectionMain = section.find( "main" ),
		sectionMainHeight = sectionMain.outerHeight(),
		sectionOpen = false;
	section.height( sectionHeaderHeight );
	section.on( "click", function( e ) {
		let target = $( e.target );
		if ( target.is( "header .button.open" ) ) {
			section.animate( { "height": sectionHeight - sectionHeaderHeight }, 500 );
			sectionHeader.animate( { "margin-top": -sectionHeaderHeight }, 500 );
		} else if ( target.is( "main > .button.close" ) ) {
			section.animate( { "height": sectionHeaderHeight }, 500 );
			sectionHeader.animate( { "margin-top": 0 }, 500 );
		}
		
	} );
} */

/* function openSectionHandler( sectionToOpen ) {
	let section = $( sectionToOpen ), 
		sectionHeader = section.find( "header" ),
		sectionMain = section.find( "main" ),
		sectionOpen = false;
	sectionHeader.on( "click", function( e ) {
		let target = $( e.target );
		if ( target.is( ".button.open" ) ) {
			if ( !sectionOpen ) {
				UIkit.scroll( target ).scrollTo( sectionMain );
				section.addClass( "open" );
			} else {
				UIkit.scroll( target ).scrollTo( sectionHeader );
				section.removeClass( "open" );
			}
			sectionOpen = !sectionOpen;
		}
		
	} );
} */


/*-----------------------------------------------------------------*/
/*	Buttons
/*-----------------------------------------------------------------*/

/* function preventDefaultForButtons( e ) {
	let target = $( e.target );
	if ( target.is( ".button" ) ) {
		e.preventDefault();
	}
} */

function buttonsPreventDefault() {
	$( document ).on( "click", function( e ) {
		let target = $( e.target );
		if ( target.is( ".button" ) ) {
			e.preventDefault();
		}
	} );
}


/*-----------------------------------------------------------------*/
/*	Main navigation
/*-----------------------------------------------------------------*/

function toggleNavBasedOn( minPageOffset, wasNavOpen, nav ) {
	if ( minPageOffset ) {
		if ( isOpen( nav ) ) {
			close( nav );
		}
	} else {
		if ( wasNavOpen ) {
			open( nav );
		}
	}
}


/*-----------------------------------------------------------------*/
/*	Main slider
/*-----------------------------------------------------------------*/

function transitionContent( slider ) {
	let prevSlide = slider.find( "." + CURRENT_ITEM_CLASS ), 
		nextSlide = getCurrentSlide( slider );
	if ( nextSlide.is( prevSlide ) ) {
		return;
	}
	prevSlide.removeClass( CURRENT_ITEM_CLASS );
	nextSlide.addClass( CURRENT_ITEM_CLASS );
}

/**
 * Custom function to get the slide the slider is set on at the moment
 */
function getCurrentSlide( slider ) {
	return slider.find( "li" ).eq( slider.slick( "slickCurrentSlide" ) );
}

function toTargetWhenIsButton( clickTarget ) {
	let target = $( clickTarget );
	if ( target.is( ".button.open" ) ) {
		let targetSectionSelector = target.attr( "data-target-selector" ), 
			targetSection = $( targetSectionSelector );
		
		UIkit.scroll( target ).scrollTo( targetSection );
	}
}

function turnOffSliderWhen( scrolledDown, slider ) {
	if ( scrolledDown ) {
		slider.slick( "slickPause" );
	} else {
		slider.slick( "slickPlay" );
	}
}

/*-----------------------------------------------------------------*/
/*	About
/*-----------------------------------------------------------------*/

function toggleWhenIsButton( clickTarget, about ) {
	let target = $( clickTarget );
	const header = 0, 
		main = 1;
		
	if ( target.is( ".button.open" ) ) {
		about.slick( "slickNext" );
		// about.slick( "slickGoTo", main );
	} else if ( target.is( ".button.close" ) ) {
		about.slick( "slickPrev" );
		// about.slick( "slickGoTo", header );
	}
}


/*-----------------------------------------------------------------*/
/*	Services
/*-----------------------------------------------------------------*/

function toggleServiceDescription() {
	let current = null;
	$( "#services .content" ).on( "click", function( e ) {
		let target = $( e.target );
		if ( target.is( ".button.open" ) ) {
			if ( current !== null ) {
				current.removeClass( "current" );
			}
			current = target.parent();
			current.addClass( "current" );
		} else if ( target.is( ".button.close" ) ) {
			current.removeClass( "current" );
			current = null;
		}
	} );
}

/**
 * Custom function that attaches random access section to its corresponding slick instance as a pager navigation
 */
function attachRandomAccessFunctionallity( slider ) {
	let randomAccess = slider.siblings( ".controls" ).find( ".random-access" );
	attachButtonFunctionallity( slider, randomAccess );
	attachUpdateFunctionallity( slider, randomAccess );
}

function attachButtonFunctionallity( slider, randomAccess ) {
	// Each button in the random-access-nav, when clicked, transitions the slider to the corresponding slide
	randomAccess.on( "click", function( e ) {
		let target = $( e.target );
		if ( target.is( "button" ) ) {
			let position = getButtonPos( randomAccess, target );
			slider.slick( "slickGoTo", position );
			// Clicked button is updated immediately after the click, not on the afterChange-event of the slider
			update( randomAccess, position );
		}
	} );
}

function getButtonPos( randomAccess, button ) {
	let buttonHolders = randomAccess.children(), 
		targetButtonHolder = button.closest( "li" );
	return buttonHolders.index( targetButtonHolder );
}

/**
 * Custom function for setting button holders to match the currently selected slide, 
 * when initializing the slider functionallity of the corresponding service group section
 *
 * The class "current" is shifted from the last button holder that had it,
 * to the button holder, corresponding to the current slide
 */
function attachUpdateFunctionallity( slider, randomAccess ) {
	update( randomAccess, 0 );
	slider.on( "afterChange", function( slick, currentSlide ) {
		update( randomAccess, slider.slick( "slickCurrentSlide" ) );
	} );
}

/* function getSlidePos( slider, slide ) {
	return slider.find( "li" ).not( ".slick-cloned" ).index( slide );
} */

function update( randomAccess, currentSlidePos ) {
	let buttonHolders = randomAccess.children(), 
		currentButtonHolder = buttonHolders.filter( "." + CURRENT_ITEM_CLASS );
	if ( currentButtonHolder.length > 0 ) {
		currentButtonHolder.removeClass( CURRENT_ITEM_CLASS );
	}
	buttonHolders.eq( currentSlidePos ).addClass( CURRENT_ITEM_CLASS );
}

/**
 * Highlighting the service holder at the vertical center of the screen in an open service group,
 * of all service holders the central one is found and is marked by a class
 */
function attachSelectHandler( serviceGroup ) {
	let elements = serviceGroup.find( "main.slick-current li" ),
		centerElement = getCenterElement( elements );
	if ( exists( centerElement ) ) {
		centerElement.addClass( "current" );
	}
	
	$( document ).on( "scroll", function() {
		selectCurrent( elements );
	} );
}

/**
 * Detaches the select handler on closing the service group
 */
function detachSelectHandler() {
	$( document ).off( "scroll", selectCurrent );
}

/**
 * Searching for the centered element in the service group elements array,
 * giving it a class to mark it, in case there is such,
 * and removing the same class from the previously centered element
 */
function selectCurrent( elements ) {
	let currentElement = getCurrentElement( elements ), 
		centerElement = null;
	if ( !exists( currentElement ) ) {
		centerElement = getCenterElement( elements );
		if ( !exists( centerElement ) ) {
			return;
		}
		centerElement.addClass( "current" );
		return;
	}
	
	if ( !isCentered( currentElement ) ) {
		currentElement.removeClass( "current" );
		centerElement = getCenterElement( elements );
		if ( exists( centerElement ) ) {
			centerElement.addClass( "current" );
		}
	}
}

function exists( element ) {
	return element !== null && element.length > 0;
}

/**
 * Returns the service holder, located at the center af the screen, if there is such,
 * or null if there is no such element, i.e. all service holders are below or above the central line
 */
function getCenterElement( elements ) {
	for ( let i = 0; i < elements.length; i++ ) {
		let element = elements.eq( i );
		if ( isCentered( element ) ) {
			return element;
		}
	}
	return null;
}

function getCurrentElement( elements ) {
	return elements.filter( ".current" ).eq( 0 );
}

/**
 * Function to test if the element is located on the line, marking the center of the screen
 */
function isCentered( element ) {
	let scrollTop = $( document ).scrollTop(),
		minScrollTop = element.offset().top - $( window ).height() / 2, 
		maxScrollTop = minScrollTop + element.outerHeight( true );
		
	return scrollTop < maxScrollTop && scrollTop > minScrollTop;
}


/*-----------------------------------------------------------------*/
/*	Contact info
/*-----------------------------------------------------------------*/


/*-----------------------------------------------------------------*/
/*	Scroll to top button
/*-----------------------------------------------------------------*/

function scrollToTopToggle( scrollToTopButton ) {
	let timer = null, 
		doc = $( document ),
		mouseOver = false;
		
	// Repeatedly stopping and starting the timer that eventually hides the button, while scrolling
	doc.on( "scroll", function() {
		if ( doc.scrollTop() < SCROLL_TO_TOP_BUTTON_SCROLL_DISTANCE_TO_REVEAL || mouseOver ) {
			return;
		}
		if ( timer !== null ) {
			clearTimeout( timer );
		}
		timer = reveal( scrollToTopButton );
	} );
	
	// Stopping the timer, when the mouse goes over the button
	scrollToTopButton.on( "mouseenter", function() {
		clearTimeout( timer );
		mouseOver = true;
	} );
	
	// Starting the timer again, when the mouse leaves the button
	scrollToTopButton.on( "mouseleave", function() {
		timer = reveal( scrollToTopButton );
		mouseOver = false;
	} );
	
}

function reveal( element ) {
	element.addClass( SCROLL_TO_TOP_BUTTON_REVEAL_CLASS );
	return setTimeout( function() {
		element.removeClass( SCROLL_TO_TOP_BUTTON_REVEAL_CLASS );
	}, SCROLL_TO_TOP_BUTTON_TIMEOUT_TO_HIDE );
}














