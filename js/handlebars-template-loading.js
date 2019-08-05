/*-----------------------------------------------------------------*/
/*	Handlebars
/*-----------------------------------------------------------------*/

/**
 * Loading section content through Handlebars
 */
$( document ).ready( function() {
	
	loadTemplate( "body > header", "#header-template", headerContent );
	loadTemplate( "#slider", "#slider-template", sliderContent );
	loadTemplate( "#about", "#about-template", aboutContent );
	loadTemplate( "#services", "#services-template", servicesContent );
	loadTemplate( "#contact-info", "#contact-info-template", contactInfoContent );
	loadTemplate( "#send-email", "#send-email-template", sendEmailContent );
	loadTemplate( "footer", "#footer-template", footerContent );
	
	function loadTemplate( renderedContentHolderSelector, templateHolderSelector, templateContext ) {
		let template = $( templateHolderSelector ).html(),
			templateCompiled = Handlebars.compile( template ),
			contentRendered = templateCompiled( templateContext );
		$( renderedContentHolderSelector ).append( contentRendered );
	}

} );