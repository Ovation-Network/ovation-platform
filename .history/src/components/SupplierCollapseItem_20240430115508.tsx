import type { Supplier } from "@prisma/client";

interface SupplierCollapseItemProps extends Supplier {
  tabIndex: number;
}


export const SupplierCollapseItem: React.FC<{ supplier: SupplierCollapseItemProps }> = ({ supplier }) => {
  return (
    <div tabIndex={0} className="collapse border border-base-300 bg-base-200"> 
      <div className="collapse-title text-xl font-medium">
        {supplier.name}
      </div>
      <div className="collapse-content"> 
        <p>tabIndex={0} attribute is necessary to make the div focusable</p>
      </div>
    </div>
  )
};

