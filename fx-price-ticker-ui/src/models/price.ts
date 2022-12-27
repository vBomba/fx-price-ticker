export interface Price {
  id: number;
  instrument: string;
  bid: number;
  ask: number;
  timestamp: string;
}

export interface UIPrice extends Price {
  bidDirection?: PriceDirection;
  askDirection?: PriceDirection;
}

export enum PriceDirection {
  Up = 'price-up',
  Down = 'price-down',
}
