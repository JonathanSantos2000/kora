import { Component, Input, type OnInit } from '@angular/core';

@Component({
  selector: 'app-input-group',
  imports: [],
  templateUrl: './input-group.component.html',
  styleUrl: './input-group.component.css',
})
export class InputGroupComponent implements OnInit {
  @Input()
  label!: string;
  @Input()
  bgColor: string = 'none';
  ngOnInit(): void {}
}
