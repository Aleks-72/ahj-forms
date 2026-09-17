import { Popover } from "../popover";

test('widget should render',  () => {
    document.body.innerHTML = '<button id="popover-1" data-head="Всплывающее окно 1" data-message="Демонстрационный текст для всплывающего окна 1">Вызвать всплывающую подсказку</button>'
    const button = document.querySelector("#popover-1")
    
    const popoversLibrary = new Popover()
    popoversLibrary.showPopover(button) 
    widget.bindToDOM();
    console.log(newPopover.markup)
    expect(container.innerHTML).toEqual(newPopover.markup)
})
    
    