# C2E Player Service Setup Guide

Please execute the folowing commands cefore starting the App for the first time.

> npm install
> npm run scripts
> npm start

# C2E Player Service API Documentation (Open API Specification)

Welcome to the Curriki C2E Player Service API documentation. :tada: :tada: :tada:

## Table of Contents
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Admin Routes](#admin-routes)
  - [Get C2E Stream Token](#get-c2e-stream-token)
- [C2E Routes](#c2e-routes)
  - [Get C2E Stream Token](#get-c2e-stream-token)
  - [Get C2E Manifest](#get-c2e-manifest)
  - [C2E Stream Search Endpoint](#c2e-stream-search-endpoint)
- [Platform Endpoints](#platform-endpoints)
  - [Platform Registration Endpoint](#platform-registration-endpoint)
  - [Get Platforms Endpoint](#get-platforms-endpoint)
  - [Delete Platform Endpoint](#delete-platform-endpoint)
- [Licensee Endpoints](#licensee-endpoints)
  - [Add Licensee Endpoint](#add-licensee-endpoint)
  - [Get Licensees Endpoint](#get-licensees-endpoint)
  - [Update Licensee Endpoint](#update-licensee-endpoint)
  - [Delete Licensee Endpoint](#delete-licensee-endpoint)
- [LTI Routes Endpoints](#lti-routes-endpoints)
  - [Get Members Details Endpoint](#get-members-details-endpoint)
  - [Deeplink Endpoint](#deeplink-endpoint)
  - [Play Endpoint](#play-endpoint)
- [Swagger Documentation](#swagger-documentation)
- [C2E SPECIFICATION DOCUMENT](https://github.com/CurrikiEducationalExperiences/cee-publisher-service/blob/main/public/C2E%20Specification%20v1.0.pdf?raw=true)

## Base URL

All endpoints are relative to the base URL:
```
https://service-host/api/v1
```

## Authentication

### API Key

All endpoints require an `x-api-key` header for authentication. Different roles have different API keys for access.

## Admin Routes


### Account Registration Endpoint

Endpoint to register a new account.

- **URL:** `/admin/register`
- **Method:** `POST`
- **Summary:** Account Registration Endpoint
- **Parameters:**
  - `payload` (body) - Account details
    - **Type:** object
    - **Properties:**
      - `email` (string) - Account Email
      - `password` (string) - Account Password
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": true
      }
      ```


### Account Signin Endpoint

Endpoint to signin to account.

- **URL:** `/admin/login`
- **Method:** `POST`
- **Summary:** Account Signin Endpoint
- **Parameters:**
  - `payload` (body) - Account Credentials
    - **Type:** object
    - **Properties:**
      - `email` (string) - Account Email
      - `password` (string) - Account Password
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": true
      }
      ```


### Get Account Profile

Endpoint to get account profile.

- **URL:** `/admin/getProfile`
- **Method:** `GET`
- **Summary:** Get Account Profile
- **Parameters:**
  - `Authorization` (header) - Authorization
    - **Type:** string
    - **Default:** Bearer {token}
    - **Required:** true
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": [
          {
            "id": 1,
            "email": "jhondoe@curriki.com",
            "createdAt": "2023-12-12T10:23:55.242Z",
            "updatedAt": "2023-12-12T11:09:37.077Z"
          }
        ]
      }
      ```


### Verify Reset Password Token

Endpoint to verify reset password token.

- **URL:** `/admin/verifyResetPasswordToken`
- **Method:** `GET`
- **Summary:** Verify Reset Password Token
- **Parameters:**
  - `token` (query) - Reset Password Token
    - **Type:** string
    - **Required:** true
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": true
      }
      ```


### Update Account Password

Endpoint to update account password.

- **URL:** `/admin/updatePassword`
- **Method:** `PATCH`
- **Summary:** Update Account Password
- **Parameters:**
  - `Authorization` (header) - Authorization
    - **Type:** string
    - **Default:** Bearer {token}
    - **Required:** true
  - `payload` (body) - User credentials
    - **Type:** object
    - **Properties:**
      - `password` (string) - Existing Password
      - `newPassword` (string) - New Password
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": true
      }
      ```


### Request Reset Password Link

Endpoint to request reset password link.

- **URL:** `/admin/forgetPassword`
- **Method:** `POST`
- **Summary:** Request Reset Password Link
- **Parameters:**
  - `payload` (body) - User credentials
    - **Type:** object
    - **Properties:**
      - `email` (string) - Account Email
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": true
      }
      ```


### Reset Password

Endpoint to reset password.

- **URL:** `/admin/resetPassword`
- **Method:** `POST`
- **Summary:** Reset Password
- **Parameters:**
  - `payload` (body) - User credentials
    - **Type:** object
    - **Properties:**
      - `password` (string) - Account Password
      - `token` (string) - Account Token
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": true
      }
      ```


## C2E Routes


### Get C2E Stream Token

Endpoint to get a C2E Stream token.

- **URL:** `/stream/token`
- **Method:** `GET`
- **Summary:** Get C2E Stream token (called from store service)
- **Parameters:**
  - `x-api-key` (header) - Authentication and Authorization
    - **Type:** string
    - **Default:** APIKey (role: cee-store-service)
    - **Required:** true
  - `subid` (query) - C2E Subscription ID setup on the store service
    - **Type:** string
    - **Required:** true
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": [
          {
            "ceeId": "C2E ID",
            "token": "C2E Stream Token",
            "expiresAt": "C2E Stream Token Expiry Date"
          }
        ]
      }
      ```


### Get C2E Manifest

Endpoint to get a C2E Manifest.

- **URL:** `/stream/manifest`
- **Method:** `GET`
- **Summary:** Get C2E Manifest (called from store service)
- **Parameters:**
  - `x-api-key` (header) - Authentication and Authorization
    - **Type:** string
    - **Default:** APIKey (role: cee-store-service)
    - **Required:** true
  - `subid` (query) - C2E Subscription ID
    - **Type:** string
    - **Required:** true
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": [
          {
            "ceeId": "C2E Subscription ID",
            "manifest": "C2E Manifest"
          }
        ]
      }
      ```

---

### C2E Stream Search Endpoint

Endpoint to search for C2E Streams.

- **URL:** `/stream/search`
- **Method:** `GET`
- **Summary:** C2E Stream Search Endpoint
- **Parameters:**
  - `Authorization` (header) - Authorization
    - **Type:** string
    - **Default:** Bearer {token}
    - **Required:** true
  - `query` (query) - C2E stream search query
    - **Type:** string
    - **Default:** "abc"
    - **Required:** true
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "result": [
          {
            // Your response object schema here
          }
        ]
      }
      ```

---

## Platform Endpoints

### Platform Registration Endpoint

Endpoint to register a new platform.

- **URL:** `/platform/registerPlatform`
- **Method:** `POST`
- **Summary:** Platform Registration Endpoint
- **Parameters:**
  - `Authorization` (header) - Authorization
    - **Type:** string
    - **Default:** Bearer {token}
    - **Required:** true
  - `payload` (body) - Platform details
    - **Type:** object
    - **Properties:**
      - `url` (string) - Platform URL
      - `name` (string) - Platform Name
      - `clientId` (string) - Client ID
      - `authenticationEndpoint` (string) - Authentication Endpoint
      - `accesstokenEndpoint` (string) - Access Token Endpoint
      - `authConfigMethod` (string) - Auth Config Method
      - `authConfigKey` (string) - Auth Config Key
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": true
      }
      ```

### Get Platforms Endpoint

Endpoint to get all registered platforms.

- **URL:** `/platform/getPlatforms`
- **Method:** `GET`
- **Summary:** Get Platforms Endpoint
- **Parameters:**
  - `Authorization` (header) - Authorization
    - **Type:** string
    - **Default:** Bearer {token}
    - **Required:** true
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": [
          {
            "id": 1,
            "platformName": "Test Studio 1",
            "platformUrl": "https://test1.com",
            "clientId": "10001",
            "authEndpoint": "https://xxxxxxxx/api/lti/authorize_redirect",
            "accesstokenEndpoint": "https://xxxxxxxx/login/oauth2/token",
            "kid": "xxxxxxxx",
            "authConfig": {
              "method": "JWK_SET",
              "key": "https://xxxxxxxx/api/lti/security/jwks"
            },
            "authorizationServer": null,
            "publicKeys": {
              "iv": "xxxxxxxx",
              "data": "xxxxxxxx"
            },
            "privateKeys": {
              "iv": "xxxxxxxx",
              "data": "xxxxxxxx"
            },
            "createdAt": "2024-01-16T07:01:17.758Z",
            "updatedAt": "2024-01-16T07:01:17.758Z"
          }
        ]
      }
      ```

### Delete Platform Endpoint

Endpoint to delete a platform.

- **URL:** `/platform/deletePlatform`
- **Method:** `DELETE`
- **Summary:** Delete Platforms Endpoint
- **Parameters:**
  - `Authorization` (header) - Authorization
    - **Type:** string
    - **Default:** Bearer {token}
    - **Required:** true
  - `platformId` (query) - Platform ID
    - **Type:** string
    - **Default:** "abcd"
    - **Required:** true
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": true
      }
      ```

---



## Licensee Endpoints

### Add Licensee Endpoint

Endpoint to add a new licensee.

- **URL:** `/licensee/addLicensee`
- **Method:** `POST`
- **Summary:** Add Licensee Endpoint
- **Parameters:**
  - `Authorization` (header) - Authorization
    - **Type:** string
    - **Default:** Bearer {token}
    - **Required:** true
  - `payload` (body) - Licensee details
    - **Type:** object
    - **Properties:**
      - `lti_client_id` (string) - LTI Client ID
      - `cee_licensee_id` (string) - CEE Licensee ID
      - `cee_secret_key` (string) - CEE Secret Key
      - `cee_provider_url` (string) - CEE Provider URL
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": true
      }
      ```

### Get Licensees Endpoint

Endpoint to get all registered licensees.

- **URL:** `/licensee/getLicensees`
- **Method:** `GET`
- **Summary:** Get Licensee Endpoint
- **Parameters:**
  - `Authorization` (header) - Authorization
    - **Type:** string
    - **Default:** Bearer {token}
    - **Required:** true
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": [
          {
            "id": 1,
            "lti_client_id": "10001",
            "cee_licensee_id": "license",
            "cee_secret_key": "secret",
            "cee_provider_url": "https://test1.com",
            "platformName": "Test Studio 1",
            "createdAt": "2024-01-16T07:08:19.659Z",
            "updatedAt": "2024-01-16T07:08:19.659Z"
          }
        ]
      }
      ```

### Update Licensee Endpoint

Endpoint to update an existing licensee.

- **URL:** `/licensee/updateLicensee`
- **Method:** `PATCH`
- **Summary:** Update Licensee Endpoint
- **Parameters:**
  - `Authorization` (header) - Authorization
    - **Type:** string
    - **Default:** Bearer {token}
    - **Required:** true
  - `id` (query) - Licensee ID
    - **Type:** string
    - **Default:** "1"
    - **Required:** true
  - `payload` (body) - Updated licensee details
    - **Type:** object
    - **Properties:**
      - `lti_client_id` (string) - LTI Client ID
      - `cee_licensee_id` (string) - CEE Licensee ID
      - `cee_secret_key` (string) - CEE Secret Key
      - `cee_provider_url` (string) - CEE Provider URL
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": true
      }
      ```

### Delete Licensee Endpoint

Endpoint to delete a licensee.

- **URL:** `/licensee/deleteLicensee`
- **Method:** `DELETE`
- **Summary:** Delete Licensee Endpoint
- **Parameters:**
  - `Authorization` (header) - Authorization
    - **Type:** string
    - **Default:** Bearer {token}
    - **Required:** true
  - `id` (query) - Licensee ID
    - **Type:** string
    - **Default:** "1"
    - **Required:** true
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": true
      }
      ```

---



---

## Authentication

### Bearer Token

All endpoints require an `Authorization` header with a Bearer token for authentication.

---

## LTI Routes Endpoints

### Get Members Details Endpoint

Endpoint to get details of all members.

- **URL:** `/members`
- **Method:** `GET`
- **Operation ID:** `members`
- **Summary:** Get Members Details Endpoint
- **Parameters:**
  - `Authorization` (header) - Authorization
    - **Type:** string
    - **Default:** Bearer {token}
    - **Required:** true
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      [
        {
          "status": "Active",
          "name": "Jhon Doe",
          "picture": "xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx",
          "given_name": "Jhon",
          "family_name": "Doe",
          "email": "jhondoe@curriki.org",
          "user_id": "xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx",
          "lti11_legacy_user_id": "xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx",
          "roles": ["xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx"]
        }
      ]
      ```

### Deeplink Endpoint

Endpoint to generate a deeplink.

- **URL:** `/deeplink`
- **Method:** `POST`
- **Operation ID:** `deeplink`
- **Summary:** Deeplink Endpoint
- **Parameters:**
  - `Authorization` (header) - Authorization
    - **Type:** string
    - **Default:** Bearer {token}
    - **Required:** true
  - `payload` (body) - Deeplink parameters
    - **Type:** object
    - **Properties:**
      - `title` (string) - Title
      - `name` (string) - Name
      - `value` (string) - Value
      - `id` (string) - ID
- **Responses:**
  - `200`:
    - **Description:** Successful response
    - **Content:**
      ```html
      <!DOCTYPE html>
      <html>
      <head>
        <title>HTML Form</title>
      </head>
      <body>
        <form action='/submit' method='post'>
          <label for='inputField'>Input Field:</label>
          <input type='text' id='inputField' name='inputField'><br>
          <input type='submit' value='Submit'>
        </form>
      </body>
      </html>
      ```

### Play Endpoint

Endpoint to play content.

- **URL:** `/play`
- **Method:** `POST`
- **Summary:** Play Endpoint
- **Parameters:**
  - `Authorization` (header) - Authorization
    - **Type:** string
    - **Default:** Bearer {token}
    - **Required:** true
  - `c2eId` (query) - c2eId
    - **Type:** string
    - **Default:** "abc"
    - **Required:** true
- **Responses:**
  - `200`:
    - **Description:** Successful response
    - **Content:**
      ```html
      <!DOCTYPE html>
      <html>
      <head>
        <title>HTML Form</title>
      </head>
      <body>
        <form action='/submit' method='post'>
          <label for='inputField'>Input Field:</label>
          <input type='text' id='inputField' name='inputField'><br>
          <input type='submit' value='Submit'>
        </form>
      </body>
      </html>
      ```

---

## Public Routes

### Get Canvas Config

Endpoint to get canvas config.

- **URL:** `/members`
- **Method:** `GET`
- **Operation ID:** `members`
- **Summary:** Canvas Config JSON Endpoint
- **Parameters:**
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "title": "Curriki Educational Experiences",
        "scopes": [
          "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem",
          "https://purl.imsglobal.org/spec/lti-nrps/scope/contextmembership.readonly",
          "https://purl.imsglobal.org/spec/lti-ags/scope/score",
          "https://purl.imsglobal.org/spec/lti-ags/scope/result.readonly",
          "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem.readonly"
        ],
        "extensions": [
          {
            "platform": "canvas.instructure.com",
            "settings": {
              "platform": "canvas.instructure.com",
              "text": "Curriki Educational Experiences",
              "icon_url": "xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx/icon.svg",
              "placements": [
                {
                  "text": "Curriki Educational Experiences",
                  "icon_url": "xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx/icon.svg",
                  "placement": "link_selection",
                  "message_type": "LtiDeepLinkingRequest",
                  "target_link_uri": "xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx"
                },
                {
                  "text": "Curriki Educational Experiences",
                  "icon_url": "xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx/icon.svg",
                  "placement": "assignment_selection",
                  "message_type": "LtiDeepLinkingRequest",
                  "target_link_uri": "xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx"
                }
              ]
            },
            "privacy_level": "public"
          }
        ],
        "public_jwk": {},
        "description": "Curriki Educational Experiences LTI 1.3 Tool",
        "custom_fields": {},
        "public_jwk_url": "xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx/keys",
        "target_link_uri": "xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx",
        "oidc_initiation_url": "xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx/login"
      }
      ```

## Swagger Documentation
> Swagger Documentation can be found on following link https://service-host/api-docs/


