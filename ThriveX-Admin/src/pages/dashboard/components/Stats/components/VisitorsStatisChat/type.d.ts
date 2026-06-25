export interface StatisResult {
  timeSpan: string[];
  fields: string[];
  items: [
      string[][],
      (string | number)[][],
      unknown[],
      unknown[]
  ];
}

export interface StatisResponse {
  result: StatisResult;
}

export interface EChartsParams {
  axisValue: string;
  seriesName: string;
  data: number;
}

export interface Result {
  timeSpan: string[];
  fields: string[];
  items: [
      string[][],
      (string | number)[][],
      unknown[],
      unknown[]
  ];
}