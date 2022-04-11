import BaseResource from '../BaseResource';
import serializeRequestBody from '../../serializeRequestBody';
import deserializeResponseBody from '../../deserializeResponseBody';
import toId from '../../toId';
import * as SchemaTypes from '../SchemaTypes';
import * as SimpleSchemaTypes from '../SimpleSchemaTypes';

export default class SubscriptionLimit extends BaseResource {
  static readonly TYPE: 'subscription_limit' = 'subscription_limit';

  /**
   * Get all the subscription limits
   */
  list(siteId: string | SimpleSchemaTypes.SubscriptionLimitData) {
    return this.rawList(toId(siteId)).then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.SubscriptionLimitInstancesTargetSchema>(
        body,
      ),
    );
  }

  /**
   * Get all the subscription limits
   */
  rawList(
    siteId: string,
  ): Promise<SchemaTypes.SubscriptionLimitInstancesTargetSchema> {
    return this.client.request<SchemaTypes.SubscriptionLimitInstancesTargetSchema>(
      {
        method: 'GET',
        url: `/sites/${siteId}/subscription-limits`,
      },
    );
  }
}
