import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component,Input, Renderer2 } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [NgIf,FaIconComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class PopupComponent {
  @Input() title: string = 'Popup Title';
  faXmark = faXmark;
  isVisible: boolean = false;

  constructor(private renderer: Renderer2) {}

  showPopup() {
    this.renderer.addClass(document.body, 'no-scroll');
    this.isVisible = true;
  }

  closePopup() {
    this.renderer.removeClass(document.body, 'no-scroll');
    this.isVisible = false;
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'no-scroll');
  }
}
