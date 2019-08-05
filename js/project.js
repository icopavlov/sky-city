/**
 * Initializing the contact info section functionallity
 */
$( document ).ready( function() {
	
} );

/*-----------------------------------------------------------------*/
/*	Buttons
/*-----------------------------------------------------------------*/

/**
 * Turning off the default behaviour of the buttons, that are actually link elements 
 */
$( document ).ready( function() {
	
	buttonsPreventDefault();

} );


/*-----------------------------------------------------------------*/
/*	Main navigation
/*-----------------------------------------------------------------*/

$( document ).ready( function() {
	let mainNav = $( "#main-nav" ),
		wasNavOpen = false;

	/**
	 * Clicking on the navigation open/close button:
	 * adds/removes a class to the navigation itself, that toggles its visibility and
	 * saves the current state of the navigation in a variable
	 */
	$( "header" ).on( "click", function( e ) {
		let target = $( e.target );
		if ( target.is( "#main-nav .button.open" ) ) {
			toggle( mainNav );
			wasNavOpen = !wasNavOpen;
		}
	} );
	
	/**
	 * In case the navigation is turned on, scrolling the page down turns it off and
	 * scrolling up to the top turns it back on 
	 */
	$( document ).on( "scroll", function() {
		toggleNavBasedOn( window.pageYOffset > 0, wasNavOpen, mainNav );
	} );
	
	/**
	 * Initializing main navigation smooth scrolling functionallity, 
	 * selecting main nav current button
	 */
	UIkit.scrollspyNav( mainNav, {
		cls: CURRENT_ITEM_CLASS,
		scroll: true
	} );
} );


/*-----------------------------------------------------------------*/
/*	Main slider
/*-----------------------------------------------------------------*/

$( document ).ready( function() {
	let slider = $( "#slider .content" );
	
	/**
	 * Initializing the slider with dots only
	 */
	attachSliderFunctionallityTo( slider, sliderSlideOptions );
	attachRandomAccessFunctionallity( slider );
	
	/**
	 * Implementing slider content animation
	 *
	 * Listening for slider's "afterChange" event, triggered by current slide entering the viewport and 
	 * removing a class from the previous slide, while adding the same class to the current slide
	 * 
	 * The previous and the current slide are compared and 
	 * the highlighting class is moved from the previous slide to the next one 
	 * only in case of an actual slide transition,
	 * but not when the current slide dragging distance is under the transition threshold,
	 * and despite the slide moving and an "afterChange" event is fired, the slide returns back and does not change
	 */
	transitionContent( slider );
	slider.on( "afterChange", function( event, slick, currentSlide ) {
		transitionContent( slider );
	} );
	
	/**
	 * Clicking on a slide button calls UIkit's scrollTo method to direct to the corresponding service section
	 */
	$( "#slider" ).on( "click", function( e ) {
		toTargetWhenIsButton( e.target );
	} );

	/**
	 * Turning off the slider on scrolling the page down,
	 * because of the slider variable height on slide transition 
	 */	
	$( document ).on( "scroll", function( e ) {
		turnOffSliderWhen( window.pageYOffset > 0, slider );
	} );
	
} );


/*-----------------------------------------------------------------*/
/*	About
/*-----------------------------------------------------------------*/

$( document ).ready( function() {
	let about = $( "#about .body" );
	
	about.slick( aboutSlideOptions );
	
	about.on( "click", function( e ) {
		let target = $( e.target );
			
		if ( target.is( ".header .button.open" ) ) {
			openSlider( about );
		} else if ( target.is( ".main > .button.close" ) ) {
			closeSlider( about );
		}
		
	} );
	
	// openSectionHandler( "#about" );
	
	/**
	 * Initializing the about section slider functionallity
	 */
	/* attachSliderFunctionallityTo( about, aboutSlideOptions ); */
	
	/**
	 * Listening for clicks on the about section and in case the open or close button was clicked,
	 * the slickSlider goTo(index)-method is called and index=1 (open) or index=0 (close) is passed to it
	 */
	/* about.on( "click", function( e ) {
		toggleWhenIsButton( e.target, about );
	} ); */
} );


/*-----------------------------------------------------------------*/
/*	Services
/*-----------------------------------------------------------------*/

