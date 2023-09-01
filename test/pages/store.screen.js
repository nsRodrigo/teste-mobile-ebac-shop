class StoreScreen {

    async validarTituloTela(text) {
        console.log('Texto ' + text + ' validado com sucesso')
        const storeTitle = await $('id:toolbar_subtitle');
        await storeTitle.waitForExist({ timeout: 14000 });
        expect(await storeTitle.getText()).toEqual(text)
    }
}

module.exports = new StoreScreen();
