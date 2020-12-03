import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mssql: {schema: 'dbo', table: 'LibroDiario'}},
})
export class LibroDiario extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: 1,
    mssql: {
      columnName: 'id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'YES',
    },
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {
      columnName: 'idTransaccion',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  idTransaccion: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {
      columnName: 'idCuenta',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  idCuenta: number;

  @property({
    type: 'number',
    required: true,
    precision: 53,
    mssql: {
      columnName: 'Debe',
      dataType: 'float',
      dataLength: null,
      dataPrecision: 53,
      dataScale: null,
      nullable: 'NO',
    },
  })
  debe: number;

  @property({
    type: 'number',
    required: true,
    precision: 53,
    mssql: {
      columnName: 'Haber',
      dataType: 'float',
      dataLength: null,
      dataPrecision: 53,
      dataScale: null,
      nullable: 'NO',
    },
  })
  haber: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<LibroDiario>) {
    super(data);
  }
}

export interface LibroDiarioRelations {
  // describe navigational properties here
}

export type LibroDiarioWithRelations = LibroDiario & LibroDiarioRelations;
