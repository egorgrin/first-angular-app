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
          id: res.id,
          date: new Date(post.date)
        }
      })
    )
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.firebaseDbUrl}/posts/${id}.json`)
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.firebaseDbUrl}/posts.json`)
      .pipe(map((res: { [key: string]: any }) => {
        return Object
          .keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }))
      }))
  }
}
