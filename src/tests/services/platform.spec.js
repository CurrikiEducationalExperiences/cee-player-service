const lti = require("ltijs").Provider;
const { PlatformService } = require("../../services/platform");
const { Platforms } = require("../../../models/platforms");
const { PublicKeys } = require("../../../models/publicKeys");
const { PrivateKeys } = require("../../../models/privateKeys");

jest.mock("../../../models/platforms", () => ({
  Platforms: {
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
  },
}));

jest.mock("../../../models/publicKeys", () => ({
  PublicKeys: {
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
  },
}));

jest.mock("../../../models/privateKeys", () => ({
  PrivateKeys: {
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
  },
}));

jest.mock("ltijs", () => {
  return {
    Provider: {
      registerPlatform: jest.fn(),
      deletePlatformById: jest.fn(),
    },
  };
});

describe("service/platforms", () => {
  beforeEach(() => {
    Platforms.create.mockReset();
    Platforms.update.mockReset();
    Platforms.destroy.mockReset();
    Platforms.findOne.mockReset();
    Platforms.findAll.mockReset();
    PublicKeys.create.mockReset();
    PublicKeys.update.mockReset();
    PublicKeys.destroy.mockReset();
    PublicKeys.findOne.mockReset();
    PublicKeys.findAll.mockReset();
    PrivateKeys.create.mockReset();
    PrivateKeys.update.mockReset();
    PrivateKeys.destroy.mockReset();
    PrivateKeys.findOne.mockReset();
    PrivateKeys.findAll.mockReset();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("registerPlatform()", () => {
    let body = {
      url: "xxxxxxxxxxxxxxx",
      name: "xxxxxxxxxxxxxxx",
      clientId: "xxxxxxxxxxxxxxx",
      authenticationEndpoint: "xxxxxxxxxxxxxxx",
      accesstokenEndpoint: "xxxxxxxxxxxxxxx",
      authConfigMethod: "xxxxxxxxxxxxxxx",
      authConfigKey: "xxxxxxxxxxxxxxx",
      secret: "xxxxxxxxxxxxxxx",
    };

    it(`should register a platform`, async () => {
      jest.spyOn(lti, "registerPlatform").mockResolvedValueOnce(true);
      const response = await PlatformService.registerPlatform(body);
      expect(response).toBeDefined();
      expect(response).toBe(true);
    });
  });

  describe("getPLlatforms()", () => {
    it(`should get all registered platforms`, async () => {
      Platforms.findAll.mockResolvedValueOnce([{clientId: 1, createdAt: "time", updatedAt: "time"}]);
      PublicKeys.findOne.mockResolvedValue({id: 1});
      PrivateKeys.findOne.mockResolvedValue({id: 1});
      const response = await PlatformService.getPlatforms();
      expect(response).toBeDefined();
      expect(response).toEqual([{clientId: 1, publicKeys: {id: 1}, privateKeys: {id: 1}, createdAt: "time", updatedAt: "time"}]);
    });
  });

  describe("deletePlatform()", () => {
    let body = {
      id: "abcd"
    };

    it(`should delete a platform`, async () => {
      jest.spyOn(lti, "deletePlatformById").mockResolvedValueOnce(true);
      const response = await PlatformService.deletePlatform(body);
      expect(response).toBeDefined();
      expect(response).toBe(true);
    });
  });

});
