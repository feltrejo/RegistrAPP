export interface IssPosition {
    longitude: string;
    latitude: string;
  }
  
  export interface IssNowResponse {
    iss_position: IssPosition;
    timestamp: number;
    message: string;
  }
  