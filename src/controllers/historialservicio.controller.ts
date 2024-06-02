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
import {Historialservicio} from '../models';
import {HistorialservicioRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';
import { ConfiguracionSeguridad } from '../config/configuracion.seguridad';

export class HistorialservicioController {
  constructor(
    @repository(HistorialservicioRepository)
    public historialservicioRepository : HistorialservicioRepository,
  ) {}

  @post('/historialservicios')
  @response(200, {
    description: 'Historialservicio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Historialservicio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Historialservicio, {
            title: 'NewHistorialservicio',
            exclude: ['id'],
          }),
        },
      },
    })
    historialservicio: Omit<Historialservicio, 'id'>,
  ): Promise<Historialservicio> {
    return this.historialservicioRepository.create(historialservicio);
  }

  @get('/historialservicios/count')
  @response(200, {
    description: 'Historialservicio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Historialservicio) where?: Where<Historialservicio>,
  ): Promise<Count> {
    return this.historialservicioRepository.count(where);
  }


  @authenticate({
    strategy:"auth",
    options:[ConfiguracionSeguridad.menuHistorialServicioId,ConfiguracionSeguridad.listarAccion]
  
  })
  @get('/historialservicios')
  @response(200, {
    description: 'Array of Historialservicio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Historialservicio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Historialservicio) filter?: Filter<Historialservicio>,
  ): Promise<Historialservicio[]> {
    return this.historialservicioRepository.find(filter);
  }

  @patch('/historialservicios')
  @response(200, {
    description: 'Historialservicio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Historialservicio, {partial: true}),
        },
      },
    })
    historialservicio: Historialservicio,
    @param.where(Historialservicio) where?: Where<Historialservicio>,
  ): Promise<Count> {
    return this.historialservicioRepository.updateAll(historialservicio, where);
  }

  @get('/historialservicios/{id}')
  @response(200, {
    description: 'Historialservicio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Historialservicio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Historialservicio, {exclude: 'where'}) filter?: FilterExcludingWhere<Historialservicio>
  ): Promise<Historialservicio> {
    return this.historialservicioRepository.findById(id, filter);
  }

  @patch('/historialservicios/{id}')
  @response(204, {
    description: 'Historialservicio PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Historialservicio, {partial: true}),
        },
      },
    })
    historialservicio: Historialservicio,
  ): Promise<void> {
    await this.historialservicioRepository.updateById(id, historialservicio);
  }

  @put('/historialservicios/{id}')
  @response(204, {
    description: 'Historialservicio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() historialservicio: Historialservicio,
  ): Promise<void> {
    await this.historialservicioRepository.replaceById(id, historialservicio);
  }

  @del('/historialservicios/{id}')
  @response(204, {
    description: 'Historialservicio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.historialservicioRepository.deleteById(id);
  }
}
