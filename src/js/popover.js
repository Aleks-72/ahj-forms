export class Popover {
    constructor() {
        this._popovers = [];
    }

    showPopover(header, message, element) {
        const popoverElement = document.createElement('div');
        const popoverHeader = document.createElement('h3');
        const popoverMessage = document.createElement('div');
        popoverElement.classList.add('popover');
        popoverHeader.classList.add('header');
        popoverMessage.classList.add('message');
        popoverHeader.textContent = header;
        popoverMessage.textContent = message;

        const arrow = document.createElement('div')
        arrow.classList.add('arrow', 'top')
        
        popoverElement.append(popoverHeader)
        popoverElement.append(popoverMessage)
        popoverElement.append(arrow)
        const id =  performance.now();

        this._popovers.push({
            id,
            element: popoverElement
        })

        document.body.append(popoverElement)
        
        const {left, top, width} = element.getBoundingClientRect()
        console.log(element.getBoundingClientRect())
        console.log(left + width/2, top)
        console.log(popoverElement.offsetHeight)
        popoverElement.style.left = left + element.offsetWidth/2 - popoverElement.offsetWidth/2 + 'px';
        popoverElement.style.top = top - 10 - popoverElement.offsetHeight + 'px';
        return id;
    }

    removePopover(id) {
        const popover = this._popovers.find(t => t.id === id);

        popover.element.remove();

        this._popovers = this._popovers.filter(t => t.id !== id);
    }
}