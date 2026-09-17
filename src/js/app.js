import { Popover } from "./popover";

export default function generatePage() {

    const page = document.querySelector('body')


    let button = document.createElement('button')
    button.id = 'popover-1'
    button.textContent = 'Вызвать всплывающую подсказку'
    button.dataset.head =  'Всплывающее окно 1'
    button.dataset.message = 'Демонстрационный текст для всплывающего окна 1'
    page.append(button)

    let button2 = document.createElement('button')
    button2.id = 'popover-2'
    button2.textContent = 'Вызвать всплывающую подсказку №2'
    button2.dataset.head =  'Всплывающее окно 2'
    button2.dataset.message = 'Демонстрационный текст для всплывающего окна 1'
    page.append(button2)

    let actualPopovers=[]
    let popoversLibrary = new Popover()

    page.addEventListener('click', (e) => {
        e.preventDefault();

        const activateButton = e.target.closest('button')
        if (activateButton) {
            let statusOn = false
            actualPopovers.forEach((popover) => {
                if (popover.name == activateButton.id) {
                    statusOn = true
                }
                popoversLibrary.removePopover(popover.id)})
            actualPopovers = []

            if (!statusOn) {
                actualPopovers.push({name: activateButton.id,
                    id: popoversLibrary.showPopover(activateButton)})
                }
            }
    })

}