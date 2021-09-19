import { Component, OnDestroy } from '@angular/core';
import { noop, Subscription } from 'rxjs';
import { Repo } from '../repo';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnDestroy {
  user!: User;
  repos!: Repo[];
  numOfPages!: number;
  activePage = 1;
  userObs!: Subscription;
  repoObs!: Subscription;

  constructor(private userService: UserService) {}

  getUser(username: string) {
    this.userObs = this.userService.getUser(username).subscribe(
      (user) => {
        this.user = user;
        // console.log(user);
      },
      noop, //on error (no operation)
      () => {
        //on complete
        const temp = Math.ceil(this.user.public_repos / 10);
        this.numOfPages = temp > 10 ? 10 : temp;
        this.repoObs = this.getRepos(username);
      }
    );
  }

  getRepos(username: string) {
    return (this.repoObs = this.userService
      .getRepos(username, this.activePage)
      .subscribe((repos) => {
        this.repos = repos;
        // console.log('Current repo response:', this.repos);
      }));
  }

  handlePageChange(targetPageNumber: number) {
    this.activePage = targetPageNumber;
    this.getRepos(this.user.login);
  }

  ngOnDestroy(): void {
    this.userObs.unsubscribe();
    this.repoObs.unsubscribe();
  }
}
