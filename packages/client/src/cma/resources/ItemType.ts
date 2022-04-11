import BaseResource from '../BaseResource';
import serializeRequestBody from '../../serializeRequestBody';
import deserializeResponseBody from '../../deserializeResponseBody';
import toId from '../../toId';
import * as SchemaTypes from '../SchemaTypes';
import * as SimpleSchemaTypes from '../SimpleSchemaTypes';

export default class ItemType extends BaseResource {
  static readonly TYPE: 'item_type' = 'item_type';

  /**
   * Create a new model
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/item-type/create
   */
  create(body: SimpleSchemaTypes.ItemTypeCreateSchema) {
    return this.rawCreate(
      serializeRequestBody<SchemaTypes.ItemTypeCreateSchema>({
        body,
        type: ItemType.TYPE,
      }),
    ).then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.ItemTypeCreateTargetSchema>(
        body,
      ),
    );
  }

  /**
   * Create a new model
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/item-type/create
   */
  rawCreate(
    body: SchemaTypes.ItemTypeCreateSchema,
  ): Promise<SchemaTypes.ItemTypeCreateTargetSchema> {
    return this.client.request<SchemaTypes.ItemTypeCreateTargetSchema>({
      method: 'POST',
      url: `/item-types`,
      body,
    });
  }

  /**
   * Update a model
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/item-type/update
   */
  update(
    itemTypeId: string | SimpleSchemaTypes.ItemTypeData,
    body: SimpleSchemaTypes.ItemTypeUpdateSchema,
  ) {
    return this.rawUpdate(
      toId(itemTypeId),
      serializeRequestBody<SchemaTypes.ItemTypeUpdateSchema>({
        body,
        id: toId(itemTypeId),
        type: ItemType.TYPE,
      }),
    ).then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.ItemTypeUpdateJobSchema>(body),
    );
  }

  /**
   * Update a model
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/item-type/update
   */
  rawUpdate(
    itemTypeId: string,
    body: SchemaTypes.ItemTypeUpdateSchema,
  ): Promise<SchemaTypes.ItemTypeUpdateJobSchema> {
    return this.client.request<SchemaTypes.ItemTypeUpdateJobSchema>({
      method: 'PUT',
      url: `/item-types/${itemTypeId}`,
      body,
    });
  }

  /**
   * List all models
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/item-type/instances
   */
  list() {
    return this.rawList().then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.ItemTypeInstancesTargetSchema>(
        body,
      ),
    );
  }

  /**
   * List all models
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/item-type/instances
   */
  rawList(): Promise<SchemaTypes.ItemTypeInstancesTargetSchema> {
    return this.client.request<SchemaTypes.ItemTypeInstancesTargetSchema>({
      method: 'GET',
      url: `/item-types`,
    });
  }

  /**
   * Retrieve a model
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/item-type/self
   */
  find(itemTypeId: string | SimpleSchemaTypes.ItemTypeData) {
    return this.rawFind(toId(itemTypeId)).then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.ItemTypeSelfTargetSchema>(body),
    );
  }

  /**
   * Retrieve a model
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/item-type/self
   */
  rawFind(itemTypeId: string): Promise<SchemaTypes.ItemTypeSelfTargetSchema> {
    return this.client.request<SchemaTypes.ItemTypeSelfTargetSchema>({
      method: 'GET',
      url: `/item-types/${itemTypeId}`,
    });
  }

  /**
   * Duplicate model
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/item-type/duplicate
   */
  duplicate(itemTypeId: string | SimpleSchemaTypes.ItemTypeData) {
    return this.rawDuplicate(toId(itemTypeId)).then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.ItemTypeDuplicateTargetSchema>(
        body,
      ),
    );
  }

  /**
   * Duplicate model
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/item-type/duplicate
   */
  rawDuplicate(
    itemTypeId: string,
  ): Promise<SchemaTypes.ItemTypeDuplicateTargetSchema> {
    return this.client.request<SchemaTypes.ItemTypeDuplicateTargetSchema>({
      method: 'POST',
      url: `/item-types/${itemTypeId}/duplicate`,
    });
  }

  /**
   * Delete a model
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/item-type/destroy
   */
  destroy(itemTypeId: string | SimpleSchemaTypes.ItemTypeData) {
    return this.rawDestroy(toId(itemTypeId)).then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.ItemTypeDestroyJobSchema>(body),
    );
  }

  /**
   * Delete a model
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/item-type/destroy
   */
  rawDestroy(
    itemTypeId: string,
  ): Promise<SchemaTypes.ItemTypeDestroyJobSchema> {
    return this.client.request<SchemaTypes.ItemTypeDestroyJobSchema>({
      method: 'DELETE',
      url: `/item-types/${itemTypeId}`,
    });
  }
}
