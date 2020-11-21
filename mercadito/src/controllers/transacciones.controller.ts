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
import {Transacciones} from '../models';
import {TransaccionesRepository} from '../repositories';

export class TransaccionesController {
  constructor(
    @repository(TransaccionesRepository)
    public transaccionesRepository : TransaccionesRepository,
  ) {}

  @post('/transacciones', {
    responses: {
      '200': {
        description: 'Transacciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transacciones)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transacciones, {
            title: 'NewTransacciones',
            exclude: ['id'],
          }),
        },
      },
    })
    transacciones: Omit<Transacciones, 'id'>,
  ): Promise<Transacciones> {
    return this.transaccionesRepository.create(transacciones);
  }

  @get('/transacciones/count', {
    responses: {
      '200': {
        description: 'Transacciones model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Transacciones) where?: Where<Transacciones>,
  ): Promise<Count> {
    return this.transaccionesRepository.count(where);
  }

  @get('/transacciones', {
    responses: {
      '200': {
        description: 'Array of Transacciones model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Transacciones, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Transacciones) filter?: Filter<Transacciones>,
  ): Promise<Transacciones[]> {
    return this.transaccionesRepository.find(filter);
  }

  @patch('/transacciones', {
    responses: {
      '200': {
        description: 'Transacciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transacciones, {partial: true}),
        },
      },
    })
    transacciones: Transacciones,
    @param.where(Transacciones) where?: Where<Transacciones>,
  ): Promise<Count> {
    return this.transaccionesRepository.updateAll(transacciones, where);
  }

  @get('/transacciones/{id}', {
    responses: {
      '200': {
        description: 'Transacciones model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Transacciones, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Transacciones, {exclude: 'where'}) filter?: FilterExcludingWhere<Transacciones>
  ): Promise<Transacciones> {
    return this.transaccionesRepository.findById(id, filter);
  }

  @patch('/transacciones/{id}', {
    responses: {
      '204': {
        description: 'Transacciones PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transacciones, {partial: true}),
        },
      },
    })
    transacciones: Transacciones,
  ): Promise<void> {
    await this.transaccionesRepository.updateById(id, transacciones);
  }

  @put('/transacciones/{id}', {
    responses: {
      '204': {
        description: 'Transacciones PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() transacciones: Transacciones,
  ): Promise<void> {
    await this.transaccionesRepository.replaceById(id, transacciones);
  }

  @del('/transacciones/{id}', {
    responses: {
      '204': {
        description: 'Transacciones DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.transaccionesRepository.deleteById(id);
  }
}
