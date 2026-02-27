import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { RequestContextService } from '../../request-context/request-context.service';

@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Object;
  }
  /**
   * Avant creation → remplir `createdBy` si présent
   */
  beforeInsert(event: InsertEvent<any>): Promise<any> | void {
    const userId = RequestContextService.getUserId();
    if (userId && event.metadata.findColumnWithPropertyName('createdById')) {
      event.entity.createdBy = { id: userId };
    }
  }
  /**
   * Avant update → remplir `updatedBy` si présent
   */
  beforeUpdate(event: UpdateEvent<any>) {
    const userId = RequestContextService.getUserId();
    if (userId && event.metadata.findColumnWithPropertyName('updatedById')) {
      event.entity.updatedBy = { id: userId };
    }
  }

  /**
   * Avant suppression → remplir `deletedBy` si présent
   */
  beforeSoftRemove(event: SoftRemoveEvent<any>): Promise<any> | void {
    const userId = RequestContextService.getUserId();
    if (userId && event.metadata.findColumnWithPropertyName('deletedById')) {
      event.entity.deletedBy = { id: userId };
    }
  }
}
