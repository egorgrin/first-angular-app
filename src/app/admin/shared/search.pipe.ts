import {Pipe, PipeTransform} from "@angular/core";
import {Post} from "../../shared/interfaces";

@Pipe({
  standalone: true,
  name: 'searchPosts'
})

export class SearchPipe implements PipeTransform {
  transform(posts: Post[], searchStr = ''): Post[] {
    if (!searchStr.trim()) {
      return posts
    }

    return posts.filter(post => {
      post.title.toLowerCase().includes(searchStr.toLowerCase())
    })
  }
}