$( document ).ready( function() {
	
	toggleServiceDescription();
	
	// openSectionHandler( "#services" );
	
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
	
	/* let services = $( "#services" ), 
		serviceGroup = services.find( ".service-group" ).eq( 0 ),
		serviceContent = serviceGroup.find( ".content" ),
		servicesOpen = false;
	serviceGroup.on( "click", function( e ) {
		let target = $( e.target );
		if ( target.is( "header .button.open" ) ) {
			if ( !servicesOpen ) {
				UIkit.scroll( target ).scrollTo( serviceContent );
				serviceGroup.addClass( "open" );
			} else {
				UIkit.scroll( target ).scrollTo( serviceGroup );
				serviceGroup.removeClass( "open" );
			}
			servicesOpen = !servicesOpen;
		}
		
	} ); */
	
	/* let services = $( "#services" ),
		header = services.find( "header" ).eq( 0 ),
		headerFigure = header.find( "figure" ),
		headerFigureHeight = headerFigure.outerHeight(),
		headerTitle = header.find( "h3" ),
		headerButton = header.find( ".button.open" ),
		servicesHeight = services.outerHeight(),
		headerHeight = services.find( "header" ).outerHeight(),
		main = services.find( "main" ),
		mainHeight = main.outerHeight(),
		servicesOpen = false;
		
	// services.css( "height", headerHeight );
	// services.css( "overflow", "hidden" );
	main.css( "height", 0 );
	main.css( "overflow", "hidden" );
	services.on( "click", function( e ) {
		let target = $( e.target ), 
			headerButtonWidth = headerButton.outerWidth();
		if ( target.is( "header .button.open" ) ) {
			if ( !servicesOpen ) {
				// services.css( "overflow", "visible" );
				headerFigure.animate( { "margin-top": -headerFigureHeight }, 500 );
				// services.animate( { "height": servicesHeight - 400 }, 500 );
				main.animate( { "height": mainHeight }, 500 );
				headerButton.html( "Вижте по-малко" );
			} else {
				// services.css( "overflow", "hidden" );	
				headerFigure.animate( { "margin-top": 0 }, 500 );
				// services.animate( { "height": headerHeight }, 500 );
				main.animate( { "height": 0 }, 500 );
				headerButton.html( "Вижте повече" );
			}
			servicesOpen = !servicesOpen;
		}
		
	} ); */
	
	let serviceGroups = $( "#services .service-group" );
	serviceGroups.slick( servicesContentOptions );
	
	serviceGroups.on( "click", function( e ) {
		let target = $( e.target ), 
			targetServiceGroup = $( this );
			
		if ( target.is( ".header .button.open" ) ) {
			openSlider( targetServiceGroup );
		} else if ( target.is( ".main > .button.close" ) ) {
			closeSlider( targetServiceGroup );
		}
		
	} );
	
	/* serviceGroups.on( "afterChange", function( e, slick, currentSlide ) {
		
		let targetServiceGroup = $( this ), 
			currentPos = targetServiceGroup.slick( "slickCurrentSlide" );
			
		if ( currentPos == 1 ) {
			attachSelectHandler( targetServiceGroup );
		} else if ( currentPos == 0 ) {
			detachSelectHandler( targetServiceGroup );
		}
		
	} ); */
	
	/* let services = $( "#services" );
	services.on( "click", function( e ) {
		let target = $( e.target ), 
			targetServiceGroup = target.parents( ".service-group" );
			
		if ( target.is( ".button.open" ) ) {
			openSlider( targetServiceGroup );
			attachSelectHandler( targetServiceGroup );
		} else if ( target.is( ".button.close" ) ) {
			closeSlider( targetServiceGroup );
			detachSelectHandler( targetServiceGroup );
		}
		
	} ); */
	
} );


/*-----------------------------------------------------------------*/
/*	Contact info
/*-----------------------------------------------------------------*/

/**
 * Initializing the contact info section functionallity
 */
$( document ).ready( function() {
	let contactInfo = $( "#contact-info .contact-info-items" ), 
		randomAccess = contactInfo.siblings( ".controls" ).find( ".random-access" );
	attachSliderFunctionallityTo( contactInfo, contactInfoSlideOptions );
	attachRandomAccessFunctionallity( contactInfo );
	randomAccess.on( "click", function( e ) {
		let target = $( e.target );
		if ( target.is( ".random-access button" ) ) {
			contactInfo.slick( "slickPause" );
		}
		
	} );
} );


/*-----------------------------------------------------------------*/
/*	UI Kit
/*-----------------------------------------------------------------*/

/**
 * Initializing UI Kit Scroll component allows specifying custom speed for the animated scroll
 */
$( document ).ready( function() {
	UIkit.component( 'scroll', UIkit.component( 'scroll' ).extend( {
		data: {
			duration: 400
		}
	} ) );
} );


/*-----------------------------------------------------------------*/
/*	Scroll to top button
/*-----------------------------------------------------------------*/

$( document ).ready( function() {
	let scrollToTopButton = $( "header .scroll-to-top" );
	
	/**
	 * Initializing scroll-to-top button smooth scrolling functionallity
	 */
	UIkit.scroll( scrollToTopButton );
	
	/**
	 * Adding and removing designated class to scroll-to-top button
	 * for revealing or hiding the button, depending on the page scroll position
	 */
	scrollToTopToggle( scrollToTopButton );
	
	/* let timer = null;
	$( document ).on( "scroll", function() {
		if ( timer !== null ) {
			clearTimeout( timer );
		}
		timer = toggleBasedOn( window.pageYOffset, scrollToTopButton );
	} ); */
	
	/* $( document ).on( "scroll", function() {
		toggleBasedOn( window.pageYOffset, scrollToTopButton );
	} ); */
} );


/*-----------------------------------------------------------------*/
/*	Form
/*-----------------------------------------------------------------*/

$( document ).ready( function() {
	let formFields = $( "#send-email form" ).children( "dl:not( :last-child )" );
	
	formFields.each( function( index, element ) {
		let fieldHolder = $( element ), 
			label = fieldHolder.find( "dt" ).children(), 
			field = fieldHolder.find( "dd" ).children();
		
		field.on( "focus", function() {
			fieldHolder.addClass( "focused" );
		} );
		
		field.on( "blur", function() {
			if ( field.val().length !== 0 ) {
				return;
			}
			fieldHolder.removeClass( "focused" );
		} );
		
	} );
		
} );































