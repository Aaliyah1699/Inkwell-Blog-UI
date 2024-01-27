export interface AddBlogPost {
  title: string;
  shortDescription: string;
  content: string;
  featuredImgUrl: string;
  urlHandle: string;
  author: string;
  datePublished: Date;
  isVisible: boolean;
  categories: string[];
}
