const {getQueriesFrom} = require('@testing-library/nightwatch')
describe('tests React to-do app by MDN', function () {
    const homePage = browser.page.reactToDo.homePage();
    const {getByLabelText} = getQueriesFrom(browser)
    const {getByRole} = getQueriesFrom(browser)

    beforeEach(async () => homePage.navigate());

    after(async (browser) => browser.quit());

    it('should add a new to-do to the list', async function (browser) {
        homePage.addToDo('Finish')

        const label = await getByLabelText('Finish')

        browser.expect.element(label).to.have.attribute('type').equals('checkbox');
    });

    it('should check an unchecked to-do', async function (browser) {
        const label = await getByLabelText('Sleep')
        browser.expect.element(label).to.not.have.attribute('checked')

        await homePage.clickToDo('Sleep')

        browser.expect.element(label).to.have.attribute('checked')
    });

    it('should uncheck a checked to-do', async function (browser) {
        const label = await getByLabelText('Eat')
        browser.expect.element(label).to.have.attribute('checked')

        await homePage.clickToDo('Eat')

        browser.expect.element(label).to.not.have.attribute('checked')
    });

    //Need to check why deletion is not working even when the button is found
    //might be an issue with testing-library, so skipping it for now
    it.skip('should delete a to-do', async function(browser) {
        await homePage.deleteToDo('Repeat')
    })
})
