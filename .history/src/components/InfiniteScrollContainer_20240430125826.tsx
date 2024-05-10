import InfiniteScroll from "react-infinite-scroll-component";
import type { Supplier, OnSiteContact, GeneralManager, RepresentativeCompany } from "@prisma/client";
import { LoadingSpinner } from "./LoadingSpinner";
// import { SupplierCollapseItem } from "./SupplierCollapseItem";
import { api } from "~/utils/api";

type InfiniteSupplierListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean | undefined;
  fetchNewSuppliers: () => Promise<unknown>;
  suppliers?: Supplier[];
};

interface SupplierProps extends Supplier {
  contacts: OnSiteContact[];
  generalManagers: GeneralManager[];
  representativeCompanies: RepresentativeCompany[];
}



export function InfiniteScrollContainer({
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
          return <SupplierCollapseItem key={supplier.id + supplier.name} {...supplier} />;
        })}
      </InfiniteScroll>
    </ul>
  );
}

function SupplierCollapseItem({
  id,
  name,
  type,
  country,
  city,
  region,
  state,
  updatedAt
}: Supplier) {
  const trpcUtils = api.useUtils();
  // const toggleLike = api.tweet.toggleLike.useMutation({
  //   onSuccess: ({ addedLike }) => {
  //     const updateData: Parameters<
  //       typeof trpcUtils.tweet.infiniteFeed.setInfiniteData
  //     >[1] = (oldData) => {
  //       if (oldData == null) return;

  //       const countModifier = addedLike ? 1 : -1;

  //       return {
  //         ...oldData,
  //         pages: oldData.pages.map((page) => {
  //           return {
  //             ...page,
  //             tweets: page.tweets.map((tweet) => {
  //               if (tweet.id === id) {
  //                 return {
  //                   ...tweet,
  //                   likeCount: tweet.likeCount + countModifier,
  //                   likedByMe: addedLike,
  //                 };
  //               }

  //               return tweet;
  //             }),
  //           };
  //         }),
  //       };
  //     };

  //     trpcUtils.tweet.infiniteFeed.setInfiniteData({}, updateData);
  //     trpcUtils.tweet.infiniteFeed.setInfiniteData(
  //       { onlyFollowing: true },
  //       updateData
  //     );
  //     trpcUtils.tweet.infiniteProfileFeed.setInfiniteData(
  //       { userId: user.id },
  //       updateData
  //     );
  //   },
  // });

  // function handleToggleLike() {
  //   toggleLike.mutate({ id });
  // }

  return (
    <div tabIndex={id} className="collapse border border-base-300 bg-base-200"> 
      <div className="collapse-title text-xl font-medium">
        {name}
      </div>
      <div className="collapse-content"> 
        <p>{city}</p>
      </div>
    </div>
  );
}