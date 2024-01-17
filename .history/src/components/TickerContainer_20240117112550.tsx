import type { HomepageTicker, CalendarTicker } from "@prisma/client";

export const TickerContainer = ({ tickers }: { tickers: (HomepageTicker | CalendarTicker)[] }) => {
  const news = [
    {
      string: 'TRAVEL NEWS (USA) | THE CDC EXPANDS ITS AIRPORT SURVEILLANCE PROGRAM',
      url: 'https://www.travelmarketreport.com/Destinations/articles/The-CDC-Expands-Its-Airport-Surveillance-Program',
    },
    {
      string: 'TRAVEL NEWS (USA) | AMTRAK AWARDED NEARLY $10 BILLION FOR NORTHEAST CORRIDOR IMPROVEMENTS',
      url: 'https://media.amtrak.com/2023/11/amtrak-awarded-federal-funds-for-12-projects-of-national-significance-totaling-nearly-10b-across-americas-busiest-rail-corridor/',
    },
    {
      string: 'TRAVEL NEWS (MEXICO - USA) | AEROMEXICO PLANS US ROUTE EXPANSION',
      url: 'https://www.travelweekly.com/Travel-News/Airline-News/Aeromexico-plans-big-US-route-expansion',
    },
    {
      string: 'TRAVEL NEWS (USA) | US PASSPORT RENEWAL WAIT TIME DROPS; NOW 8 TO 11 WEEKS',
      url: 'https://travel.state.gov/content/travel/en/News/passports/passport-processing-updates.html',
    },
    {
      string: "TRAVEL NEWS (TSA PreCheck) | FOUR AIRLINES ADDED TO TSA PRECHECK PROGRAM",
      url: 'https://www.travelpulse.com/news/airlines-airports/tsa-precheck-adds-four-new-participating-airlines',
    },
    {
      string: 'TRAVEL NEWS (USA) | AUGUST US AIR PASSENGER TRIPS HIGHEST SINCE PANDEMIC',
      url: 'https://www.businesstravelnews.com/Transportation/Air/ARC-August-Air-Trips-Highest-Since-Pandemic',
    },
  ];
  
  return (
    <div className="hwrap">
      <div className="hmove">
        {/* Loop through ticker items, placing each news / event in a div with className="hitem" */}
        {news.length === 0 && <div className="hitem">Nothing much going for today</div>}
      </div>
    </div>
  )
};