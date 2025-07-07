import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Account } from '../../../../shared/models/account.model';
import { AccountsService } from '../../../../services/accounts.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, RouterLink], // necessário para ngIf, ngFor e routerLink
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})

export class AccountsComponent {
  accounts: Account[] = [];

  constructor(private accountService: AccountsService) {
    this.accountService.getAllAccounts().subscribe((serverAccounts) => {
      this.accounts = serverAccounts;
      console.log(this.accounts);
    });
  }
}
