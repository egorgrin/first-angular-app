import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../shared/post.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  pSub: Subscription
  searchStr  = ''


  constructor(
    private postsService: PostService
  ) {
  }

  remove(id: string | undefined) {

  }

  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts
    })

  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }
}
