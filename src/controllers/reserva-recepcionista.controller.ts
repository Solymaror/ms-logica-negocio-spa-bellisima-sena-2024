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
  Recepcionista,
} from '../models';
import {ReservaRepository} from '../repositories';

export class ReservaRecepcionistaController {
  constructor(
    @repository(ReservaRepository)
    public reservaRepository: ReservaRepository,
  ) { }

  @get('/reservas/{id}/recepcionista', {
    responses: {
      '200': {
        description: 'Recepcionista belonging to Reserva',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Recepcionista),
          },
        },
      },
    },
  })
  async getRecepcionista(
    @param.path.number('id') id: typeof Reserva.prototype.id,
  ): Promise<Recepcionista> {
    return this.reservaRepository.reservarecepcionita(id);
  }
}
