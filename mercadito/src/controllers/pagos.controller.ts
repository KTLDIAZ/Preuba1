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
import {PagosClientes} from '../models';
import {PagosClientesRepository} from '../repositories';

export class PagosController {
  constructor(
    @repository(PagosClientesRepository)
    public pagosClientesRepository : PagosClientesRepository,
  ) {}

  @post('/pagos-clientes', {
    responses: {
      '200': {
        description: 'PagosClientes model instance',
        content: {'application/json': {schema: getModelSchemaRef(PagosClientes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagosClientes, {
            title: 'NewPagosClientes',
            exclude: ['id'],
          }),
        },
      },
    })
    pagosClientes: Omit<PagosClientes, 'id'>,
  ): Promise<PagosClientes> {
    return this.pagosClientesRepository.create(pagosClientes);
  }

  @get('/pagos-clientes/count', {
    responses: {
      '200': {
        description: 'PagosClientes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PagosClientes) where?: Where<PagosClientes>,
  ): Promise<Count> {
    return this.pagosClientesRepository.count(where);
  }

  @get('/pagos-clientes', {
    responses: {
      '200': {
        description: 'Array of PagosClientes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PagosClientes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PagosClientes) filter?: Filter<PagosClientes>,
  ): Promise<PagosClientes[]> {
    return this.pagosClientesRepository.find(filter);
  }

  @patch('/pagos-clientes', {
    responses: {
      '200': {
        description: 'PagosClientes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagosClientes, {partial: true}),
        },
      },
    })
    pagosClientes: PagosClientes,
    @param.where(PagosClientes) where?: Where<PagosClientes>,
  ): Promise<Count> {
    return this.pagosClientesRepository.updateAll(pagosClientes, where);
  }

  @get('/pagos-clientes/{id}', {
    responses: {
      '200': {
        description: 'PagosClientes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PagosClientes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PagosClientes, {exclude: 'where'}) filter?: FilterExcludingWhere<PagosClientes>
  ): Promise<PagosClientes> {
    return this.pagosClientesRepository.findById(id, filter);
  }

  @patch('/pagos-clientes/{id}', {
    responses: {
      '204': {
        description: 'PagosClientes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagosClientes, {partial: true}),
        },
      },
    })
    pagosClientes: PagosClientes,
  ): Promise<void> {
    await this.pagosClientesRepository.updateById(id, pagosClientes);
  }

  @put('/pagos-clientes/{id}', {
    responses: {
      '204': {
        description: 'PagosClientes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pagosClientes: PagosClientes,
  ): Promise<void> {
    await this.pagosClientesRepository.replaceById(id, pagosClientes);
  }

  @del('/pagos-clientes/{id}', {
    responses: {
      '204': {
        description: 'PagosClientes DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pagosClientesRepository.deleteById(id);
  }
}
