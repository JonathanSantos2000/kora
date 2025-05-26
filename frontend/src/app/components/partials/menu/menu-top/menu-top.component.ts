import { Component } from '@angular/core';
import { User } from '../../../../shared/models/user.models';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-top',
  imports: [],
  templateUrl: './menu-top.component.html',
  styleUrl: './menu-top.component.css',
})
export class MenuTopComponent {
  menuVariable: boolean = false;

  user!: User;
  constructor(private userService: UserService, private router: Router) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser.user; // <--- aqui está a chave!
      console.log(this.user.name); // Agora vai funcionar!
    });
  }

  get isAuth() {
    return this.user.token;
  }

  logout() {
    this.userService.logout();
  }

  openMenu() {
    this.menuVariable = !this.menuVariable;
  }
}
