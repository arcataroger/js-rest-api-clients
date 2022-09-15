import * as Utils from '@datocms/rest-client-utils';
import * as SchemaTypes from '../SchemaTypes';
import * as SimpleSchemaTypes from '../SimpleSchemaTypes';
import BaseResource from '../../BaseResource';

export default class PerAccountPricingBillingProfile extends BaseResource {
  static readonly TYPE: 'per_account_pricing_billing_profile' =
    'per_account_pricing_billing_profile';

  /**
   * Retrieve a billing profile
   *
   * @throws {ApiError}
   * @throws {TimeoutError}
   */
  find() {
    return this.rawFind().then((body) =>
      Utils.deserializeResponseBody<SimpleSchemaTypes.PerAccountPricingBillingProfileSelfTargetSchema>(
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
  rawFind(): Promise<SchemaTypes.PerAccountPricingBillingProfileSelfTargetSchema> {
    return this.client.request<SchemaTypes.PerAccountPricingBillingProfileSelfTargetSchema>(
      {
        method: 'GET',
        url: `/per-account-pricing-billing-profile`,
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
    body: SimpleSchemaTypes.PerAccountPricingBillingProfileUpdateCreditCardSchema,
  ) {
    return this.rawUpdateCreditCard(
      Utils.serializeRequestBody<SchemaTypes.PerAccountPricingBillingProfileUpdateCreditCardSchema>(
        body,
        {
          type: 'card',
          attributes: ['payment_intent_id'],
          relationships: [],
        },
      ),
    ).then((body) =>
      Utils.deserializeResponseBody<SimpleSchemaTypes.PerAccountPricingBillingProfileUpdateCreditCardTargetSchema>(
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
    body: SchemaTypes.PerAccountPricingBillingProfileUpdateCreditCardSchema,
  ): Promise<SchemaTypes.PerAccountPricingBillingProfileUpdateCreditCardTargetSchema> {
    return this.client.request<SchemaTypes.PerAccountPricingBillingProfileUpdateCreditCardTargetSchema>(
      {
        method: 'PUT',
        url: `/per-account-pricing-billing-profile/credit-card`,
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
    body: SimpleSchemaTypes.PerAccountPricingBillingProfileUpdateInfoSchema,
  ) {
    return this.rawUpdateInfo(
      Utils.serializeRequestBody<SchemaTypes.PerAccountPricingBillingProfileUpdateInfoSchema>(
        body,
        {
          type: 'per_account_pricing_billing_profile',
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
            'po_number',
          ],
          relationships: [],
        },
      ),
    ).then((body) =>
      Utils.deserializeResponseBody<SimpleSchemaTypes.PerAccountPricingBillingProfileUpdateInfoTargetSchema>(
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
    body: SchemaTypes.PerAccountPricingBillingProfileUpdateInfoSchema,
  ): Promise<SchemaTypes.PerAccountPricingBillingProfileUpdateInfoTargetSchema> {
    return this.client.request<SchemaTypes.PerAccountPricingBillingProfileUpdateInfoTargetSchema>(
      {
        method: 'PUT',
        url: `/per-account-pricing-billing-profile/info`,
        body,
      },
    );
  }
}
