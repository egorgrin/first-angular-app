import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Post} from "./interfaces";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class PostService {
  constructor(
    private http: HttpClient
  ) {
  }

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.firebaseDbUrl}/posts.json`, post).pipe(
      map((res: Post) => {
        return {
          ...post,
          id: res.name,
          date: new Date(post.date)
        }
      })
    )
  }
}
