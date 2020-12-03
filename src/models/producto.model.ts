import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mssql: {schema: 'dbo', table: 'Producto'}},
})
export class Producto extends Entity {
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
    type: 'string',
    required: true,
    length: 50,
    mssql: {
      columnName: 'Nombre',
      dataType: 'nvarchar',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {
      columnName: 'idCategoria',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  idCategoria: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {
      columnName: 'idProveedor',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  idProveedor: number;

  @property({
    type: 'number',
    required: true,
    precision: 53,
    mssql: {
      columnName: 'CostoCompra',
      dataType: 'float',
      dataLength: null,
      dataPrecision: 53,
      dataScale: null,
      nullable: 'NO',
    },
  })
  costoCompra: number;

  @property({
    type: 'number',
    required: true,
    precision: 53,
    mssql: {
      columnName: 'PrecioVenta',
      dataType: 'float',
      dataLength: null,
      dataPrecision: 53,
      dataScale: null,
      nullable: 'NO',
    },
  })
  precioVenta: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {
      columnName: 'Existencias',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  existencias: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
