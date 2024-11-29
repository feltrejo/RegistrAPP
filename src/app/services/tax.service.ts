import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaxService {
  federalIncomeTax(income: number): number {
    return income * 0.10; // 10% de ingreso
  }

  stateIncomeTax(income: number): number {
    return income * 0.05; // 5% de ingreso
  }

  socialSecurity(income: number): number {
    return income * 0.062; // 6.2% de ingreso
  }

  medicare(income: number): number {
    return income * 0.0145; // 1.45% de ingreso
  }
}
