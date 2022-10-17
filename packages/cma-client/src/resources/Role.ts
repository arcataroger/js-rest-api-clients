import BaseRole from '../generated/resources/Role';
import * as SimpleSchemaTypes from '../generated/SimpleSchemaTypes';

export type UpdateRoleDiff<T> = {
  add?: Omit<T, 'environment'>[];
  remove?: Omit<T, 'environment'>[];
};

export type RoleItemTypePermission =
  SimpleSchemaTypes.RoleAttributes['positive_item_type_permissions'][0];

export type RoleUploadPermission =
  SimpleSchemaTypes.RoleAttributes['positive_upload_permissions'][0];

type UpdateCurrentEnvironmentPermissionsChanges = {
  positive_item_type_permissions?: UpdateRoleDiff<RoleItemTypePermission>;
  negative_item_type_permissions?: UpdateRoleDiff<RoleItemTypePermission>;
  positive_upload_permissions?: UpdateRoleDiff<RoleUploadPermission>;
  negative_upload_permissions?: UpdateRoleDiff<RoleUploadPermission>;
};

function sameValue(a: unknown, b: unknown) {
  if ((a === undefined || a === null) && (b === undefined || b === null)) {
    return true;
  }
  return a === b;
}

function sameRule(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
): boolean {
  for (const key in Object.keys(obj1)) {
    if (!sameValue(obj1[key], obj2[key])) return false;
  }

  for (const key in Object.keys(obj2)) {
    if (!sameValue(obj1[key], obj2[key])) return false;
  }

  return true;
}

function applyChanges<T extends Record<PropertyKey, unknown>>(
  currentRules: T[],
  changes: UpdateRoleDiff<T> | undefined,
  currentEnvironmentId: string,
  context: string,
): T[] {
  if (!changes) {
    return currentRules;
  }

  const { add: rulesToAdd, remove: rulesToRemove } = changes;

  return [
    ...(rulesToRemove
      ? rulesToRemove.reduce((filteredRules, ruleToRemove) => {
          const ruleToRemoveWithEnvironmentId = {
            ...ruleToRemove,
            environment: currentEnvironmentId,
          };

          const foundRule = filteredRules.find((rule) =>
            sameRule(rule, ruleToRemoveWithEnvironmentId),
          );

          if (!foundRule) {
            throw new Error(
              `Cannot find rule ${JSON.stringify(
                ruleToRemoveWithEnvironmentId,
              )} to remove in ${context}!`,
            );
          }

          return filteredRules.filter((rule) => rule !== foundRule);
        }, currentRules)
      : currentRules),
    ...(rulesToAdd
      ? rulesToAdd.map(
          (change) =>
            ({
              environment: currentEnvironmentId,
              ...change,
            } as unknown as T),
        )
      : []),
  ];
}

export default class RoleResource extends BaseRole {
  /**
   * Applies a set of changes to the permissions of the current environment
   */
  async updateCurrentEnvironmentPermissions(
    roleId: string | SimpleSchemaTypes.RoleData,
    changes: UpdateCurrentEnvironmentPermissionsChanges,
  ): Promise<SimpleSchemaTypes.Role> {
    const currentEnvironmentId =
      this.client.config.environment ||
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (await this.client.environments.list()).find(
        (environment) => environment.meta.primary,
      )!.id;

    const role = await this.find(roleId);

    const updateItemTypePermissions = Boolean(
      changes.positive_item_type_permissions ||
        changes.negative_item_type_permissions,
    );

    const updateUploadPermissions = Boolean(
      changes.positive_upload_permissions ||
        changes.negative_upload_permissions,
    );

    const body: SimpleSchemaTypes.RoleUpdateSchema = {
      ...(updateItemTypePermissions
        ? {
            positive_item_type_permissions: applyChanges(
              role.positive_item_type_permissions,
              changes.positive_item_type_permissions,
              currentEnvironmentId,
              'positive_item_type_permissions',
            ),
            negative_item_type_permissions: applyChanges(
              role.negative_item_type_permissions,
              changes.negative_item_type_permissions,
              currentEnvironmentId,
              'negative_item_type_permissions',
            ),
          }
        : {}),
      ...(updateUploadPermissions
        ? {
            positive_upload_permissions: applyChanges(
              role.positive_upload_permissions,
              changes.positive_upload_permissions,
              currentEnvironmentId,
              'positive_upload_permissions',
            ),
            negative_upload_permissions: applyChanges(
              role.negative_upload_permissions,
              changes.negative_upload_permissions,
              currentEnvironmentId,
              'negative_upload_permissions',
            ),
          }
        : {}),
    };

    return this.update(roleId, body);
  }
}
