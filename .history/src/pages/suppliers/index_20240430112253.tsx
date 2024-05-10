import { api } from '~/utils/api';
import { LoadingSpinner } from '~/components/LoadingSpinner';


export default function Suppliers() {
  return (
    <div>
      <h1>Suppliers Page</h1>
    </div>
  );
}

function SupplierLists() {
  const { isLoading, data } = api.supplier.infiniteSupplierFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  if (isLoading) return <LoadingSpinner />;
  
  return (
    <>
      {data?.pages.map((page, i) => {
        return (
          <ul key={`${i}-unlimited-pages`}>
            {JSON.stringify(page.supplier)}
          </ul>
        );
      })}
    </>
  )
}