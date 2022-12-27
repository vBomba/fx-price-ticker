import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIPrice } from 'src/models/price';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test the empty table ', () => {
    let tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(1);
  });

  it('should test the table data changes', async () => {
    component.actualPrices = [
      {
        instrument: 'testPair1',
        ask: 2,
        bid: 3,
      } as UIPrice,
    ];
    (component as any).cdr.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('tr').length).toBe(2);
    expect(
      fixture.nativeElement.querySelector('table>.row>.instrument').textContent
    ).toContain('testPair1');
    expect(
      fixture.nativeElement.querySelector('table>.row>.ask').textContent
    ).toContain('2.0000');
    expect(
      fixture.nativeElement.querySelector('table>.row>.bid').textContent
    ).toContain('3.0000');

    component.prices = [
      {
        instrument: 'testPair2',
        ask: 1,
        bid: 4,
      } as UIPrice,
    ];

    expect(fixture.nativeElement.querySelectorAll('tr').length).toBe(2);
    expect(
      fixture.nativeElement.querySelector('table>.row>.instrument').textContent
    ).toContain('testPair2');
    expect(
      fixture.nativeElement.querySelector('table>.row>.ask').textContent
    ).toContain('1.0000');
    expect(
      fixture.nativeElement.querySelector('table>.row>.bid').textContent
    ).toContain('4.0000');

    expect(
      window.getComputedStyle(
        fixture.nativeElement.querySelector('table>.row>.bid')
      ).backgroundColor
    ).toEqual('rgba(0, 128, 0, 0.05)');
    expect(
      window.getComputedStyle(
        fixture.nativeElement.querySelector('table>.row>.ask')
      ).backgroundColor
    ).toEqual('rgba(255, 0, 0, 0.05)');
  });
});
