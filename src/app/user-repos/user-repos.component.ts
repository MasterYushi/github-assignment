import { Component, Input, OnInit } from '@angular/core';
import { Repo } from '../repo';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.css'],
})
export class UserReposComponent {
  @Input() repos!: Repo[];
}
