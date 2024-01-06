import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {AuthService} from "../admin/shared/services/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      const token = this.auth.token;
      req = req.clone({
        setParams: token ? {auth: token} : undefined
      });
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('[Interceptor error]');
        if (err.status === 401) {
          this.auth.logout();
          this.router.navigate(['/admin', 'login'], {
            queryParams: {
              authFailed: true
            }
          });
        }
        return throwError(() => err);
      })
    );
  }

}
