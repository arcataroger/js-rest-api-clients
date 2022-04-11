import BaseResource from '../BaseResource';
import serializeRequestBody from '../../serializeRequestBody';
import deserializeResponseBody from '../../deserializeResponseBody';
import toId from '../../toId';
import * as SchemaTypes from '../SchemaTypes';
import * as SimpleSchemaTypes from '../SimpleSchemaTypes';

export default class PerSitePricingBillingProfile extends BaseResource {
  static readonly TYPE: 'per_site_pricing_billing_profile' =
    'per_site_pricing_billing_profile';

  /**
   * Retrieve all account's billing profiles
   */
  list() {
    return this.rawList().then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.PerSitePricingBillingProfileInstancesTargetSchema>(
        body,
      ),
    );
  }

  /**
   * Retrieve all account's billing profiles
   */
  rawList(): Promise<SchemaTypes.PerSitePricingBillingProfileInstancesTargetSchema> {
    return this.client.request<SchemaTypes.PerSitePricingBillingProfileInstancesTargetSchema>(
      {
        method: 'GET',
        url: `/per-site-pricing-billing-profiles`,
      },
    );
  }

  /**
   * Retrieve a billing profile
   */
  find(
    perSitePricingBillingProfileId:
      | string
      | SimpleSchemaTypes.PerSitePricingBillingProfileData,
  ) {
    return this.rawFind(toId(perSitePricingBillingProfileId)).then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.PerSitePricingBillingProfileSelfTargetSchema>(
        body,
      ),
    );
  }

  /**
   * Retrieve a billing profile
   */
  rawFind(
    perSitePricingBillingProfileId: string,
  ): Promise<SchemaTypes.PerSitePricingBillingProfileSelfTargetSchema> {
    return this.client.request<SchemaTypes.PerSitePricingBillingProfileSelfTargetSchema>(
      {
        method: 'GET',
        url: `/per-site-pricing-billing-profiles/${perSitePricingBillingProfileId}`,
      },
    );
  }

  /**
   * Update a billing profile's credit card
   */
  updateCreditCard(
    perSitePricingBillingProfileId:
      | string
      | SimpleSchemaTypes.PerSitePricingBillingProfileData,
    body: SimpleSchemaTypes.PerSitePricingBillingProfileUpdateCreditCardSchema,
  ) {
    return this.rawUpdateCreditCard(
      toId(perSitePricingBillingProfileId),
      serializeRequestBody<SchemaTypes.PerSitePricingBillingProfileUpdateCreditCardSchema>(
        {
          body,
          id: toId(perSitePricingBillingProfileId),
          type: PerSitePricingBillingProfile.TYPE,
        },
      ),
    ).then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.PerSitePricingBillingProfileUpdateCreditCardTargetSchema>(
        body,
      ),
    );
  }

  /**
   * Update a billing profile's credit card
   */
  rawUpdateCreditCard(
    perSitePricingBillingProfileId: string,
    body: SchemaTypes.PerSitePricingBillingProfileUpdateCreditCardSchema,
  ): Promise<SchemaTypes.PerSitePricingBillingProfileUpdateCreditCardTargetSchema> {
    return this.client.request<SchemaTypes.PerSitePricingBillingProfileUpdateCreditCardTargetSchema>(
      {
        method: 'PUT',
        url: `/per-site-pricing-billing-profiles/${perSitePricingBillingProfileId}/credit-card`,
        body,
      },
    );
  }

  /**
   * Update a billing profile's billing information
   */
  updateInfo(
    perSitePricingBillingProfileId:
      | string
      | SimpleSchemaTypes.PerSitePricingBillingProfileData,
    body: SimpleSchemaTypes.PerSitePricingBillingProfileUpdateInfoSchema,
  ) {
    return this.rawUpdateInfo(
      toId(perSitePricingBillingProfileId),
      serializeRequestBody<SchemaTypes.PerSitePricingBillingProfileUpdateInfoSchema>(
        {
          body,
          id: toId(perSitePricingBillingProfileId),
          type: PerSitePricingBillingProfile.TYPE,
        },
      ),
    ).then((body) =>
      deserializeResponseBody<SimpleSchemaTypes.PerSitePricingBillingProfileUpdateInfoTargetSchema>(
        body,
      ),
    );
  }

  /**
   * Update a billing profile's billing information
   */
  rawUpdateInfo(
    perSitePricingBillingProfileId: string,
    body: SchemaTypes.PerSitePricingBillingProfileUpdateInfoSchema,
  ): Promise<SchemaTypes.PerSitePricingBillingProfileUpdateInfoTargetSchema> {
    return this.client.request<SchemaTypes.PerSitePricingBillingProfileUpdateInfoTargetSchema>(
      {
        method: 'PUT',
        url: `/per-site-pricing-billing-profiles/${perSitePricingBillingProfileId}/info`,
        body,
      },
    );
  }
}
