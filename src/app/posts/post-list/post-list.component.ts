import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  posts: Post [] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerpage = 2;
  currentPage = 1;
  pageSizeOption = [1, 2, 5, 10];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerpage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
                      .subscribe((postData: { posts: Post[], postCount: number}) => {
                          this.isLoading = false;
                          this.totalPosts = postData.postCount;
                          this.posts = postData.posts;
                      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerpage, this.currentPage);
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerpage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerpage, this.currentPage);
  }

  // We need to Destroy the subscription fron `ngOnInit` to avoid memory leaks
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }


}
