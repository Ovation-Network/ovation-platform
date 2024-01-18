import { api } from '~/utils/api';
import { useEffect, useState } from 'react';

export const NotifyIAPopup: React.FC = () => {

  const [modal, setModal] = useState<HTMLDialogElement | undefined>(undefined);

  const openModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    modal?.showModal();
  }

  useEffect(() => {
    
    setModal(document.getElementById('flag-modal') as HTMLDialogElement);
  }, [])


  return (
    <>
    {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={(e) => openModal(e)}>FLAG</button>
      <dialog id="flag-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  )
}