const Router = require('../../routes/licensee');

describe('route/licensee', () => {
  it('should have expected api for /addLicensee route', async () => {
    const path = '/addLicensee';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ post: true });
  });

  it('should have expected api for /getLicensees route', async () => {
    const path = '/getLicensees';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ get: true });
  });

  it('should have expected api for /updateLicensee route', async () => {
    const path = '/updateLicensee';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ patch: true });
  });

  it('should have expected api for /deleteLicensee route', async () => {
    const path = '/deleteLicensee';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ delete: true });
  });

});
