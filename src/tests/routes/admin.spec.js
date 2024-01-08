const Router = require('../../routes/admin');

describe('route/admin', () => {
  it('should have expected api for /register route', async () => {
    const path = '/register';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ post: true });
  });

  it('should have expected api for /login route', async () => {
    const path = '/login';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ post: true });
  });

  it('should have expected api for /getProfile route', async () => {
    const path = '/getProfile';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ get: true });
  });

  it('should have expected api for /verifyResetPasswordToken route', async () => {
    const path = '/verifyResetPasswordToken';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ get: true });
  });

  it('should have expected api for /updatePassword route', async () => {
    const path = '/updatePassword';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ patch: true });
  });

  it('should have expected api for /forgetPassword route', async () => {
    const path = '/forgetPassword';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ post: true });
  });

  it('should have expected api for /resetPassword route', async () => {
    const path = '/resetPassword';
    const result = await Router.stack.find((s) => s.route.path === path);
    expect(result).not.toBeUndefined();
    expect(result.route.path).toEqual(path);
    expect(result.route.methods).toEqual({ post: true });
  });
});
