import { Notification } from 'src/app/shared/interfaces/notification';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import * as moment from 'moment';


@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  @Output() stateOfNotificationBoxEvent = new EventEmitter<boolean>();
  @Input() stateOfNotificationBox = false;
  notifications: Notification[] = [];
  haveNotifications = false;
  haveNewNotification = false;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
   this.getNotifications();
  }

  getNotifications(): void {
    this.notificationService.findAllNotifications().subscribe(notifications => {
      this.notifications = notifications;
      if(notifications.length > 0) {
        this.haveNotifications = true;
        this.verifyIfExistsNewNotifications(notifications);
      } else {
        this.haveNotifications = false;
        this.haveNewNotification = false;
      }
     });
  }

  markNotificationAsRead(notificationId: string): void {
    console.log(this.notifications);
    console.log(notificationId)
    this.notificationService.updateNotification(notificationId).subscribe(() => {
      this.getNotifications();
    });
  }

  verifyIfExistsNewNotifications(notifications: Notification[]): void {
    const isNotificationNew = notifications.find(notification => notification.new);
    if(isNotificationNew) {
      this.haveNewNotification = true;
    } else {
      this.haveNewNotification = false;
    }
  }

  getTimeForNotification(createdAt: any): string {
    return moment().subtract(createdAt, 'days').calendar();
  }

  changeStateOfNotificationBox(): void {
    this.stateOfNotificationBoxEvent.emit(!this.stateOfNotificationBox);
  }

  delete(notificationId: string): void {
    this.notificationService.deleteById(notificationId).subscribe(() => this.getNotifications());
  }

  deleteAllNotifications(): void {
    this.notificationService.deleteAll().subscribe(() => this.getNotifications());
  }

  markAllAsRead(): void {
    this.notificationService.updateAllNotifications().subscribe(() => this.getNotifications());
  }

}
