import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auth-template',
  templateUrl: './auth-template.component.html',
  styleUrls: ['./auth-template.component.css']
})
export class AuthTemplateComponent {
  faArrowLeft = faArrowLeft;
  constructor(private location:Location) {}

  back() {
    this.location.back();
  }
}
