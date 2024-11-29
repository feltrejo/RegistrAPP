import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { IssTrackingDataService } from './iss-tracking-data.service';
import { IssNowResponse } from './iss-now-response.model';  // Importa tu interfaz

describe('IssTrackingDataService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let issTrackingDataService: IssTrackingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IssTrackingDataService],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    issTrackingDataService = TestBed.inject(IssTrackingDataService);
  });

  it('exists', inject([IssTrackingDataService], (service: IssTrackingDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('location', () => {
    it('gets the location of the ISS now', () => {
      issTrackingDataService.location().subscribe((data: IssNowResponse) => {
        expect(data.iss_position).toEqual({ longitude: '-138.1719', latitude: '44.4423' });
      });

      const req = httpTestingController.expectOne('http://api.open-notify.org/iss-now.json');
      expect(req.request.method).toBe('GET');
      req.flush({
        iss_position: { longitude: '-138.1719', latitude: '44.4423' },
        timestamp: 1525950644,
        message: 'success',
      });

      httpTestingController.verify();
    });

    it('gets a valid timestamp in the response', () => {
      issTrackingDataService.location().subscribe((data: IssNowResponse) => {
        expect(data.timestamp).toBeGreaterThan(0);
      });

      const req = httpTestingController.expectOne('http://api.open-notify.org/iss-now.json');
      expect(req.request.method).toBe('GET');
      req.flush({
        iss_position: { longitude: '-138.1719', latitude: '44.4423' },
        timestamp: 1525950644,
        message: 'success',
      });

      httpTestingController.verify();
    });

    it('contains the message success', () => {
      issTrackingDataService.location().subscribe((data: IssNowResponse) => {
        expect(data.message).toBe('success');
      });

      const req = httpTestingController.expectOne('http://api.open-notify.org/iss-now.json');
      expect(req.request.method).toBe('GET');
      req.flush({
        iss_position: { longitude: '-138.1719', latitude: '44.4423' },
        timestamp: 1525950644,
        message: 'success',
      });

      httpTestingController.verify();
    });

    it('handles a network error gracefully', () => {
      issTrackingDataService.location().subscribe(
        () => fail('should have failed with a network error'),
        (error) => {
          expect(error.status).toBe(500);
        }
      );

      const req = httpTestingController.expectOne('http://api.open-notify.org/iss-now.json');
      expect(req.request.method).toBe('GET');
      req.flush('Invalid request parameters', {
        status: 500,
        statusText: 'Internal Server Error',
      });

      httpTestingController.verify();
    });
  });
});
