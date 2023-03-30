import { SuccessToast, InfoToast, WarningToast, ErrorToast } from "./Toast";

export class ToastService {
  static success(msg: string) {
    SuccessToast(msg);
  }
  static info(msg: string) {
    InfoToast(msg);
  }
  static warning(msg: string) {
    WarningToast(msg);
  }
  static error(msg: string) {
    ErrorToast(msg);
  }
}
