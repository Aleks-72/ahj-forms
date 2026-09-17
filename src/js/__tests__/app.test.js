/**
 * @jest-environment jsdom
 */

import generatePage from '../app';
import Popover from '../popover';

describe('generatePage integration', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should create buttons and handle clicks', () => {
    generatePage();

    const button1 = document.querySelector('#popover-1');
    expect(button1).toBeInTheDocument;

    button1.click();

    expect(document.querySelector('.popover')).toBeInTheDocument;
    expect(document.querySelector('.header').textContent).toBe('Всплывающее окно 1');
  });

  it('should toggle popover on repeated clicks', () => {
    generatePage();

    const button1 = document.querySelector('#popover-1');
    
    button1.click();
    expect(document.querySelectorAll('.popover')).toHaveLength(1);

    button1.click();
    setTimeout(() => {
      expect(document.querySelectorAll('.popover')).toHaveLength(0);
    }, 0);
  });

  it('should switch between different buttons', () => {
    generatePage();

    const button1 = document.querySelector('#popover-1');
    const button2 = document.querySelector('#popover-2');
    
    button1.click();
    expect(document.querySelector('.header').textContent).toBe(button1.dataset.head);

    button2.click();
    setTimeout(() => {
        expect(document.querySelectorAll('.popover')).toHaveLength(1);
        expect(document.querySelector('.header').textContent).toBe('Всплывающее окно 2');
        }, 0);
    });

  it('should ignore clicks outside buttons', () => {
    generatePage();

    const div = document.createElement('div');
    document.body.appendChild(div);
    div.click();

    expect(document.querySelectorAll('.popover')).toHaveLength(0);
  });

});