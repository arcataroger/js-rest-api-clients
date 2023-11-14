import { generateNewCmaClient } from '../../../jest-helpers/generateNewCmaClient';

describe('Maintenance mode', () => {
  it.concurrent('activate, deactivate', async () => {
    const client = await generateNewCmaClient();

    const activatedMode = await client.maintenanceMode.activate({
      force: true,
    });
    expect(activatedMode.active).toEqual(true);

    const deactivatedMode = await client.maintenanceMode.deactivate();
    expect(deactivatedMode.active).toEqual(false);

    const currentMode = await client.maintenanceMode.find();
    expect(currentMode.active).toEqual(false);
  });
});
