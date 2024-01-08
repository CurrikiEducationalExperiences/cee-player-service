const Router = require('../../routes/lti');

describe('route/accounts', () => {
  it('should have expected api for /grade route', async () => {
    const path = '/grade';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ post: true });
  });

  it('should have expected api for /members route', async () => {
    const path = '/members';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ get: true });
  });

  it('should have expected api for /deeplink route', async () => {
    const path = '/deeplink';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ post: true });
  });

  it('should have expected api for /info route', async () => {
    const path = '/info';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ get: true });
  });

  it('should have expected api for /resources route', async () => {
    const path = '/resources';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ get: true });
  });

  it('should have expected api for /stream route', async () => {
    const path = '/stream';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ get: true });
  });

  it('should have expected api for /xapi/statements route', async () => {
    const path = '/xapi/statements';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ put: true });
  });

  it('should have expected api for /platform/register route', async () => {
    const path = '/platform/register';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ post: true });
  });

  it('should have expected api for /canvas/config route', async () => {
    const path = '/canvas/config';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ get: true });
  });

  it('should have expected api for * route', async () => {
    const path = '*';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ get: true });
  });
});
