class HomeScreen {

    async btnSkip() {
        console.log('Tocar botão "Skip"');
        const btnSkip = await $('id:button_skip');
        await btnSkip.waitForExist({ timeout: 14000 });
        await btnSkip.click();
    }


    async btnLogIn() {
        console.log('Tocar botão "Log In"');
        const btnLogIn = await $('id:button_login_store');
        await btnLogIn.waitForExist({ timeout: 14000 });
        await btnLogIn.click();
    }
}

module.exports = new HomeScreen();
