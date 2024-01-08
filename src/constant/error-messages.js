module.exports = {
  SAMPLE_ERROR: {
    message: "Sample Message",
  },
  AUTH_TOKEN_EXPIRED: {
    message: "Auth Token Expired",
  },
  RESET_PASS_LINK_EXPIRED: {
    message: "Reset password link Expired",
  },
  TOKEN_FAILED: {
    message: "Could not verify the token",
  },
  USER_ALREADY_EXISTS: {
    message: "An account with this email already exists!",
  },
  PASS_RULES_ERROR: {
    message:   "Password Should Be Betweem 8 - 26 Characters And Must Include Atleast One Lower Case, Upper Case, Numeric And Symbol",
  },
  INVALID_EMAIL_PASSWORD: {
    message: "Invalid email or password provided!",
  },
  INVALID_PASSWORD: {
    message: "Incorrect password!",
  },
  CANNOT_USE_OLD_PASSWORD: {
    message: "You cannot set your current password as your new password!",
  },
  AUTH_TOKEN_REQUIRED: {
    message: "Auth Token is required!",
  },
  AUTH_TOKEN_INVALID: {
    message: "Auth Token is invalid!",
  },
  CANNOT_DELETE_LOGGED_USER: {
    message: "Cannot delete logged user!",
  },
  INVALID_PARAMETERS: {
    message: "Invalid parameters.",
  },
  NO_MATCHING_PLATFORM_FOUND: {
    message: "No matching platform settings found",
    description: "Your LTI authentication information doesn't match any existing platform settings in the C2E player", 
  },
  FAILED_TO_RETRIEVE_LICENSE: {
    message: "Failed to retrieve licenses",
    description: "Failed to retrieve licenses. Please check your licensee settings", 
  },
  FAILED_TO_STREAM_FILE: {
    message: "Failed to stream file",
    description: "Could not stream C2E content. Please check your licensee settings and query params", 
  },
  NO_XAPI_STATEMENT_PROVIDED: {
    message: "No xAPI statement provided",
    description: "The request params provided do not match a valid xAPI statement format", 
  },
  FAILED_TO_SEND_XAPI_STATEMENT_TO_PROVIDER_SERVICE_PROVIDER: {
    message: "Failed to send  xAPI statement to service provider",
    description: "Failed to send  xAPI statement to service provider. Check your integration settings", 
  },
};
