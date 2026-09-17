/**
 * @jest-environment jsdom
 */

import { Popover } from "../popover";

describe('Popover', () => {
  let popover;
  let container;

  beforeEach(() => {
    popover = new Popover();
    
    container = document.createElement('div');
    container.innerHTML = `
      <button 
        data-head="Тест" 
        data-message="Тестовое сообщение"
        style="width: 100px; height: 50px;"
      >
        Протестировать
      </button>
    `;
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    popover = null;
  });

  describe('showPopover', () => {
    it('should create and append popover element to body', () => {
      const button = container.querySelector('button');
      const id = popover.showPopover(button);

      expect(id).toBeDefined();
      expect(document.querySelector('.popover')).toBeInTheDocument;
    });

    it('should create popover with correct structure', () => {
      const button = container.querySelector('button');
      popover.showPopover(button);

      const popoverElement = document.querySelector('.popover');
      expect(popoverElement).toBeInTheDocument;
      expect(popoverElement.querySelector('.header')).toBeInTheDocument;
      expect(popoverElement.querySelector('.message')).toBeInTheDocument;
      expect(popoverElement.querySelector('.arrow.top')).toBeInTheDocument;
    });

    it('should set correct header and message text', () => {
      const button = container.querySelector('button');
      popover.showPopover(button);

      const header = document.querySelector('.popover .header');
      const message = document.querySelector('.popover .message');

      expect(header.textContent).toBe('Тест');
      expect(message.textContent).toBe('Тестовое сообщение');
    });

    it('should use data attributes from element', () => {
      const button = container.querySelector('button');
      button.dataset.head = 'Custom Head';
      button.dataset.message = 'Custom Message';

      popover.showPopover(button);

      expect(document.querySelector('.header').textContent).toBe('Custom Head');
      expect(document.querySelector('.message').textContent).toBe('Custom Message');
    });

    it('should position popover above the element', () => {
      const button = container.querySelector('button');
      popover.showPopover(button);

      const popoverElement = document.querySelector('.popover');
      expect(popoverElement.style.left).toBeDefined();
      expect(popoverElement.style.top).toBeDefined();
    });

    it('should store popover in internal array', () => {
      const button = container.querySelector('button');
      const id = popover.showPopover(button);

      expect(popover._popovers).toHaveLength(1);
      expect(popover._popovers[0].id).toBe(id);
      expect(popover._popovers[0].element).toBe(document.querySelector('.popover'));
    });

    it('should return unique id for each popover', () => {
      const button = container.querySelector('button');
      const id1 = popover.showPopover(button);
      const id2 = popover.showPopover(button);

      expect(id1).not.toBe(id2);
      expect(popover._popovers).toHaveLength(2);
    });
  });

  describe('removePopover', () => {
    it('should remove popover from DOM', () => {
      const button = container.querySelector('button');
      const id = popover.showPopover(button);

      expect(document.querySelector('.popover')).toBeInTheDocument;

      popover.removePopover(id);

      expect(document.querySelector('.popover')).not.toBeInTheDocument;
    });

    it('should remove popover from internal array', () => {
      const button = container.querySelector('button');
      const id = popover.showPopover(button);

      expect(popover._popovers).toHaveLength(1);

      popover.removePopover(id);

      expect(popover._popovers).toHaveLength(0);
    });

    it('should remove only specified popover', () => {
      const button = container.querySelector('button');
      const id1 = popover.showPopover(button);
      const id2 = popover.showPopover(button);

      expect(popover._popovers).toHaveLength(2);

      popover.removePopover(id1);

      expect(popover._popovers).toHaveLength(1);
      expect(popover._popovers[0].id).toBe(id2);
      expect(document.querySelectorAll('.popover')).toHaveLength(1);
    });
  });

  describe('multiple popovers', () => {
    it('should handle multiple popovers independently', () => {
      const buttons = container.querySelectorAll('button');
      const ids = [];

      // Создаём несколько popover
      for (let i = 0; i < 3; i++) {
        const id = popover.showPopover(buttons[0]);
        ids.push(id);
      }

      expect(popover._popovers).toHaveLength(3);
      expect(document.querySelectorAll('.popover')).toHaveLength(3);

      // Удаляем средний
      popover.removePopover(ids[1]);

      expect(popover._popovers).toHaveLength(2);
      expect(document.querySelectorAll('.popover')).toHaveLength(2);
    });
  });
});
    
    