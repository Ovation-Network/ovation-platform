import { api } from '~/utils/api';

export const NotificationsContainer: React.FC = () => {

  const notifications = api.notification.getNotifications.useQuery();

  return (
    <div className="flex flex-col w-full">
    </div>
  )
};