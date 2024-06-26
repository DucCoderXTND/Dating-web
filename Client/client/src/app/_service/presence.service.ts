import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();
 
  private unreadMessageCountSource = new BehaviorSubject<number>(0);
  unreadMessageCount$ = this.unreadMessageCountSource.asObservable();
  public unreadMessageCount = 0;

  constructor(private toastr: ToastrService, private router: Router) {}
  
  //Xây dưng kết nối trung tâm
  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        //program "hubs/presence" giúp client tìm thấy tên trung tâm PresenceHub
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => console.log(error));

    this.hubConnection.on('UserIsOnline', (username) => {
      //PresenceHub.cs
      this.onlineUsers$.pipe(take(1)).subscribe({
        next: (usernames) =>
          this.onlineUsersSource.next([...usernames, username]), //Them ng dung online vào
      });
    });

    this.hubConnection.on('UserIsOffline', (username) => {
      this.onlineUsers$.pipe(take(1)).subscribe({
        next: usernames => this.onlineUsersSource.next(usernames.filter(x => x !== username)) //trả về 1 mảng mới trừ đi username vừa xóa
      })
    });

    this.hubConnection.on('GetOnlineUsers', (usernames) => {
      this.onlineUsersSource.next(usernames);
    });

    this.hubConnection.on('NewMessageReceived', ({ username, knownAs }) => {
      const config: Partial<IndividualConfig> = {
        timeOut: 10000*2, // Thời gian tồn tại của thông báo: 5000ms = 5 giây
      };
      this.toastr
        .info(knownAs + ' has sent you a new message! Click me to see it' , ' ',config)
        .onTap.pipe(take(1))
        .subscribe({
          next: () =>
            this.router.navigateByUrl('/members/' + username + '?tab=Messages'),
        });
    });

    this.hubConnection.on('NewUnreadMessage', () => {
      console.log('NewUnreadMessage event received'); // Kiểm tra sự kiện
      let currentCount = this.unreadMessageCountSource.value;
      this.unreadMessageCountSource.next(currentCount + 1);
    });
  }

  clearUnreadMessages() {
    this.unreadMessageCountSource.next(0);
  }

  stopHubConnection() {
    this.hubConnection?.stop().catch((error) => console.log(error));
  }
}
