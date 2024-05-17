import { api } from '~/utils/api';
import Link from 'next/link';

type NotificationProps = {
  supplierID: number;
  notifier: string;
  details: string;
  submissionDate: string;
}

export const Notification: React.FC<NotificationProps> = ({ supplierID, notifier, details, submissionDate}) => {

  const trpcUtils = api.useUtils();

  const resolveNotificationAPI = api.notification.resolveIssue.useMutation({
    onSuccess: () => {
      // trpcUtils.notification.getNotifications.invalidate({})
      //   .then(() => console.log('Successfully invalidated getNotifications cache'))
      //   .catch((error) => console.error(error))

      alert('Successfully resolved notification! Thanks for your help :)');
    },
    onError: (error) => {
      // show error message
      alert('Failed to resolve notification. Please try again later');
      console.error(error);
    }
  })

  /* 
  const addSupplierAndContactsAPI = api.supplier.createSupplierAndContacts.useMutation({
    onSuccess: () => {
      trpcUtils.supplier.getSupplierContacts.invalidate({})
        .then(() => console.log('Successfully invalidated getSupplierContacts cache'))
        .catch((error) => console.error(error))
    },
    onError: (error) => {
      // show error message
      alert('Failed to add supplier and contacts. Please try again later');
      console.error(error);
    }
  });
  */


  return (
    <>
    </>
  )

};