export const AppConfig = {
  apiURL: "http://localhost",
  isDebug: false,
  microServices: {
    "login-service": ":8080",
    "admin-service": ":8080",
  },
};

export type IMicroServicesPort = "login-service" | "admin-service";
