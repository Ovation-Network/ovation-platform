import InfiniteScroll from "react-infinite-scroll-component";
import type { Supplier } from "@prisma/client";
import { LoadingSpinner } from "./LoadingSpinner";
import { SupplierCollapseItem } from "./SupplierCollapseItem";

type InfiniteSupplierListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean | undefined;
  fetchNewSuppliers: () => Promise<unknown>;
  suppliers?: Supplier[];
};

export function InfiniteTweetList({
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
      <h2 className="my-4 text-center text-2xl text-gray-500">No Tweets</h2>
    );
  }

  return (
    <ul>
      <InfiniteScroll
        dataLength={suppliers.length}
        next={fetchNewSuppliers}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
      >
        {suppliers.map((supplier, i) => {
          return <SupplierCollapseItem key={supplier.id + supplier.name} supplier={tabIndex: i, ...supplier} />;
        })}
      </InfiniteScroll>
    </ul>
  );
}