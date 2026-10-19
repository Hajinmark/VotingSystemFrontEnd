import { Component, EventEmitter, Input, Output} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [NgClass],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  @Input() isOpen : boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<void>();
  @Input() currentModal ? : string;

  @Input() modalDescription ? : string = '';
  @Input() modalTitle ? : string = '';
  

  closeModal()
  {
    this.close.emit(false);
  }
  
  submitModal()
  {
    this.submit.emit();
  }

}
