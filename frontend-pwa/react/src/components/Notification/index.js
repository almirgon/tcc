import {Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = ({ type, message }) => {
  switch (type) {
    case 'success':
      toast.success("😃 " + message);
      break;
    case 'warning':
      toast.warning("⚠️ " + message);
      break;
    case 'error':
      toast.error("⛔️ " + message);
      break;
    case 'info':
      toast.info("🔦 " + message);
      break;
    default:
      toast(message);
  }
};

export default function Notification() {
  return <ToastContainer limit={3} transition={Flip} />;
}



