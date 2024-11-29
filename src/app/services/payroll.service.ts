import { Injectable } from '@angular/core';
import { TaxService } from './tax.service';

@Injectable({
  providedIn: 'root',
})
export class PayrollService {
  constructor(private taxService: TaxService) {}

  calculateNetIncome(income: number): number {
    const federalTax = this.taxService.federalIncomeTax(income);
    const stateTax = this.taxService.stateIncomeTax(income);
    const socialSecurity = this.taxService.socialSecurity(income);
    const medicare = this.taxService.medicare(income);

    return income - (federalTax + stateTax + socialSecurity + medicare);
  }
}
