import { Price } from '../models/price';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { forkJoin, interval, Subscription } from 'rxjs';
import { PriceService } from 'src/services/price.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  prices: Price[] = [];

  private instruments: string[] = [];
  private subscriber: Subscription = new Subscription();

  constructor(
    private priceService: PriceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllPrices();
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  private getAllLatestPrices(): void {
    this.subscriber.add(
      forkJoin(
        this.instruments.map((i) => {
          return this.priceService.getLatestPrice(i);
        })
      ).subscribe((prices) => {
        this.prices = prices;
        this.cdr.detectChanges();
      })
    );
  }

  private getAllPrices(): void {
    this.subscriber.add(
      this.priceService.getAllPrices().subscribe((prices) => {
        this.prices = prices;
        this.instruments = prices.map((p) => p.instrument);
        this.cdr.detectChanges();
        this.subscriber.add(
          interval(1000).subscribe(() => this.getAllLatestPrices())
        );
      })
    );
  }
}
