import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  stateOfNotificationBox = false;
  haveNotifications = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeStateOfNotificationBox(event: any) {
    this.stateOfNotificationBox = event;
  }

}
