import InfiniteScroll from "react-infinite-scroll-component";
import type { Supplier, OnSiteContact, GeneralManager, RepresentativeCompany } from "@prisma/client";
import { LoadingSpinner } from "./LoadingSpinner";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";

type InfiniteSupplierListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean | undefined;
  fetchNewSuppliers: () => Promise<unknown>;
  suppliers?: SupplierProps[];
};

interface SupplierProps extends Supplier {
  contacts: OnSiteContact[];
  generalManagers: GeneralManager[];
  representativeCompanies: RepresentativeCompany[];
}

type searchByProps = 'name' | 'id' | 'country' | 'city' | undefined;


export const SupplierScrollTable: React.FC<{ searchBy: searchByProps, value: string | null }> = ({ searchBy, value } ) => {

  const searchOptions = {
    searchBy: undefined as searchByProps,
    name: ''
  };

  if (searchBy && value) {
    searchOptions.searchBy = searchBy;
    searchOptions.name = value;
  }

  const suppliers = api.supplier.infiniteSupplierFeed.useInfiniteQuery(
    searchBy && value ? searchOptions : {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
    }
  );
  
  return (
    <table className="table-fixed table-zebra w-full min-h-full">
      <thead>
        <tr>
          <th className="bg-teal-400 text-xl text-white">Location</th>
          <th className="bg-teal-400 text-xl text-white">Supplier</th> 
          <th className="bg-teal-400 text-xl text-white">Contact</th> 
          <th className="bg-teal-400 text-xl text-white">Rep. Company</th>
          <th className="bg-teal-400 text-xl text-white">GM</th>
          <th className="bg-teal-400 text-xl text-white"></th>
        </tr>
      </thead>
      <tbody>

        <SupplierScrollContainer
          suppliers={suppliers.data?.pages.flatMap((page) => page.supplier)}
          isError={suppliers.isError}
          isLoading={suppliers.isLoading}
          hasMore={suppliers.hasNextPage}
          fetchNewSuppliers={suppliers.fetchNextPage}
        />
      </tbody>


      <tfoot>
        <tr>
          <th className="bg-teal-400 text-xl text-white">Location</th>
          <th className="bg-teal-400 text-xl text-white">Supplier</th> 
          <th className="bg-teal-400 text-xl text-white">Contact</th> 
          <th className="bg-teal-400 text-xl text-white">Rep. Company</th>
          <th className="bg-teal-400 text-xl text-white">GM</th>
          <th className="bg-teal-400 text-xl text-white"></th>
        </tr>
      </tfoot>
    </table>
  )
}

function SupplierScrollContainer({
  suppliers,
  isError,
  isLoading,
  fetchNewSuppliers,
  hasMore = false,
}: InfiniteSupplierListProps) {
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <h1>Error...</h1>;

  if (suppliers == null || suppliers.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500">No Contacts Found</h2>
    );
  }

  return (
    <tr>
    
      <InfiniteScroll
        dataLength={suppliers.length}
        next={fetchNewSuppliers}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
      >
        {suppliers.map((supplier, i) => {
          return <SupplierRowItem key={`${i}-${supplier.name}-collapse-item`} {...supplier} />;
        })}
      </InfiniteScroll>
    </tr>
  );
}

function SupplierRowItem({
  id,
  name,
  type,
  country,
  city,
  region,
  state,
  updatedAt,
  generalManagers,
  contacts,
  representativeCompanies,
}: SupplierProps) {

  return (
    <>
    
      <td className='p-2'>
        {city && `${city}, `}{state && `${state}, `}<br/>
        {country}<br/>
      </td>
      <td className='p-2'>{name}</td>
      <td className='p-2'>
        <div className="flex flex-col" >
          {contacts?.map((contact, i ) => (
            <div key={`${i}-contact-item`}>
              <p className="text-md font-bold">
                {contact.name ? contact.name : ''}
              </p>
              <p className="text-sm font-bold">
                {contact.title ? contact.title : ''}
              </p>
              <p className="text-sm pt-1">
                {contact.email && 
                  <a href={`mailto:${contact.email}`}>
                  {contact.email}
                  </a>
                }
              </p>
              <p className="text-sm pt-1">
                {contact.phone && 
                  <a href={`tel:${contact.phone}`}>
                  {contact.phone}
                  </a>
                }
              </p>
            </div>
          ))}
        </div>
      </td>
      <td className="">
        <div className="flex flex-col" >
          {representativeCompanies?.map((contact, i ) => (
            <div key={`${i}-contact-item`}>
              <p className="text-md font-bold">
                {contact.name ? contact.name : ''}
              </p>
              <p className="text-sm font-bold">
                {contact.companyName ? contact.companyName : ''}
              </p>
              <p className="text-sm font-semibold">
                {contact.title ? contact.title : ''}
              </p>
              <p className="text-sm pt-1">
                {contact.email && 
                  <a href={`mailto:${contact.email}`}>
                  {contact.email}
                  </a>
                }
              </p>
              <p className="text-sm pt-1">
                {contact.phone && 
                  <a href={`tel:${contact.phone}`}>
                  {contact.phone}
                  </a>
                }
              </p>
            </div>
          ))}
        </div>
      </td>
      <td className="">
        {generalManagers?.map((contact, i ) => (
          <div key={`${i}-contact-item`}>
            <p className="text-md font-bold">
              {contact.name ? contact.name : ''}
            </p>
            <p className="text-sm font-semibold">
              {contact.title ? contact.title : ''}
            </p>
            <p className="text-sm pt-1">
              {contact.email && 
                <a href={`mailto:${contact.email}`}>
                {contact.email}
                </a>
              }
            </p>
            <p className="text-sm pt-1">
              {contact.phone && 
                <a href={`tel:${contact.phone}`}>
                {contact.phone}
                </a>
              }
            </p>
          </div>
          ))}
      </td>
      <td className="">
        <NotifyIAPopup supplierId={id} supplierName={name} />
      </td>
    </>
  );
}

type NotificationProps = {
  supplierId: number;
  supplierName: string;

}

const NotifyIAPopup: React.FC<NotificationProps> = ({ supplierId, supplierName }) => {
  const [modal, setModal] = useState<HTMLDialogElement | undefined>(undefined);
  const [name, setName] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [notifier, setNotifier] = useState<string>('');
  const [details, setDetails] = useState<string>('');

  useEffect(() => {
    // browser code
    const modalElement = document.getElementById(`${id}-flag-modal`) as HTMLDialogElement;
    setModal(modalElement);
    setName(supplierName);
    setId(supplierId);

  }, [supplierName, supplierId, id, modal])

  const notificationAPI = api.notification.createNotification.useMutation({
    onSuccess: () => {
      alert('successfully notified IA team, thank you! :)')
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
      <button className="btn" onClick={openModal}>FLAG</button>
      <dialog id={`${id}-flag-modal`} className="modal">
        <div className="modal-box bg-white">
          <form id="notifyIAForm" method="dialog bg-white">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Who&apos;s letting us know?</label>
              <input name={`${id}-form-name`} type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Enter name here" onChange={(e) => setNotifier(e.target.value)}/>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black pt-2">What did you notice we need to change regarind {name} - {id}?</label>
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