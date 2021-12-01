export interface Sensor {
  id: number;
  forestry_id: number;
  type: SensorType;
  name: string;
  x: string;
  y: string;
  z: string;
}

export interface SensorType {
  id: number;
  name: string;
  unit: string;
  max_std_value: string;
  min_std_value: string;
}

export interface SensorData {
  sensor_id: number;
  value: number;
  date: Date;
}
