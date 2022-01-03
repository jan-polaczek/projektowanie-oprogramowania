import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appDate]',
})
export class DateDirective {

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    let trimmed = input.value.replace(/\s+/g, '');
    trimmed = trimmed.replace(/[^0-9]/g, '');
    if (trimmed.length > 10) {
      trimmed = trimmed.substr(0, 10);
    }
    trimmed = trimmed.replace(/-/g, '');
    const numbers = [];
    numbers.push(trimmed.substr(0, 2));
    if (trimmed.substr(2, 2) !== '') {
      numbers.push(trimmed.substr(2, 2));
    }
    if (trimmed.substr(4, 4) !== '') {
      numbers.push(trimmed.substr(4, 4));
    }
    input.value = numbers.join('-');
  }
}
