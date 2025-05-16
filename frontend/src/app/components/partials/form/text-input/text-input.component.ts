import { Component, Input, type OnInit } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputValidationComponent } from '../input-validation/input-validation.component';
import { InputGroupComponent } from '../input-group/input-group.component';

@Component({
  standalone: true,
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
  imports: [InputGroupComponent, InputValidationComponent, ReactiveFormsModule],
})
export class TextInputComponent implements OnInit {
  @Input()
  control!: AbstractControl;
  @Input()
  showErrorWhen!: boolean;

  @Input()
  label!: string;
  @Input()
  type: 'text' | 'password' | 'email' | 'number' = 'text';

  get formControl() {
    return this.control as FormControl;
  }
  ngOnInit(): void {}
}
