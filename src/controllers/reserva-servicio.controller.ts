import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Reserva,
  Servicio,
} from '../models';
import {ReservaRepository} from '../repositories';

export class ReservaServicioController {
  constructor(
    @repository(ReservaRepository)
    public reservaRepository: ReservaRepository,
  ) { }

  @get('/reservas/{id}/servicio', {
    responses: {
      '200': {
        description: 'Servicio belonging to Reserva',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Servicio),
          },
        },
      },
    },
  })
  async getServicio(
    @param.path.number('id') id: typeof Reserva.prototype.id,
  ): Promise<Servicio> {
    return this.reservaRepository.servicios(id);
  }
}
