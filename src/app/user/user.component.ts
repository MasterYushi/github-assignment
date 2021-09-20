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
  contentLoaded = false;
  requestMade = false;
  noContentFound = false;
  userObs!: Subscription;
  repoObs!: Subscription;

  constructor(private userService: UserService) {}

  getUser(username: string) {
    this.activePage = 1;
    this.noContentFound = false;
    this.requestMade = true;
    this.contentLoaded = false;

    this.userObs = this.userService.getUser(username).subscribe(
      (user) => {
        this.user = user;
        if (!user) this.noContentFound = true;
        // console.log(user);
      },
      noop, //on error (no operation)
      () => {
        //on complete
        if (!this.user) return;

        const temp = Math.ceil(this.user.public_repos / 10);
        this.numOfPages = temp > 10 ? 10 : temp;
        this.repoObs = this.getRepos(username);
        this.requestMade = false;
        this.contentLoaded = true;
      }
    );
  }

  getRepos(username: string) {
    return (this.repoObs = this.userService
      .getRepos(username, this.activePage)
      .subscribe(
        (repos) => {
          this.repos = repos;
          if (!repos) this.noContentFound = true;
          // console.log('Current repo response:', this.repos);
        },
        noop,
        () => {
          this.requestMade = false;
          this.contentLoaded = true;
        }
      ));
  }

  handlePageChange(targetPageNumber: number) {
    this.activePage = targetPageNumber;
    this.getRepos(this.user.login);
    this.noContentFound = false;
    this.requestMade = true;
    this.contentLoaded = false;
  }

  ngOnDestroy(): void {
    this.userObs.unsubscribe();
    this.repoObs.unsubscribe();
  }
}
