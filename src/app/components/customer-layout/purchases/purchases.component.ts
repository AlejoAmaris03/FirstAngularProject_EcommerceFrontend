import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService, SalesService } from '../../../core/services';
import { SaleModel } from '../../../core/interfaces/models';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-purchases',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css'
})

export default class PurchasesComponent implements OnInit {
  protected purchases: SaleModel[] = [];
  private saleService = inject(SalesService);
  protected currentUserId = new AuthenticationService().getUser()!.id;

  ngOnInit(): void {
    this.saleService.getPurchasesByUserId(this.currentUserId).subscribe(purchases => {
      this.purchases = purchases;
    });
  }
}
