import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Reserva} from './reserva.model';

@model({
  settings:{
    foreignKeys:{

      fk_historialServicio_idReserva:{
        name:"fk_historialServicio_idReserva",
        entity:"Reserva",
        entityKey:"id",
        foreignKey:"reservaId"


      }
    }
  }

})
export class Historialservicio extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @belongsTo(() => Reserva)
  reservaId: number;

  constructor(data?: Partial<Historialservicio>) {
    super(data);
  }
}

export interface HistorialservicioRelations {
  // describe navigational properties here
}

export type HistorialservicioWithRelations = Historialservicio & HistorialservicioRelations;
