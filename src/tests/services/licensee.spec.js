const { LicenseeService } = require("../../services/licensee");
const { Platforms } = require("../../../models/platforms");
const { PlatformSettings } = require("../../../models/platformSettings");

jest.mock("../../../models/platforms", () => ({
  Platforms: {
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
  },
}));

jest.mock("../../../models/platformSettings", () => ({
  PlatformSettings: {
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
  },
}));

describe("service/platforms", () => {
  beforeEach(() => {
    Platforms.create.mockReset();
    Platforms.update.mockReset();
    Platforms.destroy.mockReset();
    Platforms.findOne.mockReset();
    Platforms.findAll.mockReset();
    PlatformSettings.create.mockReset();
    PlatformSettings.update.mockReset();
    PlatformSettings.destroy.mockReset();
    PlatformSettings.findOne.mockReset();
    PlatformSettings.findAll.mockReset();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("registerPlatform()", () => {
    let body = {
      "lti_client_id": "10003",
      "cee_licensee_id": "license",
      "cee_secret_key": "secret",
      "cee_provider_url": "https://test3.com"
    };

    it(`should add a licensee`, async () => {
      PlatformSettings.create.mockResolvedValueOnce(true);
      const response = await LicenseeService.addLicensee(body);
      expect(response).toBeDefined();
      expect(response).toBe(true);
    });
  });

  describe("getLicensees()", () => {
    it(`should get all licensee data`, async () => {
      PlatformSettings.findAll.mockResolvedValueOnce([{lti_client_id: 1, createdAt: "time", updatedAt: "time"}]);
      Platforms.findOne.mockResolvedValueOnce({platformName: "abc"});
      const response = await LicenseeService.getLicensees();
      expect(response).toBeDefined();
      expect(response).toEqual([{lti_client_id: 1, platformName: "abc", createdAt: "time", updatedAt: "time"}]);
    });
  });

  describe("updateLicensee()", () => {
    let body = {
      licenseId: 1,
      "lti_client_id": "10003",
      "cee_licensee_id": "license",
      "cee_secret_key": "secret",
      "cee_provider_url": "https://test3.com"
    };

    it(`should update a licensee`, async () => {
      PlatformSettings.update.mockResolvedValueOnce(true);
      const response = await LicenseeService.updateLicensee(body);
      expect(response).toBeDefined();
      expect(response).toBe(true);
    });
  });

  describe("deleteLicensee()", () => {
    let body = {
      id: 1
    };

    it(`should delete a licensee`, async () => {
      PlatformSettings.destroy.mockResolvedValueOnce(true);
      const response = await LicenseeService.deleteLicensee(body);
      expect(response).toBeDefined();
      expect(response).toBe(true);
    });
  });

  
});
