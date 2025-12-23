import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-left',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-left.component.html',
  styleUrl: './menu-left.component.css',
})
export class MenuLeftComponent {
  menu_level: string = 'menu';

  open_config() {
    this.menu_level = 'config';
  }

  back_home() {
    this.menu_level = 'menu';
  }
}
