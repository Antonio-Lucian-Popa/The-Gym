import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../interfaces/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  NOTIFICATION_URL = 'http://localhost:8080/api/v1/notifications';

  constructor(private http: HttpClient) { }

  updateAllNotifications(): Observable<void> {
    return this.http.put<void>(`${this.NOTIFICATION_URL}/updateAll`, {});
  }

  /**
   * This method will make a put req to modify property isNew to false
   * @param notificationId
   * @returns
   */
  updateNotification(notificationId: string): Observable<void> {
    return this.http.put<void>(`${this.NOTIFICATION_URL}/update/${notificationId}`, {});
  }

  findAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.NOTIFICATION_URL}/findAll`);
  }

  deleteAll(): Observable<void> {
    return this.http.delete<void>(`${this.NOTIFICATION_URL}/deleteAll`);
  }

  deleteById(notificationId: string): Observable<void> {
    return this.http.delete<void>(`${this.NOTIFICATION_URL}/delete/${notificationId}`);
  }
}
