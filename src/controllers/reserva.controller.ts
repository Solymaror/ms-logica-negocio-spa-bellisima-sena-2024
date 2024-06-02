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
import {Reserva} from '../models';
import {ReservaRepository} from '../repositories';
import { ConfiguracionSeguridad } from '../config/configuracion.seguridad';
import { authenticate } from '@loopback/authentication';

export class ReservaController {
  constructor(
    @repository(ReservaRepository)
    public reservaRepository : ReservaRepository,
  ) {}

  @post('/reserva')
  @response(200, {
    description: 'Reserva model instance',
    content: {'application/json': {schema: getModelSchemaRef(Reserva)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {
            title: 'NewReserva',
            exclude: ['id'],
          }),
        },
      },
    })
    reserva: Omit<Reserva, 'id'>,
  ): Promise<Reserva> {
    return this.reservaRepository.create(reserva);
  }

  @get('/reserva/count')
  @response(200, {
    description: 'Reserva model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Reserva) where?: Where<Reserva>,
  ): Promise<Count> {
    return this.reservaRepository.count(where);
  }

  @authenticate({
    strategy:"auth",
    options:[ConfiguracionSeguridad.menuReservaId,ConfiguracionSeguridad.listarAccion]
  
  })
  @get('/reserva')
  @response(200, {
    description: 'Array of Reserva model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Reserva, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Reserva) filter?: Filter<Reserva>,
  ): Promise<Reserva[]> {
    return this.reservaRepository.find(filter);
  }

  @patch('/reserva')
  @response(200, {
    description: 'Reserva PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {partial: true}),
        },
      },
    })
    reserva: Reserva,
    @param.where(Reserva) where?: Where<Reserva>,
  ): Promise<Count> {
    return this.reservaRepository.updateAll(reserva, where);
  }

  @get('/reserva/{id}')
  @response(200, {
    description: 'Reserva model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Reserva, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Reserva, {exclude: 'where'}) filter?: FilterExcludingWhere<Reserva>
  ): Promise<Reserva> {
    return this.reservaRepository.findById(id, filter);
  }

  @patch('/reserva/{id}')
  @response(204, {
    description: 'Reserva PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {partial: true}),
        },
      },
    })
    reserva: Reserva,
  ): Promise<void> {
    await this.reservaRepository.updateById(id, reserva);
  }

  @put('/reserva/{id}')
  @response(204, {
    description: 'Reserva PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() reserva: Reserva,
  ): Promise<void> {
    await this.reservaRepository.replaceById(id, reserva);
  }

  @del('/reserva/{id}')
  @response(204, {
    description: 'Reserva DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.reservaRepository.deleteById(id);
  }
}
