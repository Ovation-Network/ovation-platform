import type { HomepageTicker, CalendarTicker } from "@prisma/client";

export const TickerContainer = ({ tickers }: { tickers: (HomepageTicker | CalendarTicker)[] }) => {
  return (
    <div className="hwrap">
      <div className="hmove">
        {/* Loop through ticker items, placing each news / event in a div with className="hitem" */}
        {tickers.length === 0 && <div className="hitem">Nothing much going for today</div>}
      </div>
    </div>
  )
};