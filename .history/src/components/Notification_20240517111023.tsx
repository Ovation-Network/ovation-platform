import { api } from '~/utils/api';
import Link from 'next/link';
import React from 'react';

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

  const handleResolveNotification = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await resolveNotificationAPI.mutateAsync({ id: supplierID });
  }

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
    <div role="alert" className="alert">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span>we use cookies for no reason.</span>
      <div>
        <button className="btn btn-sm">EDIT</button>
        <button className="btn btn-sm btn-primary">RESOLVE</button>
      </div>
    </div>
  )

};