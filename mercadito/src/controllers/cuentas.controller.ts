import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {CuentasContables} from '../models';
import {CuentasContablesRepository} from '../repositories';

export class CuentasController {
  constructor(
    @repository(CuentasContablesRepository)
    public cuentasContablesRepository : CuentasContablesRepository,
  ) {}

  @post('/cuentas-contables', {
    responses: {
      '200': {
        description: 'CuentasContables model instance',
        content: {'application/json': {schema: getModelSchemaRef(CuentasContables)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CuentasContables, {
            title: 'NewCuentasContables',
            exclude: ['id'],
          }),
        },
      },
    })
    cuentasContables: Omit<CuentasContables, 'id'>,
  ): Promise<CuentasContables> {
    return this.cuentasContablesRepository.create(cuentasContables);
  }

  @get('/cuentas-contables/count', {
    responses: {
      '200': {
        description: 'CuentasContables model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(CuentasContables) where?: Where<CuentasContables>,
  ): Promise<Count> {
    return this.cuentasContablesRepository.count(where);
  }

  @get('/cuentas-contables', {
    responses: {
      '200': {
        description: 'Array of CuentasContables model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CuentasContables, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CuentasContables) filter?: Filter<CuentasContables>,
  ): Promise<CuentasContables[]> {
    return this.cuentasContablesRepository.find(filter);
  }

  @patch('/cuentas-contables', {
    responses: {
      '200': {
        description: 'CuentasContables PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CuentasContables, {partial: true}),
        },
      },
    })
    cuentasContables: CuentasContables,
    @param.where(CuentasContables) where?: Where<CuentasContables>,
  ): Promise<Count> {
    return this.cuentasContablesRepository.updateAll(cuentasContables, where);
  }

  @get('/cuentas-contables/{id}', {
    responses: {
      '200': {
        description: 'CuentasContables model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CuentasContables, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CuentasContables, {exclude: 'where'}) filter?: FilterExcludingWhere<CuentasContables>
  ): Promise<CuentasContables> {
    return this.cuentasContablesRepository.findById(id, filter);
  }

  @patch('/cuentas-contables/{id}', {
    responses: {
      '204': {
        description: 'CuentasContables PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CuentasContables, {partial: true}),
        },
      },
    })
    cuentasContables: CuentasContables,
  ): Promise<void> {
    await this.cuentasContablesRepository.updateById(id, cuentasContables);
  }

  @put('/cuentas-contables/{id}', {
    responses: {
      '204': {
        description: 'CuentasContables PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cuentasContables: CuentasContables,
  ): Promise<void> {
    await this.cuentasContablesRepository.replaceById(id, cuentasContables);
  }

  @del('/cuentas-contables/{id}', {
    responses: {
      '204': {
        description: 'CuentasContables DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cuentasContablesRepository.deleteById(id);
  }
}
