import { Component, inject, OnInit } from '@angular/core';
import { SalesService } from '../../../core/services';
import { SaleModel } from '../../../core/interfaces/models';
import { DatePipe } from "@angular/common";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sales',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})

export default class SalesComponent implements OnInit{
  protected sales: SaleModel[] = [];
  private saleService = inject(SalesService);

  ngOnInit(): void {
    this.saleService.getSales().subscribe(sales => {
      this.sales = sales;
    });
  }
}
