import { useMarketplace } from "../../context/MarketplaceContext";
import {
  X,
  FileCheck,
  CheckCircle2,
  ShieldCheck,
  Printer
} from "lucide-react";
import { getMachineImageUrl } from "../MachineImage";
export const InspectionAuditModal = () => {
  const { activeAuditListing, setActiveAuditListing, auditReports, showNotification } = useMarketplace();
  if (!activeAuditListing) return null;
  const auditReport = auditReports[activeAuditListing.id] || {
    listingId: activeAuditListing.id,
    registrationCode: activeAuditListing.registrationCode,
    auditId: `AUDIT-2026-${activeAuditListing.registrationCode.replace("VK-", "")}`,
    auditDate: activeAuditListing.lastAuditDate || "18 September 2026",
    auditorName: "Er. Sandeep B. Wagh (Lead Heavy Equipment Surveyor)",
    auditorAgency: "Bureau Veritas & ARAI Authorized Inspection Cell",
    overallScore: 98.5,
    loadLimiterStatus: "ACTIVE & CALIBRATED (PAT Hirschmann LMI)",
    hydraulicPSI: "315 Bar Peak Relief Valve Pressure",
    wireRopeCondition: "Certified Grade-A (Zero Core Degradation)",
    boomWearDeflection: "1.2mm Lateral Deflection (Tolerance: 3.5mm)",
    chassisTorsion: "Within 0.05\xB0 tolerance under 42T load test",
    operatorLicenseVerified: true,
    rtoFitnessValidUntil: "15 March 2028",
    checklist: [
      { id: "c1", category: "Hydraulics & Pressure", name: "Main Hydraulic Pump Pressure Relief Bypass", result: "PASS", tolerance: "315 Bar \xB1 5", reading: "314.2 Bar", certifiedBy: "BV Senior Engineer" },
      { id: "c2", category: "Hydraulics & Pressure", name: "Outrigger Cylinder Hydraulic Holding Pilot Valves", result: "PASS", tolerance: "\u0394P < 2 Bar/30m", reading: "0.2 Bar drift", certifiedBy: "BV Senior Engineer" },
      { id: "c3", category: "Safety & Limiter Systems", name: "Anti-Two-Block (A2B) Limit Cutoff Sensor", result: "PASS", tolerance: "Instant shutoff", reading: "0.12s response", certifiedBy: "ARAI Inspector" },
      { id: "c4", category: "Safety & Limiter Systems", name: "Safe Load Indicator (SLI) Multi-Angle Calibration", result: "PASS", tolerance: "\xB1 2.0% accuracy", reading: "+0.3% error", certifiedBy: "ARAI Inspector" },
      { id: "c5", category: "Wire Ropes & Rigging", name: "Hoist Wire Rope Non-Destructive Magnetic Flux Test", result: "PASS", tolerance: "Zero broken wires", reading: "100% integrity", certifiedBy: "Chartered Tech" },
      { id: "c6", category: "Structural & Chassis", name: "Telescopic Boom Section Overlap Wear Pads", result: "PASS", tolerance: "Wear < 2.0mm", reading: "0.7mm measured", certifiedBy: "Chartered Tech" },
      { id: "c7", category: "Regulatory & Operator Credential", name: "Crane Master RTO Heavy Heavy Vehicle & Rigger Cards", result: "PASS", tolerance: "Govt RTO Valid", reading: "Valid till 2031", certifiedBy: "RTO Gujarat" }
    ]
  };
  const handlePrint = () => {
    showNotification("Digital audit manifest ready for print / export");
    window.print();
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs select-none">
      <div className="bg-[#FFFFFF] border border-[#D5DCE4] rounded-2xl w-full max-w-4xl max-h-[92dvh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#111F35] text-white flex items-center justify-between border-b border-[#2C4A6F]">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1E6347] flex items-center justify-center text-white shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h2 className="text-sm sm:text-base font-serif font-bold text-white line-clamp-1">
                  Equipment Safety & Inspection Certificate
                </h2>
                <span className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded bg-[#172A46] text-[#ABC8F4] border border-[#2C4A6F] shrink-0">
                  {auditReport.auditId}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-mono text-[#CBD5E1] line-clamp-1">
                Machine: {activeAuditListing.title} ({activeAuditListing.registrationCode})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
    onClick={handlePrint}
    className="p-2 rounded bg-[#172A46] hover:bg-[#213554] text-[#CBD5E1] hover:text-white transition-colors cursor-pointer"
    title="Print Certificate"
  >
              <Printer className="w-4 h-4" />
            </button>
            <button
    onClick={() => setActiveAuditListing(null)}
    className="p-2 rounded text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
  >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {
    /* Modal Body */
  }
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          {
    /* Top Score Banner with Machine Photo */
  }
          <div className="bg-[#F7F6F2] border border-[#D5DCE4] rounded p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-24 h-20 rounded overflow-hidden bg-[#1E293B] shrink-0 border border-[#D5DCE4]">
                <img
    src={getMachineImageUrl(activeAuditListing.id, activeAuditListing.category)}
    alt={activeAuditListing.title}
    className="w-full h-full object-cover"
  />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1E6347]" />
                  <span className="text-xs font-mono font-bold uppercase text-[#1E6347]">
                    Passed All Safety Checks · Ready For Work
                  </span>
                </div>
                <div className="text-sm font-semibold text-[#111F35]">
                  {auditReport.auditorAgency}
                </div>
                <div className="text-xs font-mono text-[#535F70] mt-0.5">
                  Certified Inspector: {auditReport.auditorName} on {auditReport.auditDate}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#FFFFFF] px-4 py-2.5 rounded border border-[#E2E6EB] self-start md:self-auto shrink-0">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#75777E] block">Safety & Health Score</span>
                <span className="text-2xl font-mono font-bold text-[#1E6347] tabular-nums">
                  {auditReport.overallScore}%
                </span>
              </div>
              <ShieldCheck className="w-8 h-8 text-[#1E6347]" />
            </div>
          </div>

          {
    /* Diagnostic Variables Summary */
  }
          <div>
            <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-[#535F70] mb-3">
              Key Mechanical & Safety Systems
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="bg-[#FFFFFF] border border-[#E2E6EB] p-3 rounded">
                <div className="text-[10px] font-mono uppercase text-[#75777E]">Load Limiter / SLI System</div>
                <div className="text-xs font-mono font-bold text-[#111F35] mt-1">{auditReport.loadLimiterStatus}</div>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E2E6EB] p-3 rounded">
                <div className="text-[10px] font-mono uppercase text-[#75777E]">Main Hydraulic Relief Valve</div>
                <div className="text-xs font-mono font-bold text-[#111F35] mt-1">{auditReport.hydraulicPSI}</div>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E2E6EB] p-3 rounded">
                <div className="text-[10px] font-mono uppercase text-[#75777E]">Wire Rope Magnetic Flux Integrity</div>
                <div className="text-xs font-mono font-bold text-[#111F35] mt-1">{auditReport.wireRopeCondition}</div>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E2E6EB] p-3 rounded">
                <div className="text-[10px] font-mono uppercase text-[#75777E]">Boom Lateral Deflection Tolerance</div>
                <div className="text-xs font-mono font-bold text-[#111F35] mt-1">{auditReport.boomWearDeflection}</div>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E2E6EB] p-3 rounded">
                <div className="text-[10px] font-mono uppercase text-[#75777E]">Govt. RTO Heavy Vehicle Fitness</div>
                <div className="text-xs font-mono font-bold text-[#1E6347] mt-1">Valid Until: {auditReport.rtoFitnessValidUntil}</div>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E2E6EB] p-3 rounded">
                <div className="text-[10px] font-mono uppercase text-[#75777E]">Operator Safety Credentials</div>
                <div className="text-xs font-mono font-bold text-[#1E6347] mt-1">Directly Verified on RTO Parivahan</div>
              </div>
            </div>
          </div>

          {
    /* Categorized Test Checklist */
  }
          <div>
            <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-[#535F70] mb-3">
              Itemized Physical Point Verifications (48-Point Standard)
            </h3>
            <div className="border border-[#E2E6EB] rounded-xl overflow-hidden">
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full min-w-[540px] text-left text-xs font-mono">
                  <thead className="bg-[#F7F6F2] text-[#535F70] uppercase text-[10px] border-b border-[#E2E6EB]">
                    <tr>
                      <th className="p-3">Section & Point Description</th>
                      <th className="p-3">Result</th>
                      <th className="p-3 hidden sm:table-cell">Permissible Tolerance</th>
                      <th className="p-3">Sensor Reading</th>
                      <th className="p-3 hidden md:table-cell">Sign-off Authority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E6EB]">
                    {auditReport.checklist.map((item) => <tr key={item.id} className="hover:bg-[#FBFBF9]">
                        <td className="p-3">
                          <div className="font-semibold text-[#111F35]">{item.name}</div>
                          <div className="text-[10px] text-[#75777E]">{item.category}</div>
                        </td>
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1 text-[#1E6347] font-bold bg-[#E8F2EC] px-2 py-0.5 rounded text-[11px]">
                            <CheckCircle2 className="w-3 h-3" />
                            {item.result}
                          </span>
                        </td>
                        <td className="p-3 hidden sm:table-cell text-[#535F70]">
                          {item.tolerance}
                        </td>
                        <td className="p-3 font-semibold text-[#111F35]">
                          {item.reading}
                        </td>
                        <td className="p-3 hidden md:table-cell text-[#75777E]">
                          {item.certifiedBy}
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#F7F6F2] border-t border-[#D5DCE4] flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-mono">
          <span className="text-[#535F70] text-center sm:text-left text-[11px] sm:text-xs">Audit Hash: 0x9f4a...882e · Digitally Signed via National Plant Registry</span>
          <button
            onClick={() => setActiveAuditListing(null)}
            className="w-full sm:w-auto px-4 py-2 bg-[#111F35] hover:bg-[#172A46] text-white rounded-lg uppercase font-semibold cursor-pointer text-center"
          >
            Close Audit Manifest
          </button>
        </div>
      </div>
    </div>;
};
