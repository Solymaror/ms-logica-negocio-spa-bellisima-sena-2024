import {Entity, model, property, hasMany} from '@loopback/repository';
import {Reserva} from './reserva.model';

@model()
export class Servicio extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombreServicio: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  duracion: number;
  @property({
    type: 'string',
    required: false,
  })
  foto: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @hasMany(() => Reserva)
  reservas: Reserva[];

  @property({
    type: 'number',
  })
  recepcionistaId?: number;

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;
