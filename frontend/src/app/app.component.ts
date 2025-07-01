import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuLeftComponent } from "./components/partials/menu/menu-left/menu-left.component";
import { MenuTopComponent } from "./components/partials/menu/menu-top/menu-top.component";
import { MenuAddComponent } from "./components/partials/menu/menu-add/menu-add.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuLeftComponent, MenuTopComponent, MenuAddComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
