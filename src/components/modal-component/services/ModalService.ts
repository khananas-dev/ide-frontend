export interface ModalProps {
  title: string;
  type: "success" | "info" | "warning" | "error";
  message: string;
  secondaryBtn?: {
    label?: string;
    onClick?: any;
  };
  primaryBtn?: {
    label?: string;
    onClick?: any;
  };
}

export const ModalComponentService = {
  on(event: any, callback: any) {
    document.addEventListener(event, (e) => callback(e.detail));
  },
  open(props: ModalProps) {
    document.dispatchEvent(new CustomEvent("open", { detail: { ...props } }));
  },
};

interface ModalServiceProps {
  title: string;
  message: string;
  secondaryBtn?: {
    label?: string;
    onClick?: any;
  };
  primaryBtn?: {
    label?: string;
    onClick?: any;
  };
}
export default class ModalService {
  static success({
    title,
    message,
    primaryBtn,
    secondaryBtn,
  }: ModalServiceProps) {
    ModalComponentService.open({
      title,
      type: "success",
      message,
      primaryBtn,
      secondaryBtn,
    });
  }
  static info({ title, message, primaryBtn, secondaryBtn }: ModalServiceProps) {
    ModalComponentService.open({
      title,
      type: "info",
      message,
      primaryBtn,
      secondaryBtn,
    });
  }
  static warning({
    title,
    message,
    primaryBtn,
    secondaryBtn,
  }: ModalServiceProps) {
    ModalComponentService.open({
      title,
      type: "warning",
      message,
      primaryBtn,
      secondaryBtn,
    });
  }
  static error({
    title,
    message,
    primaryBtn,
    secondaryBtn,
  }: ModalServiceProps) {
    ModalComponentService.open({
      title,
      type: "error",
      message,
      primaryBtn,
      secondaryBtn,
    });
  }
}
