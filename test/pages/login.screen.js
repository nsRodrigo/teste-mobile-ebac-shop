class LoginScreen {

    async informarUrl(url) {
        console.log('Preencher campo "Site address" com ' + url);
        const cmpEnderecoSite = await $('android.widget.EditText');
        await cmpEnderecoSite.setValue(url);
    }

    async aguardarModal(mensagem) {
        console.log('Aguardar fechamento do modal');
        const modal = await $('android=new UiSelector().text("' + mensagem + '")')
        await modal.waitForExist({ timeout: 14000 })
    }

    async aguardarModalLogin() {
        console.log('Aguardar fechamento do modal "Verifying site..."');
        const modal = await $('id:progress_view')
        await modal.waitForExist({ timeout: 14000 })
    }

    async btnContinue() {
        console.log('Tocar botão "Continue"');
        const btnContinue = await $('id:bottom_button');
        await btnContinue.waitForExist({ timeout: 14000 });
        await btnContinue.click();
    }

    async btnContinueLogin() {
        console.log('Tocar botão "Continue" no Login');
        const btnContinue = await $('id:login_continue_button');
        await btnContinue.waitForExist({ timeout: 14000 });
        await btnContinue.click();
    }

    async inserirEmail(email) {
        console.log('Preencher campo "Email address"');
        const cmpEmail = await $('android=new UiSelector().text("Email address")')
        await cmpEmail.setValue(email);
    }

    async inserirSenha(senha) {
        console.log('Preencher campo "Password"');
        const cmpSenha = await $('android=new UiSelector().text("Password")')
        await cmpSenha.setValue(senha);
    }
}

module.exports = new LoginScreen();
