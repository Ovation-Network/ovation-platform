import { api } from '~/utils/api';
import { Notification } from './Notification';

export const NotificationsContainer: React.FC = () => {

  const { data, isError, isLoading } = api.notification.getUnresolvedNotifications.useQuery({});


  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="loader"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <p className="text-center">Failed to fetch notifications. Please try refreshing your browser.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      {data?.length === 0 && <p className="text-center">No unresolved notifications</p>}
      {data === undefined && <p className="text-center">No unresolved notifications</p>}
      {data?.map((notification) => (
        <Notification
          key={notification.id}
          supplierID={notification.supplierId}
          notifier={notification.name}
          details={notification.details}
          submissionDate={notification.createdAt}
        />
        )
      )}
    </div>
  )
};