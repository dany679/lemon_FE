export interface IPointsList {
  id: string;
  name: string;
  sensor: string;
  sensorID: string;
  machineId: string;
  Machine: Machine;
}

export interface Machine {
  name: string;
  type: string;
}
export interface IMachine extends Machine {
  id?: string;
}
