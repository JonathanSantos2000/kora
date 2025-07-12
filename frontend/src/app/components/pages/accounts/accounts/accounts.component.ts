import { Component, type OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Account } from '../../../../shared/models/account.model';
import { AccountsService } from '../../../../services/accounts.service';
import { CapitalizePipe } from '../../../../shared/pipes/capitalize.pipe';
import { error } from 'node:console';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, RouterLink, CapitalizePipe], // necessário para ngIf, ngFor e routerLink
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  accounts: Account[] = [];

  constructor(private accountService: AccountsService) {}

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAllAccounts().subscribe((serverAccounts) => {
      this.accounts = serverAccounts;
    });
  }

  deleteAccount(id: string) {
    this.accountService.deleteAccountById(id).subscribe({
      next: () => {
        this.getAccounts();
      },
      error: (error) => {
        console.error("Erro ao deletar conta:", error);
      }
    });
  }
}
