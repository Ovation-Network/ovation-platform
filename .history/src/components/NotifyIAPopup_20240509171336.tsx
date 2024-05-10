import { api } from '~/utils/api';
import { useEffect, useState } from 'react';

type NotificationProps = {
  supplierId: number;
  supplierName: string;
  supplierType: string;

}

export const NotifyIAPopup: React.FC<NotificationProps> = ({ supplierId, supplierName, supplierType }) => {
  const [modal, setModal] = useState<HTMLDialogElement | undefined>(undefined);
  const [name, setName] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [notifier, setNotifier] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [type, setType] = useState<string | null>(null);  

  useEffect(() => {
    // browser code
    const modalElement = document.getElementById(`${id}-flag-modal`) as HTMLDialogElement;
    setModal(modalElement);
    setName(supplierName);
    setId(supplierId);
    setType(supplierType);

  }, [supplierName, supplierId, supplierType, id, modal])

  const notificationAPI = api.notification.createNotification.useMutation({
    onSuccess: () => {
      alert(`successfully notified IA team, thank you ${notifier}! :) We will make the necessary changes to the contact of ${name}.`)
      modal?.close();
    }
  });

  const notifyIA = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    notificationAPI.mutate({ supplierId, notifier, details });
  }


  const openModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    modal?.showModal();
  }

  const closeModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    modal?.close();
  }

  return (
    <>
    {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn bg-[#ced42d8e] btn-sm text-white border-[#c3d42d]" onClick={openModal}>FLAG</button>
      <dialog id={`${id}-flag-modal`} className="modal">
        <div className="modal-box bg-white">
          <form id="notifyIAForm" method="dialog bg-white">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Who&apos;s letting us know?</label>
              <input name={`${id}-form-name`} type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Enter name here" onChange={(e) => setNotifier(e.target.value)}/>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black pt-2">What changes should we make regarding the {type}, {name} ?</label>
              <textarea name={`${id}-form-details`} id="details" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter details here...." onChange={(e) => setDetails(e.target.value)}></textarea>
            </div>
            {/* if there is a button in form, it will close the modal */}
          </form>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
          <button form="notifyIAForm" type="button" className="btn mt-3" onClick={(e) => notifyIA(e)}>NOTIFY</button>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  )
}