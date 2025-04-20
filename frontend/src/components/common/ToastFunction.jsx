import { toast } from "react-toastify";

export const notifySuccess = () => {
  toast.success("Customer created successfully!", {
    position: 'top-right',
    autoClose: 2000,
  });
};

export const notifyError = () => {
  toast.error("Something went wrong! Try again.", {
    position: 'top-right',
    autoClose: 2000,
  });
};
