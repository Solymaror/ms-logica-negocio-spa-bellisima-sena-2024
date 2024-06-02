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
import {Recepcionista} from '../models';
import {RecepcionistaRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';
import { ConfiguracionSeguridad } from '../config/configuracion.seguridad';

export class RecepcionistaController {
  constructor(
    @repository(RecepcionistaRepository)
    public recepcionistaRepository : RecepcionistaRepository,
  ) {}

  @post('/recepcionista')
  @response(200, {
    description: 'Recepcionista model instance',
    content: {'application/json': {schema: getModelSchemaRef(Recepcionista)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recepcionista, {
            title: 'NewRecepcionista',
            exclude: ['id'],
          }),
        },
      },
    })
    recepcionista: Omit<Recepcionista, 'id'>,
  ): Promise<Recepcionista> {
    return this.recepcionistaRepository.create(recepcionista);
  }

  @get('/recepcionista/count')
  @response(200, {
    description: 'Recepcionista model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Recepcionista) where?: Where<Recepcionista>,
  ): Promise<Count> {
    return this.recepcionistaRepository.count(where);
  }
  @authenticate({
    strategy:"auth",
    options:[ConfiguracionSeguridad.menuRecepcionistaId,ConfiguracionSeguridad.listarAccion]
  
  })
  @get('/recepcionista')
  @response(200, {
    description: 'Array of Recepcionista model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Recepcionista, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Recepcionista) filter?: Filter<Recepcionista>,
  ): Promise<Recepcionista[]> {
    return this.recepcionistaRepository.find(filter);
  }

  @patch('/recepcionista')
  @response(200, {
    description: 'Recepcionista PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recepcionista, {partial: true}),
        },
      },
    })
    recepcionista: Recepcionista,
    @param.where(Recepcionista) where?: Where<Recepcionista>,
  ): Promise<Count> {
    return this.recepcionistaRepository.updateAll(recepcionista, where);
  }

  @get('/recepcionista/{id}')
  @response(200, {
    description: 'Recepcionista model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Recepcionista, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Recepcionista, {exclude: 'where'}) filter?: FilterExcludingWhere<Recepcionista>
  ): Promise<Recepcionista> {
    return this.recepcionistaRepository.findById(id, filter);
  }

  @patch('/recepcionista/{id}')
  @response(204, {
    description: 'Recepcionista PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recepcionista, {partial: true}),
        },
      },
    })
    recepcionista: Recepcionista,
  ): Promise<void> {
    await this.recepcionistaRepository.updateById(id, recepcionista);
  }

  @put('/recepcionista/{id}')
  @response(204, {
    description: 'Recepcionista PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() recepcionista: Recepcionista,
  ): Promise<void> {
    await this.recepcionistaRepository.replaceById(id, recepcionista);
  }

  @del('/recepcionista/{id}')
  @response(204, {
    description: 'Recepcionista DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.recepcionistaRepository.deleteById(id);
  }
}
