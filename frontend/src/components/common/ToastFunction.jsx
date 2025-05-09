import { toast } from "react-toastify";

export const notifySuccess = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 2000,
  });
};

export const notifyError = (message) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 2000,
  });
};
