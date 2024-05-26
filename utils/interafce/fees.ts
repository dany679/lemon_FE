export interface IFees {
  id: string;
  month: number;
  nClient: string;
  energiaEletricaWh: number;
  energiaEletricaPrice: number;
  energiaInjetadaWh: number;
  energiaInjetadaPrice: number;
  energiaCompensadaWh: number;
  energiaCompensadaPrice: number;
  contribPublic: number;
  total: number;
  referenceDate: Date;
  created_at: Date;
  updated_at: Date;
  userId: string;
}

export type IFeesList = IFees[] | [];

export interface IDashboardFees {
  valuesData: ValuesDaum[];
  places: number;
  listData: ListDaum[];
}

export interface ValuesDaum {
  _sum: Sum;
  userId: string;
}

export interface Sum {
  total: number;
  energiaCompensadaPrice: number;
  energiaEletricaPrice: number;
  energiaInjetadaPrice: number;
  energiaCompensadaWh: number;
  energiaEletricaWh: number;
  energiaInjetadaWh: number;
}

export interface ListDaum {
  total: number;
  energiaCompensadaPrice: number;
  energiaEletricaPrice: number;
  energiaInjetadaPrice: number;
  energiaCompensadaWh: number;
  energiaEletricaWh: number;
  energiaInjetadaWh: number;
  referenceDate: string;
  nClient: string;
}
