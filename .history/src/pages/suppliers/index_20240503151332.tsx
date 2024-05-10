import { api } from '~/utils/api';
import { InfiniteSupplierScrollContainer } from '~/components/InfiniteSupplierScrollContainer';

export default async function Suppliers() {
  return (
    <div>
      <h1>Suppliers Page</h1>
      <SupplierLists />
    </div>
  );
}

function SupplierLists() {
  const suppliers = api.supplier.infiniteSupplierFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor
    }
  );
  
  return (
    <InfiniteSupplierScrollContainer
      suppliers={suppliers.data?.pages.flatMap((page) => page.supplier)}
      isError={suppliers.isError}
      isLoading={suppliers.isLoading}
      hasMore={suppliers.hasNextPage}
      fetchNewSuppliers={suppliers.fetchNextPage}
    />
  )
}