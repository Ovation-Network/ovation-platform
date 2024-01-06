import { useState, useEffect } from 'react';
import { formatInput, filterEnhancedCommissionsDataByLocation, filterEnhancedCommissionsDataByName } from '~/utils/helpers';



const PublicEnhancedCommissionsTable: React.FC<PublicEnhancedCommissionProps[]> = (props) => {
  const [filter, setFilter] = useState<string>('supplier');
  const [search, setSearch] = useState<string>('');
  const [filteredData, setFilteredData] = useState<PublicEnhancedCommissionProps[]>([]);

  const enhancedCommissions = [...props];

  useEffect(() => {
    search !== '' && setFilteredData(enhancedCommissions.filter((enhancedCommission) => {
      if (filter === 'supplier') {
        return 
      }
    }))

  }, [])


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
  location: string;
  supplier: string;
  overview: string;
  commission: string;
  specialAmenity: string | null;
  bookingInstruction: string | null;
  startDate: Date | null;
  endDate: Date | null;
}