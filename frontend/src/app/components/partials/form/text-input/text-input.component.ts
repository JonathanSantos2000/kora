import { Component, Input, type OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
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
  @Input() control!: AbstractControl;
  @Input() showErrorWhen!: boolean;
  @Input() label!: string;
  @Input() type: 'text' | 'password' | 'email' | 'number' = 'text';
  @Input() currency: boolean = false;

  get formControl() {
    return this.control as FormControl;
  }

  get formattedValue(): string {
    if (
      this.currency &&
      this.control?.value != null &&
      this.control.value !== ''
    ) {
      const number = Number(this.control.value);
      return number.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    }
    return this.control?.value || '';
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    if (this.currency) {
      // Remove tudo que não for número
      const numeric = value.replace(/\D/g, '');

      // Divide por 100 para manter centavos
      const number = Number(numeric) / 100;
      this.control.setValue(number);
    } else {
      this.control.setValue(value);
    }
  }

  ngOnInit(): void {}
}
