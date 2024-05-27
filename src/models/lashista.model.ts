import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Reserva} from './reserva.model';

@model()
export class Lashista extends Entity {
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
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Especialidad: string;

  @property({
    type: 'string',
    required: true,
  })
  Horario: string;

  @hasMany(() => Reserva)
  reservas: Reserva[];

  @belongsTo(() => Reserva)
  reservaId: number;

  @belongsTo(() => Reserva, {name: 'reservlasid'})
  reservalashistaid: number;

  constructor(data?: Partial<Lashista>) {
    super(data);
  }
}

export interface LashistaRelations {
  // describe navigational properties here
}

export type LashistaWithRelations = Lashista & LashistaRelations;
