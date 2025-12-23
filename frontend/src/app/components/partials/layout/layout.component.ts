import { Component, OnInit } from '@angular/core';
import { MenuTopComponent } from '../menu/menu-top/menu-top.component';
import { RouterModule } from '@angular/router';
import { MenuLeftComponent } from '../menu/menu-left/menu-left.component';
import { MenuAddComponent } from '../menu/menu-add/menu-add.component';
import { CommonModule } from '@angular/common';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { MenuBottomComponent } from "../menu/menu-bottom/menu-bottom.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MenuTopComponent,
    RouterModule,
    MenuLeftComponent,
    MenuAddComponent,
    MenuBottomComponent
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  isMobile$!: Observable<BreakpointState>;

  constructor(private breakpoint: BreakpointObserver) {}

  ngOnInit() {
    this.isMobile$ = this.breakpoint.observe([Breakpoints.Handset]);
  }
}
