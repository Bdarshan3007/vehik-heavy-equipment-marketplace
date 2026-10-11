import { useState } from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Cpu,
  RotateCcw
} from "lucide-react";
export const AIRequirementParser = () => {
  const {
    setSelectedCategory,
    setCapacityFilter,
    setSelectedCorridor,
    showNotification,
    setActiveBookingListing,
    listings
  } = useMarketplace();
  const presets = [
    {
      label: "50T Crane at Sanand Phase II",
      prompt: "Need a 50 Ton all-terrain hydraulic mobile crane with certified rigger crew at Sanand Phase II auto-ancillary site for 4 days starting Monday.",
      parsed: {
        assetClass: "50-Ton Telescopic All-Terrain Mobile Crane",
        primaryDuty: "Heavy Lift & Press Erection",
        boomReach: "38m Main Boom + 9m Fly Jib",
        corridorHub: "Sanand Ind. Corridor (Phase-II)",
        deploymentHorizon: "4 Consecutive Days (8h Shift)",
        safetyProtocol: "Load Chart + Certified Riggers Included",
        capacityRangeTons: 50,
        estimatedShiftRate: 28500,
        matchedCount: 8,
        category: "cranes"
      }
    },
    {
      label: "Lowbed 60T Trailer JNPT to Sanand",
      prompt: "Need heavy lowbed 60-ton modular trailer to haul industrial stamping die from JNPT Port North Yard to Sanand auto plant within 48 hours.",
      parsed: {
        assetClass: "60-Ton Drop-Deck Modular Lowbed Trailer",
        primaryDuty: "ODC High-Value Cargo Transport",
        boomReach: "14-Axle Hydraulic Steerable Platform",
        corridorHub: "JNPT Navi Mumbai \u2192 Sanand Corridor",
        deploymentHorizon: "Single Transit Haul (2 Days)",
        safetyProtocol: "NHAI Heavy Corridor Transit Permit Active",
        capacityRangeTons: 60,
        estimatedShiftRate: 24e3,
        matchedCount: 6,
        category: "trailers"
      }
    },
    {
      label: "CAT 320D Excavator with Breaker 15 Days",
      prompt: "Require 20T to 22T heavy hydraulic crawler excavator equipped with heavy hydraulic rock breaker attachment at DFC Rail siding for 15 days.",
      parsed: {
        assetClass: "22-Ton Heavy Hydraulic Excavator + Rock Breaker",
        primaryDuty: "Basalt Rock Trenching & Foundation",
        boomReach: "6.72m Dig Depth \xB7 Montabert V1200 Breaker",
        corridorHub: "Ahmedabad - Sanand Belt (Rail Overbridge Siding)",
        deploymentHorizon: "15 Days Double-Shift (30 Shifts Total)",
        safetyProtocol: "Full Pilot Isolation & Mining Induction Verified",
        capacityRangeTons: 22,
        estimatedShiftRate: 31500,
        matchedCount: 11,
        category: "excavators"
      }
    },
    {
      label: "JCB 3DX Super 4WD Mundra Yard",
      prompt: "Need 4WD backhoe loader with trained operator for trenching and material clearing at Mundra Port coal terminal yard for 1 week.",
      parsed: {
        assetClass: "8-Ton Multipurpose Earthmover (4WD)",
        primaryDuty: "Utility Trenching & Yard Clearing",
        boomReach: "4.77m Max Reach \xB7 6-in-1 Front Bucket",
        corridorHub: "Mundra Port Maritime Siding",
        deploymentHorizon: "7 Consecutive Shifts",
        safetyProtocol: "Port CFS Pass & Class HGV Operator Included",
        capacityRangeTons: 10,
        estimatedShiftRate: 12500,
        matchedCount: 14,
        category: "backhoes"
      }
    }
  ];
  const [inputPrompt, setInputPrompt] = useState(presets[0].prompt);
  const [activePreset, setActivePreset] = useState(0);
  const [currentParsed, setCurrentParsed] = useState(presets[0].parsed);
  const [isParsing, setIsParsing] = useState(false);
  const handleSelectPreset = (index) => {
    setActivePreset(index);
    setInputPrompt(presets[index].prompt);
    setCurrentParsed(presets[index].parsed);
  };
  const handleCustomParse = () => {
    setIsParsing(true);
    setTimeout(() => {
      const lower = inputPrompt.toLowerCase();
      let cat = "cranes";
      let tons = 50;
      let duty = "Industrial General EPC Work";
      let reach = "Standard Working Envelope";
      let hub = "Sanand - Ahmedabad Corridor";
      let horizon = "3-5 Consecutive Shifts";
      let safety = "Third-Party Load Chart Verified";
      let shiftRate = 28500;
      if (lower.includes("trailer") || lower.includes("haul") || lower.includes("lowbed") || lower.includes("odc") || lower.includes("truck")) {
        cat = "trailers";
        tons = 60;
        duty = "Heavy Intermodal Haulage";
        reach = "Modular Axle Bed";
        shiftRate = 24e3;
      } else if (lower.includes("excavator") || lower.includes("breaker") || lower.includes("cat 320") || lower.includes("rock")) {
        cat = "excavators";
        tons = 22;
        duty = "Rock Trenching & Earthmoving";
        reach = "6.72m Dig Depth";
        shiftRate = 31500;
      } else if (lower.includes("jcb") || lower.includes("backhoe") || lower.includes("loader")) {
        cat = "backhoes";
        tons = 8;
        duty = "Civil Earthmoving & Utility";
        reach = "4.77m Dig Depth";
        shiftRate = 12500;
      } else if (lower.includes("crane") || lower.includes("lift") || lower.includes("erection")) {
        cat = "cranes";
        tons = 50;
        duty = "Heavy Lift & Plant Erection";
        reach = "38m Main Boom + 9m Jib";
        shiftRate = 28500;
      }
      if (lower.includes("mundra")) hub = "Mundra Port Maritime Siding";
      else if (lower.includes("jnpt") || lower.includes("mumbai")) hub = "JNPT Navi Mumbai Hub";
      else if (lower.includes("sanand")) hub = "Sanand Ind. Corridor (Phase-II)";
      else if (lower.includes("surat")) hub = "Surat Industrial Textile Belt";
      const tonMatch = lower.match(/(\d+)\s*(ton|tonne|t)/);
      if (tonMatch) {
        tons = parseInt(tonMatch[1], 10);
      }
      const daysMatch = lower.match(/(\d+)\s*(day|shift|week)/);
      if (daysMatch) {
        horizon = `${daysMatch[1]} ${daysMatch[2]}s Project Execution`;
      }
      const generated = {
        assetClass: `${tons}-Ton ${cat === "cranes" ? "All-Terrain Mobile Crane" : cat === "trailers" ? "Multi-Axle Lowbed Transporter" : cat === "excavators" ? "Heavy Hydraulic Excavator" : "Backhoe Loader"}`,
        primaryDuty: duty,
        boomReach: reach,
        corridorHub: hub,
        deploymentHorizon: horizon,
        safetyProtocol: safety,
        capacityRangeTons: tons,
        estimatedShiftRate: shiftRate,
        matchedCount: Math.floor(6 + Math.random() * 8),
        category: cat
      };
      setCurrentParsed(generated);
      setIsParsing(false);
      showNotification("Plain English requirement parsed into tender ledger!");
    }, 450);
  };
  const handleDeployInstantRFQ = () => {
    const matched = listings.find((l) => l.category === currentParsed.category) || listings[0];
    setSelectedCategory(currentParsed.category);
    setCapacityFilter(currentParsed.capacityRangeTons);
    setActiveBookingListing(matched);
    showNotification(`Rental booking ready for ${currentParsed.matchedCount} verified equipment options!`);
  };
  return <section id="ai-parser" className="py-10 px-4 sm:px-6 max-w-[1440px] mx-auto scroll-mt-20">
      <div className="bg-[#111F35] text-white border border-[#2C4A6F] rounded p-6 sm:p-9 shadow-lg">
        {
    /* Section Lead */
  }
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1E293B]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C66A20]" />
              <span className="text-[11px] font-mono tracking-widest text-[#ABC8F4] uppercase font-semibold">
                Smart AI Machine Finder
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Tell us what you need in <span className="italic font-normal text-[#C66A20]">plain words</span>.
            </h2>
            <p className="text-xs sm:text-sm text-[#ABC8F4] max-w-2xl mt-2 leading-relaxed">
              Don't know the exact technical specs? Just describe your job (e.g. "I need a crane in Sanand for 4 days to lift heavy factory equipment"). Our AI will instantly find the right machine size, capacity, and estimated price for you!
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center px-3 py-1.5 rounded bg-[#172A46] border border-[#2C4A6F] text-xs font-mono text-[#A7F3D0]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span>Instant AI Matching</span>
          </div>
        </div>

        {
    /* 2-Column Split: Prompt on Left, Extracted Ledger on Right */
  }
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {
    /* Left: Natural Language Input */
  }
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#ABC8F4] font-semibold">
                  Describe Your Requirement:
                </span>
                <span className="text-[11px] font-mono text-[#C66A20] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Assistant
                </span>
              </div>

              {
    /* Request Textarea Box */
  }
              <div className="relative">
                <textarea
    value={inputPrompt}
    onChange={(e) => setInputPrompt(e.target.value)}
    rows={4}
    className="w-full p-4 bg-[#0B132B] border border-[#2C4A6F] rounded text-sm sm:text-base font-serif italic text-white focus:outline-none focus:border-[#C66A20] leading-relaxed resize-none"
    placeholder="e.g. Need a 20-ton truck from Ahmedabad to Surat tomorrow with driver..."
  />
              </div>

              {
    /* Status metrics bar */
  }
              <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mt-2 px-1">
                <span className="text-[#A7F3D0] flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  Job Requirements Understood
                </span>
                <span>Ready to Match</span>
              </div>
            </div>

            {
    /* Presets / Templates */
  }
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#7987A2] mb-2 font-semibold">
                Or click an example to test:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {presets.map((preset, idx) => <button
    key={idx}
    onClick={() => handleSelectPreset(idx)}
    className={`text-left px-3 py-2 rounded text-xs font-mono transition-all border cursor-pointer ${activePreset === idx ? "bg-[#172A46] text-[#FF964A] border-[#C66A20]" : "bg-[#0F172A] text-[#CBD5E1] border-[#2C4A6F]/60 hover:border-[#ABC8F4]"}`}
  >
                    <div className="truncate font-semibold">{preset.label}</div>
                  </button>)}
              </div>
            </div>

            {
    /* Parse Custom Button */
  }
            <div>
              <button
    onClick={handleCustomParse}
    disabled={isParsing}
    className="w-full py-2.5 bg-[#172A46] hover:bg-[#213554] border border-[#2C4A6F] text-[#D6E3FF] text-xs font-mono font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
  >
                {isParsing ? <>
                    <RotateCcw className="w-3.5 h-3.5 animate-spin text-[#C66A20]" />
                    <span>Analyzing your request...</span>
                  </> : <>
                    <Cpu className="w-3.5 h-3.5 text-[#ABC8F4]" />
                    <span>Find Matching Machines with AI</span>
                  </>}
              </button>
            </div>
          </div>

          {
    /* Right: Extracted Specification Ledger */
  }
          <div className="lg:col-span-6">
            <div className="bg-[#FFFFFF] text-[#131B26] border border-[#D5DCE4] rounded p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E6EB]">
                <span className="text-xs font-mono uppercase font-bold tracking-wider text-[#535F70]">
                  Recommended Machine & Specs
                </span>
                <span className="text-[11px] font-mono text-[#1E6347] font-semibold flex items-center gap-1 bg-[#E8F2EC] px-2 py-0.5 rounded">
                  <CheckCircle2 className="w-3 h-3" />
                  READY TO RENT
                </span>
              </div>

              {
    /* Grid of parsed parameters */
  }
              {/* Grid of parsed parameters */}
              <div className="divide-y divide-[#E2E6EB] text-xs font-mono my-2">
                <div className="py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="text-[#75777E] uppercase text-[10px] sm:text-[11px]">Recommended Machine</span>
                  <span className="font-bold text-[#111F35] text-left sm:text-right">{currentParsed.assetClass}</span>
                </div>

                <div className="py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="text-[#75777E] uppercase text-[10px] sm:text-[11px]">Primary Use</span>
                  <span className="font-bold text-[#C66A20] text-left sm:text-right">{currentParsed.primaryDuty}</span>
                </div>

                <div className="py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="text-[#75777E] uppercase text-[10px] sm:text-[11px]">Capacity & Reach</span>
                  <span className="font-semibold text-[#111F35] text-left sm:text-right">{currentParsed.boomReach}</span>
                </div>

                <div className="py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="text-[#75777E] uppercase text-[10px] sm:text-[11px]">Location Hub</span>
                  <span className="font-semibold text-[#111F35] text-left sm:text-right">{currentParsed.corridorHub}</span>
                </div>

                <div className="py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="text-[#75777E] uppercase text-[10px] sm:text-[11px]">Estimated Duration</span>
                  <span className="font-semibold text-[#111F35] text-left sm:text-right">{currentParsed.deploymentHorizon}</span>
                </div>

                <div className="py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="text-[#75777E] uppercase text-[10px] sm:text-[11px]">Safety & Crew</span>
                  <span className="font-semibold text-[#1E6347] text-left sm:text-right">{currentParsed.safetyProtocol}</span>
                </div>
              </div>

              {/* Footer action */}
              <div className="pt-4 border-t border-[#E2E6EB]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#535F70] mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#1E6347]" />
                  <span><strong>{currentParsed.matchedCount} Verified Machines</strong> available nearby</span>
                </div>

                <button
                  onClick={handleDeployInstantRFQ}
                  className="w-full py-3 px-3 bg-[#C66A20] hover:bg-[#D97706] text-white text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer text-center"
                >
                  <span>Book or Request Quote ({currentParsed.matchedCount} Owners)</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
