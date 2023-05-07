import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { IUser } from '../user.interface';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  users: IUser[] = [];
  isLoading: boolean = false;

  constructor(private userProfile: UserProfileService) {}

  async ngOnInit() {
    this.isLoading = true;
    this.userProfile.fetchUsers().subscribe((response) => {
      this.isLoading = false;
      this.users = response.map((el) => {
        return {
          avatarUrl: el.avatar_url,
          username: el.login,
          name: el.login,
          id: el.id,
        };
      });
    });
  }
}
