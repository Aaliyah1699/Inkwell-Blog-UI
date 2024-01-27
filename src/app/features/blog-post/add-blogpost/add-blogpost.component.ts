import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css'],
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  categories$?: Observable<Category[]>;
  model: AddBlogPost;
  isImageSelectorVisible: boolean = false;

  imageSelectSubscription?: Subscription;

  constructor(
    private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageService
  ) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImgUrl: '',
      author: '',
      isVisible: true,
      datePublished: new Date(),
      categories: [],
    };
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.imageSelectSubscription = this.imageService.onSelectImage().subscribe({
      next: (selectedImg) => {
        this.model.featuredImgUrl = selectedImg.url;
        this.closeImageSelector();
      },
    });
  }

  onFormSubmit(): void {
    this.blogPostService.createBlogPost(this.model).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/admin/blogposts');
      },
    });
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.imageSelectSubscription?.unsubscribe();
  }
}
