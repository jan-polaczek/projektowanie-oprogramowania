export interface Forestry {
  forestry_id: number;
  forestry_district_id: number;
  forestry_district_name: string;
  forester: number;
  name: string;
  area: number;
}

export interface ForestryAddEditRequest {
  forestry_district: number;
  forester: number;
  name: string;
  area: string;
}
