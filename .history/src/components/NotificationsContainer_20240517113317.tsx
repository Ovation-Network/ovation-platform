import { api } from '~/utils/api';
import { Notification } from './Notification';

export const NotificationsContainer: React.FC = () => {

  const { data, isError, isLoading } = api.notification.getUnresolvedNotifications.useQuery();


  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="loader"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      {}
    </div>
  )
};