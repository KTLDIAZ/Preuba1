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
import {LibroDiario} from '../models';
import {LibroDiarioRepository} from '../repositories';

export class LibroDiarioController {
  constructor(
    @repository(LibroDiarioRepository)
    public libroDiarioRepository: LibroDiarioRepository,
  ) {}

  @post('/libro-diarios', {
    responses: {
      '200': {
        description: 'LibroDiario model instance',
        content: {'application/json': {schema: getModelSchemaRef(LibroDiario)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LibroDiario, {
            title: 'NewLibroDiario',
            exclude: ['id'],
          }),
        },
      },
    })
    libroDiario: Omit<LibroDiario, 'id'>,
  ): Promise<LibroDiario> {
    return this.libroDiarioRepository.create(libroDiario);
  }

  @get('/libro-diarios/count', {
    responses: {
      '200': {
        description: 'LibroDiario model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(LibroDiario) where?: Where<LibroDiario>,
  ): Promise<Count> {
    return this.libroDiarioRepository.count(where);
  }

  @get('/libro-diarios', {
    responses: {
      '200': {
        description: 'Array of LibroDiario model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(LibroDiario, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(LibroDiario) filter?: Filter<LibroDiario>,
  ): Promise<LibroDiario[]> {
    return this.libroDiarioRepository.find(filter);
  }

  @patch('/libro-diarios', {
    responses: {
      '200': {
        description: 'LibroDiario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LibroDiario, {partial: true}),
        },
      },
    })
    libroDiario: LibroDiario,
    @param.where(LibroDiario) where?: Where<LibroDiario>,
  ): Promise<Count> {
    return this.libroDiarioRepository.updateAll(libroDiario, where);
  }

  @get('/libro-diarios/{id}', {
    responses: {
      '200': {
        description: 'LibroDiario model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(LibroDiario, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(LibroDiario, {exclude: 'where'})
    filter?: FilterExcludingWhere<LibroDiario>,
  ): Promise<LibroDiario> {
    return this.libroDiarioRepository.findById(id, filter);
  }

  @patch('/libro-diarios/{id}', {
    responses: {
      '204': {
        description: 'LibroDiario PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LibroDiario, {partial: true}),
        },
      },
    })
    libroDiario: LibroDiario,
  ): Promise<void> {
    await this.libroDiarioRepository.updateById(id, libroDiario);
  }

  @put('/libro-diarios/{id}', {
    responses: {
      '204': {
        description: 'LibroDiario PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() libroDiario: LibroDiario,
  ): Promise<void> {
    await this.libroDiarioRepository.replaceById(id, libroDiario);
  }

  @del('/libro-diarios/{id}', {
    responses: {
      '204': {
        description: 'LibroDiario DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.libroDiarioRepository.deleteById(id);
  }

  @get('/libro-diarios/vCuentaPersonal')
  async vista1(): Promise<any> {
    let datos: any[] = await this.getView1();
    return datos;
  }
  async getView1() {
    return await this.libroDiarioRepository.dataSource.execute(
      `SELECT * FROM dbo.vCuentaPersonal`,
    );
  }
}
