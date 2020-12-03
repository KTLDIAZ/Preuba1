import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mercadito',
  connector: 'mssql',
  url:
    'mssql://ktldiaz_SQLLogin_1:7qrynnqxbu@MercaditoMelvin.mssql.somee.com/MercaditoMelvin',
  host: 'MercaditoMelvin.mssql.somee.com',
  port: 1433,
  user: 'ktldiaz_SQLLogin_1',
  password: '7qrynnqxbu',
  database: 'MercaditoMelvin',
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MercaditoDataSource
  extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mercadito';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mercadito', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
