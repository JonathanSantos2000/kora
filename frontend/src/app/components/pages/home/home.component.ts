import { Component } from '@angular/core';
import  { UserService } from '../../../services/user.service';
import  { Router } from '@angular/router';
import  { User } from '../../../shared/models/user.models';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user!: User;
  constructor(private userService: UserService, private router: Router) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;

      if (
        this.user instanceof User &&
        Object.values(this.user).every(
          (value) => value === undefined || value === null || value === ''
        )
      ) {
        window.location.href = '/register';
      }
    });
  }
}
