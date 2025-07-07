import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TextInputComponent } from '../../../partials/form/text-input/text-input.component';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../shared/models/user.models';
import { UserService } from '../../../../services/user.service';
import { IBank } from '../../../../shared/interfaces/IBank';
import { BankService } from '../../../../services/bank.service';

@Component({
  selector: 'app-bank-new',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    RouterModule,
  ],
  templateUrl: './bank-new.component.html',
  styleUrl: './bank-new.component.css',
})
export class BankNewComponent implements OnInit {
  bankForm!: FormGroup;
  isSubmitted: boolean = false;
  user!: User;
  returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private bankService: BankService
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    console.log(this.user.UsuPer);
  }

  ngOnInit(): void {
    this.bankForm = this.formBuilder.group({
      BanNom: ['', [Validators.required]],
      BanSta: [false, [Validators.required]],
      BanIco: ['semicone.jpg', [Validators.required]],
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc() {
    return this.bankForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.bankForm.invalid) return;
    const fv = this.bankForm.value;
    const bank: IBank = {
      BanNom: fv.BanNom,
      BanSta: fv.BanSta,
      BanIco: fv.BanIco,
    };

    this.bankService.CreateBank(bank).subscribe((_) => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
