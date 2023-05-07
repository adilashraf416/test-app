import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileService } from '../services/user-profile.service';

@NgModule({
  declarations: [ListUsersComponent, UserProfileComponent],
  imports: [CommonModule, UsersRoutingModule],
  exports: [],
  providers: [UserProfileService],
})
export class UsersModule {}
