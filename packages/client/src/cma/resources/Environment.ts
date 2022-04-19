import BaseResource from '../BaseResource';
import { serializeRequestBody } from '../../serialize';
import {
  deserializeResponseBody,
  deserializeJsonEntity,
} from '../../deserialize';
import toId from '../../toId';
import * as SchemaTypes from '../SchemaTypes';
import * as SimpleSchemaTypes from '../SimpleSchemaTypes';
import { IteratorOptions, rawPageIterator } from '../../rawPageIterator';

export default class Environment extends BaseResource {
  static readonly TYPE: 'environment' = 'environment';

  /**
   * Fork an existing environment
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/environment/fork
   */
  fork(
    environmentId: string | SimpleSchemaTypes.EnvironmentData,
    body: SimpleSchemaTypes.EnvironmentForkSchema,
  ) {
    return this.rawFork(
      toId(environmentId),
      serializeRequestBody<SchemaTypes.EnvironmentForkSchema>({
        body,
        id: toId(environmentId),
        type: Environment.TYPE,
      }),
    ).then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.EnvironmentForkJobSchema>(body),
    );
  }

  /**
   * Fork an existing environment
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/environment/fork
   */
  rawFork(
    environmentId: string,
    body: SchemaTypes.EnvironmentForkSchema,
  ): Promise<SchemaTypes.EnvironmentForkJobSchema> {
    return this.client.request<SchemaTypes.EnvironmentForkJobSchema>({
      method: 'POST',
      url: `/environments/${environmentId}/fork`,
      body,
    });
  }

  /**
   * Promote an environment to primary
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/environment/promote
   */
  promote(environmentId: string | SimpleSchemaTypes.EnvironmentData) {
    return this.rawPromote(toId(environmentId)).then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.EnvironmentPromoteTargetSchema>(
        body,
      ),
    );
  }

  /**
   * Promote an environment to primary
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/environment/promote
   */
  rawPromote(
    environmentId: string,
  ): Promise<SchemaTypes.EnvironmentPromoteTargetSchema> {
    return this.client.request<SchemaTypes.EnvironmentPromoteTargetSchema>({
      method: 'PUT',
      url: `/environments/${environmentId}/promote`,
    });
  }

  /**
   * List all environments
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/environment/instances
   */
  list() {
    return this.rawList().then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.EnvironmentInstancesTargetSchema>(
        body,
      ),
    );
  }

  /**
   * List all environments
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/environment/instances
   */
  rawList(): Promise<SchemaTypes.EnvironmentInstancesTargetSchema> {
    return this.client.request<SchemaTypes.EnvironmentInstancesTargetSchema>({
      method: 'GET',
      url: `/environments`,
    });
  }

  /**
   * Retrieve a environment
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/environment/self
   */
  find(environmentId: string | SimpleSchemaTypes.EnvironmentData) {
    return this.rawFind(toId(environmentId)).then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.EnvironmentSelfTargetSchema>(
        body,
      ),
    );
  }

  /**
   * Retrieve a environment
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/environment/self
   */
  rawFind(
    environmentId: string,
  ): Promise<SchemaTypes.EnvironmentSelfTargetSchema> {
    return this.client.request<SchemaTypes.EnvironmentSelfTargetSchema>({
      method: 'GET',
      url: `/environments/${environmentId}`,
    });
  }

  /**
   * Delete a environment
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/environment/destroy
   */
  destroy(environmentId: string | SimpleSchemaTypes.EnvironmentData) {
    return this.rawDestroy(toId(environmentId)).then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.EnvironmentDestroyJobSchema>(
        body,
      ),
    );
  }

  /**
   * Delete a environment
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/environment/destroy
   */
  rawDestroy(
    environmentId: string,
  ): Promise<SchemaTypes.EnvironmentDestroyJobSchema> {
    return this.client.request<SchemaTypes.EnvironmentDestroyJobSchema>({
      method: 'DELETE',
      url: `/environments/${environmentId}`,
    });
  }
}
