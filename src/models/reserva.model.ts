import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Servicio} from './servicio.model';
import {Recepcionista} from './recepcionista.model';

@model({
  settings: {
    foreignKeys: {
      fk_reserva_idCliente: {
        name: "fk_reserva_idCliente",
        entity: "Cliente",
        entityKey: "id",
        foreignKey: "clienteId"
      },
      fk_reserva_idLashista: {  
        name: "fk_reserva_idLashista",  
        entity: "Lashista",
        entityKey: "id",  
        foreignKey: "lashistaId"  
      },
      fk_reserva_idServicio: {  
        name: "fk_reserva_idServicio",  
        entity: "Servicio",
        entityKey: "id",  
        foreignKey: "servicioId"  
      },
      
      fk_reserva_idRecepcionista: {  
        name: "fk_reserva_idRecepcionista",  
        entity: "Recepcionista",
        entityKey: "id",  
        foreignKey: "reservarecepcionistaid"  
      },


    }
  }
})
export class Reserva extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  hora: string;

  @belongsTo(() => Cliente)
  clienteId: number;

  @property({
    type: 'number',
  })
  lashistaId?: number;

  @property({
    type: 'number',
  })
  servicioId?: number;

  @belongsTo(() => Servicio, {name: 'servicios'})
  servicioreservaid: number;

  @belongsTo(() => Recepcionista, {name: 'reservarecepcionita'})
  reservarecepcionistaid: number;

  @property({
    type: 'number',
  })
  historialservicioId?: number;

  constructor(data?: Partial<Reserva>) {
    super(data);
  }
}

export interface ReservaRelations {
  // describe navigational properties here
}

export type ReservaWithRelations = Reserva & ReservaRelations;
