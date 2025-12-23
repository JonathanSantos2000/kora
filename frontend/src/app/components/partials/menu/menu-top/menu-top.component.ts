import { Component } from '@angular/core';
import { User } from '../../../../shared/models/user.models';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-top.component.html',
  styleUrl: './menu-top.component.css',
})
export class MenuTopComponent {
  menuVariable: boolean = false;

  user!: User;
  constructor(private userService: UserService, private router: Router) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }

  get isAuth() {
    return this.user.UsuTok;
  }

  logout() {
    this.userService.logout();
  }

  openMenu() {
    this.menuVariable = !this.menuVariable;
  }
}
