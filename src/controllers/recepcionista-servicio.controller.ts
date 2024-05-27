import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Recepcionista,
  Servicio,
} from '../models';
import {RecepcionistaRepository} from '../repositories';

export class RecepcionistaServicioController {
  constructor(
    @repository(RecepcionistaRepository) protected recepcionistaRepository: RecepcionistaRepository,
  ) { }

  @get('/recepcionistas/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of Recepcionista has many Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Servicio>,
  ): Promise<Servicio[]> {
    return this.recepcionistaRepository.servicios(id).find(filter);
  }

  @post('/recepcionistas/{id}/servicios', {
    responses: {
      '200': {
        description: 'Recepcionista model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Recepcionista.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInRecepcionista',
            exclude: ['id'],
            optional: ['recepcionistaId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'id'>,
  ): Promise<Servicio> {
    return this.recepcionistaRepository.servicios(id).create(servicio);
  }

  @patch('/recepcionistas/{id}/servicios', {
    responses: {
      '200': {
        description: 'Recepcionista.Servicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Partial<Servicio>,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.recepcionistaRepository.servicios(id).patch(servicio, where);
  }

  @del('/recepcionistas/{id}/servicios', {
    responses: {
      '200': {
        description: 'Recepcionista.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.recepcionistaRepository.servicios(id).delete(where);
  }
}
