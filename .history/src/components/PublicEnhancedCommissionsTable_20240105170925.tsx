import { useState, useEffect } from 'react';
import { formatInput, filterEnhancedCommissionsDataByLocation, filterEnhancedCommissionsDataByName } from '~/utils/helpers';



const PublicEnhancedCommissionsTable: React.FC<PublicEnhancedCommissionProps[]> = (props) => {
  const [filter, setFilter] = useState<string>('supplier');
  const [search, setSearch] = useState<string>('');
  const [enhancedCommissionData, setEnhancedCommissionData] = useState<PublicEnhancedCommissionProps[]>([]);



  useEffect(() => {
    // set enhancedCommissionData to props
    setEnhancedCommissionData(props);

    // if search is not empty, filter enhancedCommissionData by search
    search !== '' && setEnhancedCommissionData((currentData) => filter === 'supplier' ? filterEnhancedCommissionsDataByName(props, search) : filterEnhancedCommissionsDataByLocation(props, search));

  }, [filter, search, props])


  return (
    <div className="p-5">
      {/* Search box and filter dropdown */}
      <div className="input-group mb-5">
        <select className="select select-bordered" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="supplier">Supplier</option>
          <option value="location">Location</option>
        </select>
        <input type="text" placeholder="Search…" className="input input-bordered" value={search} onChange={(e) => setSearch(e.target.value)}/>
        <div className="btn" onClick={() => setSearch('')}>
          RESET
        </div>
      </div>

      {/* TABLE CONTAINING DATA */}



    </div>
  );
}

type PublicEnhancedCommissionProps = {
  region: string;
  country: string;
  city: string;
  supplier: string;
  commission: string;
  specialAmenity: string | null;
  bookingInstruction: string | null;
  startDate: Date | null;
  endDate: Date | null;
}