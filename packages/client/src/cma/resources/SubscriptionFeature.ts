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

export default class SubscriptionFeature extends BaseResource {
  static readonly TYPE: 'subscription_feature' = 'subscription_feature';

  /**
   * Get all the subscription features
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/subscription-feature/instances
   */
  list() {
    return this.rawList().then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.SubscriptionFeatureInstancesTargetSchema>(
        body,
      ),
    );
  }

  /**
   * Get all the subscription features
   *
   * Read more: https://www.datocms.com/docs/content-management-api/resources/subscription-feature/instances
   */
  rawList(): Promise<SchemaTypes.SubscriptionFeatureInstancesTargetSchema> {
    return this.client.request<SchemaTypes.SubscriptionFeatureInstancesTargetSchema>(
      {
        method: 'GET',
        url: `/subscription-features`,
      },
    );
  }
}
