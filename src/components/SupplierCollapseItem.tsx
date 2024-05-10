import type { Supplier } from "@prisma/client";



export const SupplierCollapseItem: React.FC<{ supplier: Supplier, tabIndex: number }> = ({ supplier, tabIndex }) => {
  return (
    <div tabIndex={tabIndex} className="collapse border border-base-300 bg-base-200"> 
      <div className="collapse-title text-xl font-medium">
        {supplier.name}
      </div>
      <div className="collapse-content"> 
        <p>{supplier.city}</p>
      </div>
    </div>
  )
};

