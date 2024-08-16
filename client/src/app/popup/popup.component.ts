import { NgIf } from '@angular/common';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [NgIf],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Input() title: string = 'Popup Title';
  isVisible: boolean = false;

  showPopup() {
    this.isVisible = true;
  }

  closePopup() {
    this.isVisible = false;
  }

  confirm() {
    this.closePopup();
  }
}
