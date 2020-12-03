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
import {Proveedor} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorController {
  constructor(
    @repository(ProveedorRepository)
    public proveedorRepository: ProveedorRepository,
  ) {}

  @post('/proveedors', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proveedor)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {
            title: 'NewProveedor',
            exclude: ['id'],
          }),
        },
      },
    })
    proveedor: Omit<Proveedor, 'id'>,
  ): Promise<Proveedor> {
    return this.proveedorRepository.create(proveedor);
  }

  @get('/proveedors/count', {
    responses: {
      '200': {
        description: 'Proveedor model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Proveedor) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.proveedorRepository.count(where);
  }

  @get('/proveedors', {
    responses: {
      '200': {
        description: 'Array of Proveedor model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Proveedor, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Proveedor) filter?: Filter<Proveedor>,
  ): Promise<Proveedor[]> {
    return this.proveedorRepository.find(filter);
  }

  @patch('/proveedors', {
    responses: {
      '200': {
        description: 'Proveedor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {partial: true}),
        },
      },
    })
    proveedor: Proveedor,
    @param.where(Proveedor) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.proveedorRepository.updateAll(proveedor, where);
  }

  @get('/proveedors/{id}', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Proveedor, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Proveedor, {exclude: 'where'})
    filter?: FilterExcludingWhere<Proveedor>,
  ): Promise<Proveedor> {
    return this.proveedorRepository.findById(id, filter);
  }

  @patch('/proveedors/{id}', {
    responses: {
      '204': {
        description: 'Proveedor PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {partial: true}),
        },
      },
    })
    proveedor: Proveedor,
  ): Promise<void> {
    await this.proveedorRepository.updateById(id, proveedor);
  }

  @put('/proveedors/{id}', {
    responses: {
      '204': {
        description: 'Proveedor PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() proveedor: Proveedor,
  ): Promise<void> {
    await this.proveedorRepository.replaceById(id, proveedor);
  }

  @del('/proveedors/{id}', {
    responses: {
      '204': {
        description: 'Proveedor DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.proveedorRepository.deleteById(id);
  }

  @get('/proveedors/ClasificarProveedores')
  async vista1(
    @param.query.number('Fecha') Fecha: Date,
    @param.query.integer('Periodo') Periodo: Number,
  ): Promise<any> {
    let datos: any[] = await this.getView1(Fecha, Periodo);
    return datos;
  }
  async getView1(arg1: Date, arg2: Number) {
    return await this.proveedorRepository.dataSource.execute(
      `EXECUTE dbo.ClasificarProveedores 100, 5, '${arg1}',  14`,
    );
  }
}
