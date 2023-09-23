class CustomSelect {
    #id
    #options
    #mainDropdown
    #dropdownButton
    #dropdownSpan
    #list
    #currentSelectedOption

    constructor(id, options) {
        this.#id = id
        this.#options = options
        this.#currentSelectedOption = null

        this.#mainDropdown = document.createElement('div')
        this.#dropdownButton = document.createElement('button')
        this.#dropdownSpan = document.createElement('span')
        this.#list = document.createElement('ul')
    }

    #makeList() {
        this.#mainDropdown.className = `select-dropdown select-dropdown--${this.#id}`
        this.#dropdownButton.className = `select-dropdown__button select-dropdown__button--${this.#id}`

        this.#dropdownSpan.className = `select-dropdown select-dropdown--${this.#id}`
        this.#dropdownSpan.textContent = 'Выберите элемент'

        this.#list.className = `select-dropdown__list select-dropdown__list--${this.#id}`

        console.log(this.#options)
        this.#options.forEach(option => {
            
            let listItem = document.createElement('li')
            listItem.className = 'select-dropdown__list-item'
            listItem.dataset.value = `${option.value}`
            listItem.textContent = option.text
            this.#list.append(listItem)
        });

        this.#dropdownButton.append(this.#dropdownSpan)
        this.#mainDropdown.append(this.#dropdownButton, this.#list)

        this.#dropdownButton.addEventListener('click', () => {
            this.#list.classList.toggle('active')
        })

        this.#list.addEventListener('click', (event) => {
            if (event.target.className === 'select-dropdown__list-item') {
                this.#currentSelectedOption = event.target.dataset.value
                let allOptions = document.querySelectorAll('.select-dropdown__list-item')
                allOptions.forEach(option => {
                    option.classList.remove('selected')
                })
                let selectedOption = document.querySelector(`[data-value="${this.#currentSelectedOption}"`)
                selectedOption.classList.add('selected')
                this.#dropdownButton.textContent = selectedOption.textContent
                this.#list.classList.remove('active')
            }
        })
    }

    render(container) {
        this.#makeList()
        container.append(this.#mainDropdown)
    }
}


const options = [
    { value: 1, text: "JavaScript" },
    { value: 2, text: "NodeJS" },
    { value: 3, text: "ReactJS" },
    { value: 4, text: "HTML" },
    { value: 5, text: "CSS" }
];

const customSelect = new CustomSelect('123', options); 
const mainContainer = document.querySelector('#container'); 
customSelect.render(mainContainer);