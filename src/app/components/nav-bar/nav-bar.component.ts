import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  stateOfNotificationBox = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeStateOfNotificationBox() {
    this.stateOfNotificationBox = !this.stateOfNotificationBox;
  }

}
