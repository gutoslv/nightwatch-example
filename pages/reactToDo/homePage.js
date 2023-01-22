const {getQueriesFrom} = require('@testing-library/nightwatch')

const homeCommands = {
    async deleteToDo( toDoName) {
        const {getByRole} = getQueriesFrom(browser)

        const toDoDelete = await getByRole('button', {name: `Delete ${toDoName}`})

        this.click(toDoDelete);
    },

    addToDo(name){
        this.setValue('@addInput', name)

        this.waitForElementVisible('@addButton', 1000)
            .click('@addButton');

        this.pause(500)

        return this;
    },

    async clickToDo( toDoName) {
        const {getByLabelText} = getQueriesFrom(browser)

        const label = await getByLabelText(toDoName)

        this.click(label)

        this.pause(500)

        return this
    },
}

module.exports = {
    url: 'https://mdn.github.io/todo-react/',

    commands: [
        homeCommands
    ],

    elements: {
        addInput: {
            selector: 'input[id=new-todo-input]'
        },
        addButton:{
            selector: 'button[type=submit]'
        },
        deleteButton:{
            selector: '.btn__danger[type=button]'
        },
    }
};
