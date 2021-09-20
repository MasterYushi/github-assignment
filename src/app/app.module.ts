import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './user/user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserReposComponent } from './user-repos/user-repos.component';
import { TopicsComponent } from './topics/topics.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PaginationComponent } from './pagination/pagination.component';
import { CardSkeletonComponent } from './card-skeleton/card-skeleton.component';
import { ProfileSkeletonComponent } from './profile-skeleton/profile-skeleton.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserDetailsComponent,
    UserReposComponent,
    TopicsComponent,
    PaginationComponent,
    CardSkeletonComponent,
    ProfileSkeletonComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
