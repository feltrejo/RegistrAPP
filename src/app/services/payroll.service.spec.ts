import { TestBed, inject } from '@angular/core/testing';
import { PayrollService } from './payroll.service';
import { TaxService } from './tax.service';

describe('PayrollService', () => {
  let taxServiceSpy: jasmine.SpyObj<TaxService>;

  beforeEach(() => {
    taxServiceSpy = jasmine.createSpyObj('TaxService', [
      'federalIncomeTax',
      'stateIncomeTax',
      'socialSecurity',
      'medicare',
    ]);

    taxServiceSpy.federalIncomeTax.and.returnValue(100);
    taxServiceSpy.stateIncomeTax.and.returnValue(50);
    taxServiceSpy.socialSecurity.and.returnValue(75);
    taxServiceSpy.medicare.and.returnValue(25);

    TestBed.configureTestingModule({
      providers: [
        PayrollService,
        { provide: TaxService, useValue: taxServiceSpy },
      ],
    });
  });

  it('should be created when injected', inject([PayrollService], (service: PayrollService) => {
    expect(service).toBeTruthy();
  }));

  it('should be created when manually built', () => {
    const service = new PayrollService(taxServiceSpy);
    expect(service).toBeTruthy();
  });

  it('should calculate net income correctly', () => {
    const service = new PayrollService(taxServiceSpy);
    const income = 1000;
    const netIncome = service.calculateNetIncome(income);
    expect(netIncome).toBe(750);
  });

  it('should calculate net income correctly with zero taxes', () => {
    taxServiceSpy.federalIncomeTax.and.returnValue(0);
    taxServiceSpy.stateIncomeTax.and.returnValue(0);
    taxServiceSpy.socialSecurity.and.returnValue(0);
    taxServiceSpy.medicare.and.returnValue(0);

    const service = new PayrollService(taxServiceSpy);
    const income = 1000;
    const netIncome = service.calculateNetIncome(income);
    expect(netIncome).toBe(1000);
  });

  it('should handle negative income', () => {
    const service = new PayrollService(taxServiceSpy);
    const income = -1000;
    const netIncome = service.calculateNetIncome(income);
    expect(netIncome).toBe(-1250);
  });

  it('should calculate net income correctly for large incomes', () => {
    const largeIncome = 1000000;
    taxServiceSpy.federalIncomeTax.and.returnValue(300000);
    taxServiceSpy.stateIncomeTax.and.returnValue(100000);
    taxServiceSpy.socialSecurity.and.returnValue(125000);
    taxServiceSpy.medicare.and.returnValue(50000);

    const service = new PayrollService(taxServiceSpy);
    const netIncome = service.calculateNetIncome(largeIncome);
    expect(netIncome).toBe(425000);
  });
});
