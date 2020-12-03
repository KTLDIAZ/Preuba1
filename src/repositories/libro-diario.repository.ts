import {DefaultCrudRepository} from '@loopback/repository';
import {LibroDiario, LibroDiarioRelations} from '../models';
import {MercaditoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LibroDiarioRepository extends DefaultCrudRepository<
  LibroDiario,
  typeof LibroDiario.prototype.id,
  LibroDiarioRelations
> {
  constructor(
    @inject('datasources.mercadito') dataSource: MercaditoDataSource,
  ) {
    super(LibroDiario, dataSource);
  }
}
