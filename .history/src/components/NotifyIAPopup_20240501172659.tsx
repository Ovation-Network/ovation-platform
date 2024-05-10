import { api } from '~/utils/api';

type NotificationProps = {
  supplierId: number | null;
  supplierName: string | null;
}

export const NotifyIAPopup: React.FC<NotificationProps> = ({ supplierId, supplierName }) => {

  // const [modal, setModal] = useState<HTMLDialogElement | undefined>(undefined);

  const modalElement = document.getElementById('flag-modal') as HTMLDialogElement;

  const openModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    modalElement?.showModal();
  }

  const closeModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    modalElement?.close();
  }

  const notificationAPI = api.notification.createNotification.useMutation({
    onSuccess: () => {
      alert('successfully notified IA team, thank you! :)')

      modalElement?.close();
    }
  });

  const notifyIA = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const notifier = formData.get('name') as string;
    const details = formData.get('details') as string;

    notificationAPI.mutate({ supplierId, notifier, details });
  }




  return (
    <>
    {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={openModal}>FLAG</button>
      <dialog id="flag-modal" className="modal">
        <div className="modal-box bg-white">
          <form id="notifyIAForm" method="dialog bg-white" onSubmit={notifyIA}>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Who&apos;s letting us know?</label>
              <input name="name" type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Enter name here" required/>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black pt-2">What did you notice we need to change?</label>
              <textarea name="details" id="details" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter details here...." required></textarea>
            </div>
            {/* if there is a button in form, it will close the modal */}
          </form>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
          <button form="notifyIAForm" type="submit" className="btn mt-3">NOTIFY</button>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  )
}