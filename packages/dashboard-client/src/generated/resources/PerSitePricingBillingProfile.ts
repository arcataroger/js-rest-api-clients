import * as Utils from '@datocms/rest-client-utils';
import * as SchemaTypes from '../SchemaTypes';
import * as SimpleSchemaTypes from '../SimpleSchemaTypes';
import BaseResource from '../../BaseResource';

export default class PerSitePricingBillingProfile extends BaseResource {
  static readonly TYPE: 'per_site_pricing_billing_profile' =
    'per_site_pricing_billing_profile';

  /**
   * Retrieve all account's billing profiles
   *
   * @throws {ApiError}
   * @throws {TimeoutError}
   */
  list() {
    return this.rawList().then((body) =>
      Utils.deserializeResponseBody<SimpleSchemaTypes.PerSitePricingBillingProfileInstancesTargetSchema>(
        body,
      ),
    );
  }

  /**
   * Retrieve all account's billing profiles
   *
   * @throws {ApiError}
   * @throws {TimeoutError}
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
   *
   * @throws {ApiError}
   * @throws {TimeoutError}
   */
  find(
    perSitePricingBillingProfileId:
      | string
      | SimpleSchemaTypes.PerSitePricingBillingProfileData,
  ) {
    return this.rawFind(Utils.toId(perSitePricingBillingProfileId)).then(
      (body) =>
        Utils.deserializeResponseBody<SimpleSchemaTypes.PerSitePricingBillingProfileSelfTargetSchema>(
          body,
        ),
    );
  }

  /**
   * Retrieve a billing profile
   *
   * @throws {ApiError}
   * @throws {TimeoutError}
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
   *
   * @throws {ApiError}
   * @throws {TimeoutError}
   */
  updateCreditCard(
    perSitePricingBillingProfileId:
      | string
      | SimpleSchemaTypes.PerSitePricingBillingProfileData,
    body: SimpleSchemaTypes.PerSitePricingBillingProfileUpdateCreditCardSchema,
  ) {
    return this.rawUpdateCreditCard(
      Utils.toId(perSitePricingBillingProfileId),
      Utils.serializeRequestBody<SchemaTypes.PerSitePricingBillingProfileUpdateCreditCardSchema>(
        body,
        {
          id: Utils.toId(perSitePricingBillingProfileId),
          type: 'card',
          attributes: ['payment_intent_id'],
          relationships: [],
        },
      ),
    ).then((body) =>
      Utils.deserializeResponseBody<SimpleSchemaTypes.PerSitePricingBillingProfileUpdateCreditCardTargetSchema>(
        body,
      ),
    );
  }

  /**
   * Update a billing profile's credit card
   *
   * @throws {ApiError}
   * @throws {TimeoutError}
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
   *
   * @throws {ApiError}
   * @throws {TimeoutError}
   */
  updateInfo(
    perSitePricingBillingProfileId:
      | string
      | SimpleSchemaTypes.PerSitePricingBillingProfileData,
    body: SimpleSchemaTypes.PerSitePricingBillingProfileUpdateInfoSchema,
  ) {
    return this.rawUpdateInfo(
      Utils.toId(perSitePricingBillingProfileId),
      Utils.serializeRequestBody<SchemaTypes.PerSitePricingBillingProfileUpdateInfoSchema>(
        body,
        {
          id: Utils.toId(perSitePricingBillingProfileId),
          type: 'per_site_pricing_billing_profile',
          attributes: [
            'first_name',
            'last_name',
            'company',
            'address_line',
            'city',
            'email',
            'country',
            'state',
            'zip',
            'vat_number',
            'cf_cod_fiscale',
          ],
          relationships: [],
        },
      ),
    ).then((body) =>
      Utils.deserializeResponseBody<SimpleSchemaTypes.PerSitePricingBillingProfileUpdateInfoTargetSchema>(
        body,
      ),
    );
  }

  /**
   * Update a billing profile's billing information
   *
   * @throws {ApiError}
   * @throws {TimeoutError}
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
