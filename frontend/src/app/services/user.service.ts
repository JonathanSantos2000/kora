import { Inject, Injectable, inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user.models';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { isPlatformBrowser } from '@angular/common';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(new User());
  public userObservable: Observable<User> = this.userSubject.asObservable();

  private http = inject(HttpClient);
  private toastrService = inject(ToastrService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (this.isBrowser()) {
      const userFromStorage = this.getUserFromLocalStorage();
      if (userFromStorage) {
        this.userSubject.next(userFromStorage);
      }
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Bem-vindo ao Kora, ${user.UsuNom}`,
            'Login bem-sucedido'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Falha ao logar');
        },
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Bem-vindo ao Kora, ${user.UsuNom}`,
            'Registro bem-sucedido'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Registro falhou');
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    if (this.isBrowser()) {
      localStorage.removeItem(USER_KEY);
      window.location.reload();
    }
  }

  private setUserToLocalStorage(user: User) {
    if (this.isBrowser()) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  private getUserFromLocalStorage(): User | null {
    if (this.isBrowser()) {
      const userJson = localStorage.getItem(USER_KEY);
      if (userJson) return JSON.parse(userJson) as User;
    }
    return null;
  }
}
