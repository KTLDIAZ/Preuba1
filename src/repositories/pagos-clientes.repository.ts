import {DefaultCrudRepository} from '@loopback/repository';
import {PagosClientes, PagosClientesRelations} from '../models';
import {MercaditoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PagosClientesRepository extends DefaultCrudRepository<
  PagosClientes,
  typeof PagosClientes.prototype.id,
  PagosClientesRelations
> {
  constructor(
    @inject('datasources.mercadito') dataSource: MercaditoDataSource,
  ) {
    super(PagosClientes, dataSource);
  }
}
