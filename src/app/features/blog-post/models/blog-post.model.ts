import { Category } from '../../category/models/category.model';

export interface BlogPost {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  featuredImgUrl: string;
  urlHandle: string;
  author: string;
  datePublished: Date;
  isVisible: boolean;
  categories: Category[];
}
