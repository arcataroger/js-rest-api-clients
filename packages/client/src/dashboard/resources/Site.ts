import BaseResource from '../BaseResource';
import serializeRequestBody from '../../serializeRequestBody';
import deserializeResponseBody from '../../deserializeResponseBody';
import toId from '../../toId';
import * as SchemaTypes from '../SchemaTypes';
import * as SimpleSchemaTypes from '../SimpleSchemaTypes';

export default class Site extends BaseResource {
  static readonly TYPE: 'site' = 'site';

  /**
   * Retrieve a project
   */
  find(siteId: string | SimpleSchemaTypes.SiteData) {
    return this.rawFind(toId(siteId)).then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.SiteSelfTargetSchema>(body),
    );
  }

  /**
   * Retrieve a project
   */
  rawFind(siteId: string): Promise<SchemaTypes.SiteSelfTargetSchema> {
    return this.client.request<SchemaTypes.SiteSelfTargetSchema>({
      method: 'GET',
      url: `/sites/${siteId}`,
    });
  }

  /**
   * List all projects
   */
  list() {
    return this.rawList().then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.SiteInstancesTargetSchema>(
        body,
      ),
    );
  }

  /**
   * List all projects
   */
  rawList(): Promise<SchemaTypes.SiteInstancesTargetSchema> {
    return this.client.request<SchemaTypes.SiteInstancesTargetSchema>({
      method: 'GET',
      url: `/sites`,
    });
  }

  /**
   * Create a new project
   */
  create(body: SimpleSchemaTypes.SiteCreateSchema) {
    return this.rawCreate(
      serializeRequestBody<SchemaTypes.SiteCreateSchema>({
        body,
        type: Site.TYPE,
      }),
    ).then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.SiteCreateJobSchema>(body),
    );
  }

  /**
   * Create a new project
   */
  rawCreate(
    body: SchemaTypes.SiteCreateSchema,
  ): Promise<SchemaTypes.SiteCreateJobSchema> {
    return this.client.request<SchemaTypes.SiteCreateJobSchema>({
      method: 'POST',
      url: `/sites`,
      body,
    });
  }

  /**
   * Update project
   */
  update(
    siteId: string | SimpleSchemaTypes.SiteData,
    body: SimpleSchemaTypes.SiteUpdateSchema,
  ) {
    return this.rawUpdate(
      toId(siteId),
      serializeRequestBody<SchemaTypes.SiteUpdateSchema>({
        body,
        id: toId(siteId),
        type: Site.TYPE,
      }),
    ).then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.SiteUpdateTargetSchema>(body),
    );
  }

  /**
   * Update project
   */
  rawUpdate(
    siteId: string,
    body: SchemaTypes.SiteUpdateSchema,
  ): Promise<SchemaTypes.SiteUpdateTargetSchema> {
    return this.client.request<SchemaTypes.SiteUpdateTargetSchema>({
      method: 'PUT',
      url: `/sites/${siteId}`,
      body,
    });
  }

  /**
   * Delete a project
   */
  destroy(siteId: string | SimpleSchemaTypes.SiteData) {
    return this.rawDestroy(toId(siteId)).then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.SiteDestroyJobSchema>(body),
    );
  }

  /**
   * Delete a project
   */
  rawDestroy(siteId: string): Promise<SchemaTypes.SiteDestroyJobSchema> {
    return this.client.request<SchemaTypes.SiteDestroyJobSchema>({
      method: 'DELETE',
      url: `/sites/${siteId}`,
    });
  }

  /**
   * Duplicate an existing project
   */
  duplicate(
    siteId: string | SimpleSchemaTypes.SiteData,
    body: SimpleSchemaTypes.SiteDuplicateSchema,
  ) {
    return this.rawDuplicate(
      toId(siteId),
      serializeRequestBody<SchemaTypes.SiteDuplicateSchema>({
        body,
        id: toId(siteId),
        type: Site.TYPE,
      }),
    ).then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.SiteDuplicateJobSchema>(body),
    );
  }

  /**
   * Duplicate an existing project
   */
  rawDuplicate(
    siteId: string,
    body: SchemaTypes.SiteDuplicateSchema,
  ): Promise<SchemaTypes.SiteDuplicateJobSchema> {
    return this.client.request<SchemaTypes.SiteDuplicateJobSchema>({
      method: 'POST',
      url: `/sites/${siteId}/duplicate`,
      body,
    });
  }
}
