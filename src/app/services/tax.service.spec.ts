import { TestBed } from '@angular/core/testing';
import { TaxService } from './tax.service';

describe('TaxService', () => {
  let service: TaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate federal income tax', () => {
    const result = service.federalIncomeTax(1000);
    expect(result).toBe(100); // 10% de 1000
  });

  it('should calculate state income tax', () => {
    const result = service.stateIncomeTax(1000);
    expect(result).toBe(50); // 5% de 1000
  });

  it('should calculate social security contribution', () => {
    const result = service.socialSecurity(1000);
    expect(result).toBe(62); // 6.2% de 1000
  });

  it('should calculate Medicare contribution', () => {
    const result = service.medicare(1000);
    expect(result).toBe(14.5); // 1.45% de 1000
  });
});
