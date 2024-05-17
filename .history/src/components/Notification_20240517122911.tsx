import { api } from '~/utils/api';
import Link from 'next/link';

type NotificationProps = {
  supplierID: number | null;
  notifier: string | null;
  details: string;
  submissionDate: Date;
}

export const Notification: React.FC<NotificationProps> = ({ supplierID, notifier, details, submissionDate}) => {

  const trpcUtils = api.useUtils();

  const resolveNotificationAPI = api.notification.resolveIssue.useMutation({
    onSuccess: () => {
      trpcUtils.notification.getUnresolvedNotifications.invalidate()
        .then(() => console.log('Successfully invalidated getNotifications cache'))
        .catch((error) => console.error(error))

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

  return (
    <div role="alert" className="alert">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span>{notifier} raised an issue on {submissionDate.toLocaleDateString()}&#10;{details}</span>
      <div>
        <Link href={`/admin/supplier/${supplierID}`}>
          <button className="btn btn-sm">EDIT</button>
        </Link>
        <button className="btn btn-sm btn-primary" onClick={async (e) => await handleResolveNotification(e)}>RESOLVE</button>
      </div>
    </div>
  )
};