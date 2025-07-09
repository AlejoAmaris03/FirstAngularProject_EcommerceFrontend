import { Component, inject, OnInit } from '@angular/core';
import { SaleModel } from '../../../../core/interfaces/models';
import { SalesService } from '../../../../core/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-receipt-details',
  imports: [
  ],
  templateUrl: './receipt-details.component.html',
  styleUrl: './receipt-details.component.css'
})

export default class ReceiptDetailsComponent implements OnInit {
  protected receipts: SaleModel[] = [];
  private saleService = inject(SalesService);
  private route = inject(ActivatedRoute);
  private receiptId = Number(this.route.snapshot.paramMap.get('id'));

  ngOnInit(): void {
    (document.getElementById('receipt-id') as HTMLElement).textContent = `Receipt No. ${this.receiptId}`;

    this.saleService.getPurchaseByReceiptId(this.receiptId).subscribe(receipts => {
      this.receipts = receipts;

      (document.getElementById('date') as HTMLElement).textContent = `Date: ${this.receipts[0].date.toString().split('T')[0]}`;
      (document.getElementById('total') as HTMLElement).textContent = 
        `Total: ${this.receipts.reduce((sum, el) => sum + ((el.totalPrice / el.quantity) * el.quantity), 0)}`;      
    });
  }
}
