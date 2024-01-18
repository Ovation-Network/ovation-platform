import { api } from '~/utils/api';
import { useEffect, useState } from 'react';
import { doc } from 'prettier';

export const NotifyIAPopup: React.FC = () => {

  const [modal, setModal] = useState<HTMLDialogElement | undefined>(undefined);

  useEffect(() => {
    
    const modal = document.getElementById('flag-modal') as HTMLDialogElement;

    const openModal = (): void => modal.showModal();
  }, [])


  return (
    <>
    {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={(e) => openModal(e)}>open modal</button>
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