import { Component, inject, OnInit } from '@angular/core';
import { SalesService } from '../../../../core/services';
import { SaleModel } from '../../../../core/interfaces/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-receipt-details',
  imports: [
  ],
  templateUrl: './receipt-details.component.html',
  styleUrl: './receipt-details.component.css'
})

export default class ReceiptDetailsComponent implements OnInit {
  protected sales: SaleModel[] = [];
  private saleService = inject(SalesService);
  private route = inject(ActivatedRoute);
  protected receiptId = Number(this.route.snapshot.paramMap.get('id'));

  ngOnInit(): void {
    (document.getElementById('receipt-id') as HTMLElement).textContent = `Receipt No. ${this.receiptId}`;

    this.saleService.getSaleByReceiptId(this.receiptId).subscribe(sales => {
      this.sales = sales;

      (document.getElementById('date') as HTMLElement).textContent = `Date: ${this.sales[0].date.toString().split('T')[0]}`;
      (document.getElementById('user') as HTMLElement).textContent = `User: ${this.sales[0].user.name} ${this.sales[0].user.surname}`;
      (document.getElementById('total') as HTMLElement).textContent = 
        `Total: $${this.sales.reduce((sum, el) => sum + ((el.totalPrice / el.quantity) * el.quantity), 0)
      }`;
    });
  }
}
