// View on GitHub: https://github.com/xPaw/CF-ABetterBrowser

CloudFlare.define( 'abetterbrowser', [ 'cloudflare/dom', 'cloudflare/user', 'abetterbrowser/config' ], function( version, user, config )
{
	var version    = version.internetExplorer;
	var maxVersion = parseInt( config.ie ) || 7;
	
	/**
	 * Is user using IE? Is it old?
	 */
	if( version === undefined || version > maxVersion )
	{
		return true;
	}
	
	/**
	 * Did user close this message already?
	 */
	if( user.getCookie( 'cfapp_abetterbrowser' ) == 1 )
	{
		return true;
	}
	
	try
	{
		/**
		 * j.mp is bitly, let's collect some referral statistics
		 */
		var moreInformationLink = 'http://j.mp/abetterbrowser';
		
		/**
		 * Translations
		 */
		var translations =
		{
			'en': 'You are using an outdated browser. <a href="' + moreInformationLink + '" target="_blank">More information &#187;</a>',
			'ru': 'Вы используете устаревший браузер. <a href="' + moreInformationLink + '" target="_blank">Подробнее &#187;</a>',
			'fr': 'Votre navigateur n\'est pas à jour. <a href="' + moreInformationLink + '" target="_blank">Plus d\'information &#187;</a>',
			'da': 'Du bruger en ældre browser. <a href="' + moreInformationLink + '" target="_blank">Mere information &#187;</a>',
			'de': 'Sie benutzen einen veralteten browser. <a href="' + moreInformationLink + '" target="_blank">Mehr informationen &#187;</a>',
			'ja': 'あなたは、時代遅れのブラウザを使用しています。<a href="' + moreInformationLink + '" target="_blank">詳細情報 &#187;</a>',
			'fa': 'شما از مرورگری قدیمی استفاده می کنید. <a href="' + moreInformationLink + '" target="_blank">&#187;اطلاعات بیشتر</a>',
			'tr': 'Çok eski bir tarayıcı kullanıyorsunuz. <a href="' + moreInformationLink + '" target="_blank">Daha fazla bilgi &#187;</a>',
			'pt_BR': 'Você está usando um navegador antigo. <a href="' + moreInformationLink + '" target="_blank">Mais informações &#187;</a>'
		};
		
		/**
		 * Style rules
		 */
		var rules =
			'#cloudflare-old-browser {' +
				'background:#45484d;' +
				'position:absolute;' +
				'z-index:100000;' +
				'width:100%;' +
				'height:26px;' +
				'top:0;' +
				'left:0;' +
				'overflow:hidden;' +
				'padding:8px 0;' +
				'font:18px/1.2 Arial,sans-serif;' +
				'text-align:center;' +
				'color:#FFF' +
			'}' +
			
			'#cloudflare-old-browser a {' +
				'text-decoration:underline;' +
				'color:#EBEBF4' +
			'}' +
			
			'#cloudflare-old-browser a:hover, #cloudflare-old-browser a:active {' +
				'text-decoration:none;' +
				'color:#DBDBEB' +
			'}' +
			
			'#cloudflare-old-browser-close {' +
				'background:#393b40;' +
				'display:block;' +
				'width:42px;' +
				'height:42px;' +
				'position:absolute;' +
				'text-decoration:none !important;' +
				'cursor:pointer;' +
				'top:0;' +
				'right:0;' +
				'font-size:30px;' +
				'line-height:1.4' +
			'}' +
			
			'#cloudflare-old-browser-close:hover {' +
				'background:#E04343;' +
				'color:#FFF' +
			'}';
		
		/**
		 * Injects style rules into the document to handle formatting
		 */
		var style = document.createElement( 'style' );
		style.id = 'cloudflare-abetterbrowser';
		style.setAttribute( 'type', 'text/css' );
		
		if( style.styleSheet )
		{
			style.styleSheet.cssText = rules;
		}
		else
		{
			style.appendChild( document.createTextNode( rules ) );
		}
		
		var head = document.getElementsByTagName( 'head' )[ 0 ];
		var firstChild = head.firstChild;
		head.insertBefore( style, firstChild );
		
		/**
		 * Detect user's browser language
		 *
		 * This is aimed at IE, so we don't try to get navigator.language
		 */
		var language    = window.navigator.browserLanguage || window.navigator.userLanguage || 'en';
		var translation = translations[ language.substring( 0, 2 ) ] || translations[ 'en' ];
		
		/**
		 * Create our message
		 */
		var message = document.createElement( 'div' );
		message.id = 'cloudflare-old-browser';
		message.innerHTML = translation;
		
		/**
		 * Create close button
		 */
		var closeButton = document.createElement( 'a' );
		closeButton.id = 'cloudflare-old-browser-close';
		closeButton.innerHTML = '&times;';
		
		message.appendChild( closeButton );
		
		closeButton.onclick = function( )
		{
			document.body.removeChild( message );
			
			/**
			 * Hide message for 7 days
			 */
			user.getCookie( 'cfapp_abetterbrowser', 1, 7 );
			
			return false;
		};
		
		/**
		 * Injects our message into the body
		 */
		document.body.appendChild( message );
	}
	catch( e )
	{
		//
	}
} );
