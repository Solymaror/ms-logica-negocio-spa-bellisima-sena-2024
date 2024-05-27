import {Entity, model, property, hasMany} from '@loopback/repository';
import {Servicio} from './servicio.model';

@model()
export class Recepcionista extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  turno: string;

  @hasMany(() => Servicio)
  servicios: Servicio[];

  constructor(data?: Partial<Recepcionista>) {
    super(data);
  }
}

export interface RecepcionistaRelations {
  // describe navigational properties here
}

export type RecepcionistaWithRelations = Recepcionista & RecepcionistaRelations;
