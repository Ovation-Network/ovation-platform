import { api } from '~/utils/api';
import { Notification } from './Notification';

export const NotificationsContainer: React.FC = () => {

  const { data, isError, isLoading } = api.notification.getUnresolvedNotifications.useQuery();

  return (
    <div className="flex flex-col w-full">
      {}
    </div>
  )
};