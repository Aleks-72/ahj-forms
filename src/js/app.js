import { Popover } from "./popover";

export default function generatePage() {
    const page =document.querySelector("body");

    const popovers = {
        'popover-1': {
            'head': 'Всплывающее окно 1',
            'message': 'Демонстрационный текст для всплывающего окна 1'
        },
        'popover-2': {
            'head': 'Всплывающее окно 2',
            'message': 'Демонстрационный текст для всплывающего окна 2'
        }
    }

    let button = document.createElement('button')
    button.id = 'popover-1'
    button.textContent = 'Вызвать всплывающую подсказку'
    page.append(button)

    let button2 = document.createElement('button')
    button2.id = 'popover-2'
    button2.textContent = 'Вызвать всплывающую подсказку №2'
    page.append(button2)

    const popoversLibrary = new Popover()
    let actualPopovers = []

    page.addEventListener('click', (e) => {
        e.preventDefault();

        const activateButton = e.target.closest('button')
        if (activateButton) {
            let statusOn = false
            actualPopovers.forEach((popover) => {
                if (popover.name == activateButton.id) {
                    statusOn = true
                    console.log(statusOn)
                }
                popoversLibrary.removePopover(popover.id)})
            actualPopovers = []

            if (!statusOn) {
                actualPopovers.push({name: activateButton.id,
                    id: popoversLibrary.showPopover(popovers[activateButton.id]['head'], popovers[activateButton.id]['message'], activateButton)})
                }
            } else {
            console.log('Miss')
        }
    })

}