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
import {DetallePedido} from '../models';
import {DetallePedidoRepository} from '../repositories';

export class DetallePedidoController {
  constructor(
    @repository(DetallePedidoRepository)
    public detallePedidoRepository : DetallePedidoRepository,
  ) {}

  @post('/detalle-pedidos', {
    responses: {
      '200': {
        description: 'DetallePedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetallePedido)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallePedido, {
            title: 'NewDetallePedido',
            exclude: ['id'],
          }),
        },
      },
    })
    detallePedido: Omit<DetallePedido, 'id'>,
  ): Promise<DetallePedido> {
    return this.detallePedidoRepository.create(detallePedido);
  }

  @get('/detalle-pedidos/count', {
    responses: {
      '200': {
        description: 'DetallePedido model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(DetallePedido) where?: Where<DetallePedido>,
  ): Promise<Count> {
    return this.detallePedidoRepository.count(where);
  }

  @get('/detalle-pedidos', {
    responses: {
      '200': {
        description: 'Array of DetallePedido model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(DetallePedido, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(DetallePedido) filter?: Filter<DetallePedido>,
  ): Promise<DetallePedido[]> {
    return this.detallePedidoRepository.find(filter);
  }

  @patch('/detalle-pedidos', {
    responses: {
      '200': {
        description: 'DetallePedido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallePedido, {partial: true}),
        },
      },
    })
    detallePedido: DetallePedido,
    @param.where(DetallePedido) where?: Where<DetallePedido>,
  ): Promise<Count> {
    return this.detallePedidoRepository.updateAll(detallePedido, where);
  }

  @get('/detalle-pedidos/{id}', {
    responses: {
      '200': {
        description: 'DetallePedido model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DetallePedido, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(DetallePedido, {exclude: 'where'}) filter?: FilterExcludingWhere<DetallePedido>
  ): Promise<DetallePedido> {
    return this.detallePedidoRepository.findById(id, filter);
  }

  @patch('/detalle-pedidos/{id}', {
    responses: {
      '204': {
        description: 'DetallePedido PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallePedido, {partial: true}),
        },
      },
    })
    detallePedido: DetallePedido,
  ): Promise<void> {
    await this.detallePedidoRepository.updateById(id, detallePedido);
  }

  @put('/detalle-pedidos/{id}', {
    responses: {
      '204': {
        description: 'DetallePedido PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() detallePedido: DetallePedido,
  ): Promise<void> {
    await this.detallePedidoRepository.replaceById(id, detallePedido);
  }

  @del('/detalle-pedidos/{id}', {
    responses: {
      '204': {
        description: 'DetallePedido DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.detallePedidoRepository.deleteById(id);
  }
}
