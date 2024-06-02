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
  response,
} from '@loopback/rest';
import {Lashista} from '../models';
import {LashistaRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';
import { ConfiguracionSeguridad } from '../config/configuracion.seguridad';

export class LashistaController {
  constructor(
    @repository(LashistaRepository)
    public lashistaRepository : LashistaRepository,
  ) {}

  @post('/lashista')
  @response(200, {
    description: 'Lashista model instance',
    content: {'application/json': {schema: getModelSchemaRef(Lashista)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lashista, {
            title: 'NewLashista',
            exclude: ['id'],
          }),
        },
      },
    })
    lashista: Omit<Lashista, 'id'>,
  ): Promise<Lashista> {
    return this.lashistaRepository.create(lashista);
  }

  @get('/lashista/count')
  @response(200, {
    description: 'Lashista model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Lashista) where?: Where<Lashista>,
  ): Promise<Count> {
    return this.lashistaRepository.count(where);
  }

  @authenticate({
    strategy:"auth",
    options:[ConfiguracionSeguridad.menuLashistaId,ConfiguracionSeguridad.listarAccion]
  
  })
  @get('/lashista')
  @response(200, {
    description: 'Array of Lashista model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Lashista, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Lashista) filter?: Filter<Lashista>,
  ): Promise<Lashista[]> {
    return this.lashistaRepository.find(filter);
  }

  @patch('/lashista')
  @response(200, {
    description: 'Lashista PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lashista, {partial: true}),
        },
      },
    })
    lashista: Lashista,
    @param.where(Lashista) where?: Where<Lashista>,
  ): Promise<Count> {
    return this.lashistaRepository.updateAll(lashista, where);
  }

  @get('/lashista/{id}')
  @response(200, {
    description: 'Lashista model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Lashista, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Lashista, {exclude: 'where'}) filter?: FilterExcludingWhere<Lashista>
  ): Promise<Lashista> {
    return this.lashistaRepository.findById(id, filter);
  }

  @patch('/lashista/{id}')
  @response(204, {
    description: 'Lashista PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lashista, {partial: true}),
        },
      },
    })
    lashista: Lashista,
  ): Promise<void> {
    await this.lashistaRepository.updateById(id, lashista);
  }

  @put('/lashista/{id}')
  @response(204, {
    description: 'Lashista PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() lashista: Lashista,
  ): Promise<void> {
    await this.lashistaRepository.replaceById(id, lashista);
  }

  @del('/lashista/{id}')
  @response(204, {
    description: 'Lashista DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.lashistaRepository.deleteById(id);
  }
}
