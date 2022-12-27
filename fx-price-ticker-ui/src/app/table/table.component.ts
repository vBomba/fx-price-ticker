import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Price, PriceDirection, UIPrice } from 'src/models/price';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() set prices(newPrices: Price[]) {
    this.updatePrices(newPrices);

    this.cdr.detectChanges();
  }

  PriceDirection: typeof PriceDirection = PriceDirection;
  actualPrices: UIPrice[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  trackByFn(index: number, item: Price): number {
    return item.id;
  }

  private updatePrices(newPrices: UIPrice[] | Price[]): void {
    if (this.actualPrices.length === 0) {
      this.actualPrices = newPrices;
    }

    (newPrices as UIPrice[]).forEach((nP, i) => {
      nP.bidDirection = this.getPriceDirection(
        nP.bid,
        this.actualPrices[i]?.bid
      );
      nP.askDirection = this.getPriceDirection(
        nP.ask,
        this.actualPrices[i]?.ask
      );

      this.actualPrices[i] = nP;
    });
  }

  private getPriceDirection(
    newPrice: number,
    oldPrice?: number
  ): PriceDirection | undefined {
    if (oldPrice == null || oldPrice === newPrice) {
      return;
    }

    return oldPrice > newPrice ? PriceDirection.Down : PriceDirection.Up;
  }
}
