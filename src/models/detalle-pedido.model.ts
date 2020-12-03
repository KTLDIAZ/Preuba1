import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mssql: {schema: 'dbo', table: 'DetallePedido'},
  },
})
export class DetallePedido extends Entity {
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
      columnName: 'idPedido',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  idPedido: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {
      columnName: 'idProducto',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  idProducto: number;

  @property({
    type: 'number',
    required: true,
    precision: 53,
    mssql: {
      columnName: 'CostoUnidad',
      dataType: 'float',
      dataLength: null,
      dataPrecision: 53,
      dataScale: null,
      nullable: 'NO',
    },
  })
  costoUnidad: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {
      columnName: 'Cantidad',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  cantidad: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DetallePedido>) {
    super(data);
  }
}

export interface DetallePedidoRelations {
  // describe navigational properties here
}

export type DetallePedidoWithRelations = DetallePedido & DetallePedidoRelations;
