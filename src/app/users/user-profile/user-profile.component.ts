import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { IUser, IUserProfile } from '../user.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  username: string | null = '';
  user!: IUserProfile;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    if (!this.userProfileService.users.length) {
      this.userProfileService.setUsers();
    }
    this.route.paramMap.subscribe((params) => {
      const username = params.get('id');
      if (username) {
        this.renderUser(username);
      }
    });
  }

  renderUser(username: string) {
    this.userProfileService.fetchUser(username).subscribe((userProfile) => {
      this.isLoading = false;
      this.user = {
        id: userProfile.id,
        avatarUrl: userProfile.avatar_url,
        username: userProfile.login,
        name: userProfile.name,

        location: userProfile.location,
        bio: userProfile.bio || '',
        public_repos: userProfile.public_repos,
        followers: userProfile.followers,
        following: userProfile.following,
        profileUrl: userProfile.html_url,
        company: userProfile.company,
        twitter_username: userProfile.twitter_username,
      };
    });
  }

  back(): void {
    const index = this.userProfileService.users.findIndex(
      (el: IUser) => el.id === this.user.id
    );
    if (index === 0) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate([
        '/user',
        this.userProfileService.users[index - 1].username,
      ]);
    }
  }

  next(): void {
    const index = this.userProfileService.users.findIndex(
      (el: IUser) => el.id === this.user.id
    );
    if (index !== this.userProfileService.users.length) {
      this.router.navigate([
        '/user',
        this.userProfileService.users[index + 1].username,
      ]);
    }
  }
}
