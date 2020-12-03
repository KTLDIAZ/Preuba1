import {DefaultCrudRepository} from '@loopback/repository';
import {Transacciones, TransaccionesRelations} from '../models';
import {MercaditoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TransaccionesRepository extends DefaultCrudRepository<
  Transacciones,
  typeof Transacciones.prototype.id,
  TransaccionesRelations
> {
  constructor(
    @inject('datasources.mercadito') dataSource: MercaditoDataSource,
  ) {
    super(Transacciones, dataSource);
  }
}
