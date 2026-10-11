import { useState } from "react";
import { useMarketplace } from "../../context/MarketplaceContext";
import { X, Calculator, ArrowRight } from "lucide-react";
export const YardCalculatorModal = () => {
  const { isYardCalcOpen, setIsYardCalcOpen, setIsRegisterFleetOpen } = useMarketplace();
  const [fleetType, setFleetType] = useState("crane");
  const [fleetCount, setFleetCount] = useState(3);
  const [currentUtilizationPercent, setCurrentUtilizationPercent] = useState(45);
  const [targetUtilizationPercent, setTargetUtilizationPercent] = useState(85);
  if (!isYardCalcOpen) return null;
  const rates = {
    crane: { shiftRate: 28500, label: "50T All-Terrain Mobile Crane" },
    trailer: { shiftRate: 24e3, label: "Multi-Axle Heavy Lowbed Trailer" },
    excavator: { shiftRate: 21200, label: "20T-22T Heavy Hydraulic Excavator" },
    tipper: { shiftRate: 15600, label: "35T Heavy Mining Tipper" }
  };
  const selectedRate = rates[fleetType].shiftRate;
  const daysInMonth = 26;
  const currentDays = Math.round(currentUtilizationPercent / 100 * daysInMonth);
  const targetDays = Math.round(targetUtilizationPercent / 100 * daysInMonth);
  const addedDaysPerMachine = Math.max(0, targetDays - currentDays);
  const currentMonthlyRevenue = fleetCount * currentDays * selectedRate;
  const projectedMonthlyRevenue = fleetCount * targetDays * selectedRate;
  const incrementalMonthlyGain = projectedMonthlyRevenue - currentMonthlyRevenue;
  const incrementalAnnualGain = incrementalMonthlyGain * 12;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs select-none">
      <div className="bg-[#FFFFFF] border border-[#D5DCE4] rounded-2xl w-full max-w-2xl max-h-[92dvh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#111F35] text-white flex items-center justify-between border-b border-[#2C4A6F]">
          <div className="flex items-center gap-2.5">
            <Calculator className="w-5 h-5 text-[#C66A20] shrink-0" />
            <h2 className="text-sm sm:text-base font-serif font-bold">
              Fleet Owner Earnings Calculator
            </h2>
          </div>
          <button
            onClick={() => setIsYardCalcOpen(false)}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 sm:space-y-6 no-scrollbar">
          <p className="text-xs text-[#535F70] leading-relaxed">
            Find out how much extra money you can earn each month by renting out your idle machinery to verified builders and contractors on VEHIK.
          </p>

          {
    /* Machine Type Selection */
  }
          <div>
            <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-2">
              Select Your Equipment Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
    { id: "crane", label: "Mobile Cranes" },
    { id: "trailer", label: "Heavy Trailers" },
    { id: "excavator", label: "Excavators" },
    { id: "tipper", label: "Mining Tippers" }
  ].map((item) => <button
    key={item.id}
    onClick={() => setFleetType(item.id)}
    className={`py-2 px-3 text-xs font-mono rounded border transition-colors cursor-pointer ${fleetType === item.id ? "bg-[#111F35] text-white border-[#111F35] font-bold" : "bg-[#F7F6F2] text-[#535F70] border-[#D5DCE4] hover:border-[#111F35]"}`}
  >
                  {item.label}
                </button>)}
            </div>
          </div>

          {
    /* Fleet Count Input */
  }
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-mono uppercase text-[#535F70] font-bold">
                  How Many Machines Do You Own?
                </label>
                <span className="text-xs font-mono font-bold text-[#111F35]">{fleetCount} Machines</span>
              </div>
              <input
    type="range"
    min="1"
    max="25"
    value={fleetCount}
    onChange={(e) => setFleetCount(Number(e.target.value))}
    className="w-full h-2 bg-[#D5DCE4] rounded appearance-none cursor-pointer accent-[#C66A20]"
  />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-mono uppercase text-[#535F70] font-bold">
                  Target Days Rented Per Month
                </label>
                <span className="text-xs font-mono font-bold text-[#1E6347]">{targetDays} Days / Month</span>
              </div>
              <input
    type="range"
    min="50"
    max="95"
    step="5"
    value={targetUtilizationPercent}
    onChange={(e) => setTargetUtilizationPercent(Number(e.target.value))}
    className="w-full h-2 bg-[#D5DCE4] rounded appearance-none cursor-pointer accent-[#1E6347]"
  />
            </div>
          </div>

          {
    /* Yield Projections Display Card */
  }
          <div className="bg-[#111F35] text-white p-5 rounded border border-[#2C4A6F] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2C4A6F]">
              <span className="text-xs font-mono text-[#ABC8F4]">Estimated Extra Income Per Year:</span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-[#FF964A]">
                +₹{(incrementalAnnualGain / 1e5).toFixed(2)} Lakhs / Year
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono pt-1">
              <div>
                <span className="text-[#94A3B8] text-[10px] uppercase block">Extra Monthly Income</span>
                <span className="text-base font-bold text-white">₹{(incrementalMonthlyGain / 1e5).toFixed(2)} Lakhs</span>
              </div>
              <div>
                <span className="text-[#94A3B8] text-[10px] uppercase block">Additional Working Days</span>
                <span className="text-base font-bold text-[#10B981]">+{addedDaysPerMachine * fleetCount} Shifts / Mo</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[#94A3B8] text-[10px] uppercase block">Payment Security</span>
                <span className="text-base font-bold text-[#38BDF8]">100% Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#F7F6F2] border-t border-[#D5DCE4] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2">
          <button
            onClick={() => setIsYardCalcOpen(false)}
            className="px-4 py-2.5 sm:py-2 border border-[#D5DCE4] text-xs font-mono uppercase rounded-lg text-[#535F70] hover:text-[#111F35] cursor-pointer text-center font-semibold"
          >
            Close
          </button>
          <button
            onClick={() => {
              setIsYardCalcOpen(false);
              setIsRegisterFleetOpen(true);
            }}
            className="px-5 py-2.5 sm:py-2 bg-[#C66A20] hover:bg-[#D97706] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
          >
            <span>List Equipment Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>;
};
