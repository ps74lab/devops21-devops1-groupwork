const { Given, When, Then } = require( '@wdio/cucumber-framework' );
const pauseTime = 1000;

// Placed empty templates at the end


Given(
	"that I'm on the main page",
	async () =>
	{
		await browser.url( '/' );
		await $( '.register-and-login-links' ).waitForDisplayed();
	}
);


When(
	"I click on the 'Register' link",
	async () =>
	{
		let authLinkElms = await $$( '.register-and-login-links a' );
		let foundLinkElm;
		for ( let aLinkElm of authLinkElms )
		{
			if ( ( await aLinkElm.getAttribute( 'href' ) ) === '/register' )
			{
				foundLinkElm = aLinkElm;
			}
		}

		await expect( foundLinkElm ).toBeTruthy();
		await foundLinkElm.waitForClickable();
		await foundLinkElm.click();
	}
);


Then(
	'a dialog with a registration form should appear on the page',
	async () =>
	{
		await $( 'form[name="registration"]' ).waitForDisplayed();
		await browser.pause( 2000 );
	}
);


When(
	"I click on the 'Login' link",
	async () =>
	{
		let authLinkElms = await $$( '.register-and-login-links a' );
		let foundLinkElm;
		for ( let aLinkElm of authLinkElms )
		{
			if ( ( await aLinkElm.getAttribute( 'href' ) ) === '/login' )
			{
				foundLinkElm = aLinkElm;
			}
		}

		await expect( foundLinkElm ).toBeTruthy();
		await foundLinkElm.waitForClickable();
		await foundLinkElm.click();
	}
);


Then(
	'a dialog with a login form should appear on the page',
	async () =>
	{
		await $( 'form[name="login"]' ).waitForDisplayed( { timeout : 5000 } );
		await browser.pause( 2000 );
	}
);


Given(
	"that I see the registration form",
	async () =>
	{
		await browser.url( '/' );
		await $( '.register-and-login-links' ).waitForDisplayed();

		let authLinkElms = await $$( '.register-and-login-links a' );
		let foundLinkElm;
		for ( let aLinkElm of authLinkElms )
		{
			if ( ( await aLinkElm.getAttribute( 'href' ) ) === '/register' )
			{
				foundLinkElm = aLinkElm;
			}
		}

		await expect( foundLinkElm ).toBeTruthy();
		await foundLinkElm.waitForClickable();
		await foundLinkElm.click();

		await $( "form[name='registration']" ).waitForDisplayed();
	}
);


When(
	"I enter my registration info and click on the submit button",
	async () =>
	{
		await $( 'form[name="registration"] input[name="firstName"]' ).setValue( 'Tester2' );
		await $( 'form[name="registration"] input[name="lastName"]' ).setValue( 'Testare2' );
		await $( 'form[name="registration"] input[name="email"]' ).setValue( 'tester2@testare2.test' );
		await $( 'form[name="registration"] input[name="password"]' ).setValue( '12345678' );
		await $( 'form[name="registration"] input[name="passwordRepeated"]' ).setValue( '12345678' );
		let foundSubmitBtn = await $( 'form[name="registration"] input[type="submit"]' );
		await expect( foundSubmitBtn ).toBeTruthy();
		await foundSubmitBtn.waitForClickable();
		await foundSubmitBtn.click();
	}
);


Then(
	"the page should inform me that the registration was successful",
	async () =>
	{
		let foundWelcomeMsgElm = await $( "div.register h3" );
		await expect( foundWelcomeMsgElm ).toBeTruthy();
		await expect( await foundWelcomeMsgElm.getText() ).toContain( "Welcome as a member!" );
		let foundSuccessMsgElm = await $( "div.register p" );
		await expect( foundSuccessMsgElm ).toBeTruthy();
		await expect( await foundSuccessMsgElm.getText() ).toContain( "You are now successfully registrered as a member!" );
	}
);


Given(
	"that I see the login form",
	async () =>
	{
		await browser.url( '/' );
		await $( '.register-and-login-links' ).waitForDisplayed();

		let secondAuthLink;
		// let authLinkElms = await $$( '.register-and-login-links a' );
		// for ( let aLinkElm of authLinkElms )
		// {
		// 	if ( ( await aLinkElm.getAttribute( 'href' ) ) === '/login' )
		// 	{
		// 		foundLinkElm = aLinkElm;
		// 	}
		// }
		let authLinksContainer = await $( '.register-and-login-links' );
		await authLinksContainer.waitUntil(
			async function ()
			{
				secondAuthLink = await this.$$( "a" )[ 1 ];
				return ( secondAuthLink && await secondAuthLink.getAttribute( "href" ) === "/login" );
			}
		);

		await expect( secondAuthLink ).toBeTruthy();
		await secondAuthLink.waitForClickable();
		await secondAuthLink.click();

		await $( "form[name='login']" ).waitForDisplayed();
	}
);


When(
	"I enter my login info and click on the submit button",
	async () =>
	{
		await $( 'form[name="login"] input[name="email"]' ).setValue( 'tester2@testare2.test' );
		await $( 'form[name="login"] input[name="password"]' ).setValue( '12345678' );
		let foundSubmitBtn = await $( 'form[name="login"] input[type="submit"]' );
		await expect( foundSubmitBtn ).toBeTruthy();
		await foundSubmitBtn.waitForClickable();
		await foundSubmitBtn.click();
		await $( "div.navbar div.login" ).waitForDisplayed( { reverse : true } );
	}
);



Then(
	"the page should inform me that the login was successful",
	async () =>
	{
		let firstAuthLink = await $( 'div.register-and-login-links a' );
		await firstAuthLink.waitUntil(
			async function ()
			{
				return ( await this.getAttribute( "href" ) === "/logout" );
			}
		);
		await firstAuthLink.waitForClickable();

		let foundLoggedInAsElm = await $( "div.register-and-login-links" );
		await expect( foundLoggedInAsElm ).toBeTruthy();
		await expect( await foundLoggedInAsElm.getHTML( false ) ).toContain( "Logged in as Tester" );

		await browser.pause( pauseTime );
	}
);


Given(
	"that I'm currently signed in and on the main page",
	async () =>
	{
		let foundLoggedInAsElm = await $( "div.register-and-login-links" );
		await expect( foundLoggedInAsElm ).toBeTruthy();
		await expect( await foundLoggedInAsElm.getText() ).toContain( "Logged in as Tester" );
	}
);


When(
	"I click on the 'Logout' link",
	async () =>
	{
		let authLinkElms = await $$( '.register-and-login-links a' );
		let foundLogoutLinkElm;
		for ( let aLinkElm of authLinkElms )
		{
			if ( ( await aLinkElm.getAttribute( 'href' ) ) === '/logout' )
			{
				foundLogoutLinkElm = aLinkElm;
			}
		}

		await expect( foundLogoutLinkElm ).toBeTruthy();
		await foundLogoutLinkElm.waitForClickable();
		await foundLogoutLinkElm.click();
		await browser.pause( pauseTime );
	}
);


Then(
	"the page should inform me that I was signed off",
	async () =>
	{
		let authLinkElms = await $$( '.register-and-login-links a' );
		await expect( authLinkElms[ 0 ] ).toHaveHref( '/register' );
		await expect( authLinkElms[ 1 ] ).toHaveHref( '/login' );
		await browser.pause( pauseTime );
	}
);


/*
// Templates
Given(
	"",
	async () =>
	{
	}
);
When(
	"",
	async () =>
	{
	}
);
Then(
	"",
	async () =>
	{
	}
);
*/