import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Lashista,
  Reserva,
} from '../models';
import {LashistaRepository} from '../repositories';

export class LashistaReservaController {
  constructor(
    @repository(LashistaRepository)
    public lashistaRepository: LashistaRepository,
  ) { }

  @get('/lashistas/{id}/reserva', {
    responses: {
      '200': {
        description: 'Reserva belonging to Lashista',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Reserva),
          },
        },
      },
    },
  })
  async getReserva(
    @param.path.number('id') id: typeof Lashista.prototype.id,
  ): Promise<Reserva> {
    return this.lashistaRepository.reservlasid(id);
  }
}
