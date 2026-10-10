import React, { useState, useEffect, useMemo } from 'react';
import {
  Gavel,
  Calendar,
  DollarSign,
  Search,
  Bell,
  Clock,
  RefreshCw,
  Plus,
  FileText,
  User,
  Shield,
  Download,
  Send,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  X,
  ChevronRight,
  MapPin,
  Building,
  Volume2,
  Check,
  Edit,
  Filter,
  Smartphone,
  Info,
  Sliders,
  Printer
} from 'lucide-react';

const INITIAL_CASES = [
  {
    id: 'CASE-2024-001',
    cnr: 'DLHC010023452024',
    title: 'Ramesh Sharma vs. State & Anr.',
    petitioner: 'Ramesh Sharma',
    respondent: 'State of NCT Delhi & Anr.',
    clientName: 'Ramesh Sharma',
    clientPhone: '+91 98765 43210',
    clientEmail: 'ramesh.sharma@example.com',
    caseType: 'Criminal Misc. Main',
    courtName: 'Delhi High Court',
    bench: 'Courtroom 14 (Hon\'ble Mr. Justice A. K. Singh)',
    status: 'Arguments',
    stage: 'Final Hearing',
    ndoh: '2026-10-08',
    lastDate: '2026-09-15',
    totalFee: 150000,
    paidAmount: 90000,
    urgency: 'high',
    prepNotes: 'Prepare arguments on bail conditions precedent. Cite Supreme Court 2023 precedence on Section 438.',
    hearings: [
      { date: '2026-09-15', summary: 'Arguments heard in part. State Counsel requested time to file reply.', judge: 'Hon\'ble Mr. Justice A. K. Singh', orderPdf: 'Order_15Sep2026.pdf' },
      { date: '2026-08-10', summary: 'Notice issued to respondents. Status report called from IO.', judge: 'Hon\'ble Mr. Justice A. K. Singh', orderPdf: 'Order_10Aug2026.pdf' }
    ],
    payments: [
      { id: 'PAY-101', date: '2026-07-01', amount: 50000, mode: 'UPI / GooglePay', notes: 'Initial Retainer Fee' },
      { id: 'PAY-102', date: '2026-08-11', amount: 40000, mode: 'Bank Transfer (NEFT)', notes: 'Second Installment post reply' }
    ],
    alarms: {
      t7Days: true,
      t1DayEvening: true,
      t0DayMorning: true,
      alarmTime: '07:30'
    }
  },
  {
    id: 'CASE-2024-002',
    cnr: 'DLSK020088122023',
    title: 'Apex Infra Solutions Ltd. vs. Vertex Construction',
    petitioner: 'Apex Infra Solutions Ltd.',
    respondent: 'Vertex Construction Infrastructure Pvt. Ltd.',
    clientName: 'Apex Infra (Sanjay Gupta)',
    clientPhone: '+91 98112 99887',
    clientEmail: 'sanjay@apexinfra.com',
    caseType: 'Commercial Suit (Arbitration)',
    courtName: 'Saket District Court, Delhi',
    bench: 'Courtroom 302 (Commercial Court)',
    status: 'Evidence Phase',
    stage: 'Cross Examination',
    ndoh: '2026-10-06',
    lastDate: '2026-09-02',
    totalFee: 250000,
    paidAmount: 250000,
    urgency: 'critical',
    prepNotes: 'Cross-examine Witness PW-1 on invoice discrepancies dated 12 March 2022.',
    hearings: [
      { date: '2026-09-02', summary: 'PW-1 chief examination recorded. Adjourned for cross-examination.', judge: 'Sh. R. K. Grover, DHJS', orderPdf: 'Order_02Sep2026.pdf' }
    ],
    payments: [
      { id: 'PAY-201', date: '2026-05-10', amount: 100000, mode: 'Cheque (#40012)', notes: 'Advance Retainer' },
      { id: 'PAY-202', date: '2026-09-03', amount: 150000, mode: 'RTGS', notes: 'Full Settlement before Evidence' }
    ],
    alarms: {
      t7Days: true,
      t1DayEvening: true,
      t0DayMorning: true,
      alarmTime: '07:00'
    }
  },
  {
    id: 'CASE-2024-003',
    cnr: 'DLCT030011922024',
    title: 'Smt. Priya Verma vs. Amit Verma',
    petitioner: 'Smt. Priya Verma',
    respondent: 'Amit Verma',
    clientName: 'Priya Verma',
    clientPhone: '+91 97170 12345',
    clientEmail: 'priya.v@gmail.com',
    caseType: 'Matrimonial / Maintenance u/s 125',
    courtName: 'Tis Hazari Family Court',
    bench: 'Courtroom 105 (Principal Judge)',
    status: 'Mediation / Settlement',
    stage: 'Counseling',
    ndoh: '2026-10-14',
    lastDate: '2026-08-20',
    totalFee: 80000,
    paidAmount: 30000,
    urgency: 'medium',
    prepNotes: 'Obtain updated bank account statements and salary slips of respondent for interim maintenance argument.',
    hearings: [
      { date: '2026-08-20', summary: 'Referred to Delhi High Court Mediation Centre for amicable solution.', judge: 'Smt. Neena Bansal Krishna', orderPdf: 'Order_20Aug2026.pdf' }
    ],
    payments: [
      { id: 'PAY-301', date: '2026-06-15', amount: 30000, mode: 'Cash', notes: 'First Token Payment' }
    ],
    alarms: {
      t7Days: true,
      t1DayEvening: false,
      t0DayMorning: true,
      alarmTime: '08:00'
    }
  },
  {
    id: 'CASE-2024-004',
    cnr: 'MHOS010099412024',
    title: 'Sunil Mehta vs. Municipal Corporation',
    petitioner: 'Sunil Mehta',
    respondent: 'BMC Municipal Corporation',
    clientName: 'Sunil Mehta',
    clientPhone: '+91 99201 44556',
    clientEmail: 'sunil.mehta@mumbai.org',
    caseType: 'Writ Petition (Civil)',
    courtName: 'Bombay High Court',
    bench: 'Division Bench - Courtroom 04',
    status: 'Pleadings Complete',
    stage: 'Admission Hearing',
    ndoh: '2026-10-20',
    lastDate: '2026-09-10',
    totalFee: 200000,
    paidAmount: 80000,
    urgency: 'low',
    prepNotes: 'Check stay extension application and file rejoinder to BMC affidavit.',
    hearings: [
      { date: '2026-09-10', summary: 'Ad-interim stay granted till next hearing date.', judge: 'Bench II', orderPdf: 'Order_10Sep2026.pdf' }
    ],
    payments: [
      { id: 'PAY-401', date: '2026-08-01', amount: 80000, mode: 'UPI', notes: 'Part Payment' }
    ],
    alarms: {
      t7Days: true,
      t1DayEvening: true,
      t0DayMorning: true,
      alarmTime: '07:00'
    }
  }
];

export default function App() {
  const [cases, setCases] = useState(() => {
    const local = localStorage.getItem('advocate_cases');
    return local ? JSON.parse(local) : INITIAL_CASES;
  });

  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, cases, alarms, ledger, sync, settings
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedCase, setSelectedCase] = useState(null);

  // Modals state
  const [showAddCaseModal, setShowAddCaseModal] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState(null);

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncLogs, setSyncLogs] = useState([]);
  const [syncCNRInput, setSyncCNRInput] = useState('');

  // Audio / Alarm simulation alert toast state
  const [activeAlarmAlert, setActiveAlarmAlert] = useState(null);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('advocate_cases', JSON.stringify(cases));
  }, [cases]);

  // Set default selected case on initial render
  useEffect(() => {
    if (cases.length > 0 && !selectedCase) {
      setSelectedCase(cases[0]);
    }
  }, [cases]);

  const stats = useMemo(() => {
    const totalCases = cases.length;
    let totalFee = 0;
    let totalPaid = 0;
    let urgentTodayCount = 0;
    let upcomingThisWeek = 0;

    const todayStr = '2026-10-06'; // Synchronized mock date context
    const nextWeekDate = new Date('2026-10-06');
    nextWeekDate.setDate(nextWeekDate.getDate() + 7);

    cases.forEach(c => {
      totalFee += Number(c.totalFee || 0);
      totalPaid += Number(c.paidAmount || 0);

      if (c.ndoh === todayStr) {
        urgentTodayCount++;
      }

      const caseNdoh = new Date(c.ndoh);
      if (caseNdoh >= new Date('2026-10-06') && caseNdoh <= nextWeekDate) {
        upcomingThisWeek++;
      }
    });

    const pendingBalance = totalFee - totalPaid;

    return {
      totalCases,
      totalFee,
      totalPaid,
      pendingBalance,
      urgentTodayCount,
      upcomingThisWeek
    };
  }, [cases]);

  // Filtered cases
  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      const matchQuery =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.cnr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.courtName.toLowerCase().includes(searchQuery.toLowerCase());

      if (statusFilter === 'ALL') return matchQuery;
      if (statusFilter === 'PENDING_PAYMENT') return matchQuery && c.totalFee > c.paidAmount;
      if (statusFilter === 'URGENT') return matchQuery && c.urgency === 'critical';
      return matchQuery && c.status === statusFilter;
    });
  }, [cases, searchQuery, statusFilter]);

  const handleAddPayment = (paymentData) => {
    const updatedCases = cases.map(c => {
      if (c.id === paymentData.caseId) {
        const newPaidAmount = Number(c.paidAmount) + Number(paymentData.amount);
        const newPaymentEntry = {
          id: `PAY-${Date.now().toString().slice(-4)}`,
          date: new Date().toISOString().split('T')[0],
          amount: Number(paymentData.amount),
          mode: paymentData.mode,
          notes: paymentData.notes
        };
        const updated = {
          ...c,
          paidAmount: newPaidAmount,
          payments: [newPaymentEntry, ...(c.payments || [])]
        };
        if (selectedCase && selectedCase.id === c.id) {
          setSelectedCase(updated);
        }
        return updated;
      }
      return c;
    });
    setCases(updatedCases);
    setShowAddPaymentModal(false);
  };

  const handleUpdateAlarmSettings = (alarmData) => {
    const updatedCases = cases.map(c => {
      if (c.id === alarmData.caseId) {
        const updated = {
          ...c,
          alarms: {
            t7Days: alarmData.t7Days,
            t1DayEvening: alarmData.t1DayEvening,
            t0DayMorning: alarmData.t0DayMorning,
            alarmTime: alarmData.alarmTime
          }
        };
        if (selectedCase && selectedCase.id === c.id) {
          setSelectedCase(updated);
        }
        return updated;
      }
      return c;
    });
    setCases(updatedCases);
    setShowAlarmModal(false);
  };

  const handleSimulateSync = (cnrToSync = null) => {
    setIsSyncing(true);
    const targetCNR = cnrToSync || syncCNRInput || (selectedCase ? selectedCase.cnr : 'DLHC010023452024');

    setSyncLogs([
      `[${new Date().toLocaleTimeString()}] Initiating eCourts API Handshake...`,
      `[${new Date().toLocaleTimeString()}] Querying National Judicial Data Grid (NJDG)...`,
      `[${new Date().toLocaleTimeString()}] Accessing High Court / District Court Causelist Server for CNR: ${targetCNR}...`
    ]);

    setTimeout(() => {
      setSyncLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Success: Found matched record in Saket/High Court Cause List!`,
        `[${new Date().toLocaleTimeString()}] Parsing latest Daily Order PDF & Next Hearing Date (NDOH)...`,
        `[${new Date().toLocaleTimeString()}] Updating Case Records, Alarms & History Timeline...`
      ]);

      // Update matching case or create a mock update
      const updatedCases = cases.map(c => {
        if (c.cnr === targetCNR || c.id === selectedCase?.id) {
          const nextDate = '2026-11-02';
          const newHearing = {
            date: '2026-10-06',
            summary: 'Auto-Synced from eCourts: Arguments heard. Hon\'ble Court requested written submissions before next date.',
            judge: c.bench || 'Hon\'ble Presiding Judge',
            orderPdf: `Daily_Order_${targetCNR}_Oct2026.pdf`
          };
          const updated = {
            ...c,
            lastDate: '2026-10-06',
            ndoh: nextDate,
            status: 'Written Submissions',
            hearings: [newHearing, ...c.hearings]
          };
          if (selectedCase && selectedCase.id === c.id) {
            setSelectedCase(updated);
          }
          return updated;
        }
        return c;
      });

      setCases(updatedCases);
      setIsSyncing(false);
    }, 2200);
  };

  const triggerAlarmSoundTest = (caseItem) => {
    setActiveAlarmAlert({
      caseTitle: caseItem.title,
      court: caseItem.courtName,
      time: caseItem.alarms?.alarmTime || '07:30 AM',
      date: caseItem.ndoh,
      bench: caseItem.bench
    });

    // Web Audio API beep sound for realistic courtroom alarm simulator
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch (e) {
      console.log('Audio context warning:', e);
    }
  };

  const sendWhatsAppReminder = (caseObj) => {
    const due = caseObj.totalFee - caseObj.paidAmount;
    const text = `Namaste ${caseObj.clientName} ji, This is a gentle reminder from Advocate Chambers regarding your case "${caseObj.title}" (${caseObj.cnr}). Next Hearing Date: ${caseObj.ndoh} at ${caseObj.courtName}. Pending Fees Balance: ₹${due.toLocaleString('en-IN')}. Please settle at your earliest convenience. Thank you!`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${caseObj.clientPhone.replace(/[^0-9]/g, '')}?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Alarm Audio Alert Simulation Banner */}
      {activeAlarmAlert && (
        <div className="bg-rose-600 text-white px-4 py-3 shadow-xl flex items-center justify-between animate-bounce border-b border-rose-400">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-rose-800 rounded-full animate-pulse">
              <Volume2 className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <p className="font-extrabold text-sm tracking-wide uppercase text-rose-100">
                🚨 COURT HEARING ALARM TRIGGERED (SUNWAI ALERT)
              </p>
              <p className="text-xs font-medium text-rose-100">
                <strong>{activeAlarmAlert.caseTitle}</strong> | {activeAlarmAlert.court} ({activeAlarmAlert.bench}) | Date: {activeAlarmAlert.date}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveAlarmAlert(null)}
              className="bg-white text-rose-700 font-bold px-3 py-1 text-xs rounded-md hover:bg-rose-100 transition shadow"
            >
              Snooze / Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main App Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between hidden md:flex">
          <div>
            {/* Header Brand */}
            <div className="p-5 border-b border-slate-800 flex items-center space-x-3">
              <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg border border-indigo-500/30">
                <Gavel className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-slate-100 tracking-tight leading-tight">AdvocatePro</h1>
                <p className="text-xs text-indigo-400 font-medium">Chamber Practice Suite</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="p-3 space-y-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  activeTab === 'dashboard'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('cases')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  activeTab === 'cases'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="flex-1 text-left">Case Directory</span>
                <span className="bg-slate-800 text-indigo-300 text-xs px-2 py-0.5 rounded-full border border-slate-700">
                  {cases.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('alarms')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  activeTab === 'alarms'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span className="flex-1 text-left">Sunwai Alarms</span>
                {stats.urgentTodayCount > 0 && (
                  <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs px-2 py-0.5 rounded-full font-bold">
                    {stats.urgentTodayCount} Today
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('ledger')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  activeTab === 'ledger'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Len-Den Ledger</span>
              </button>

              <button
                onClick={() => setActiveTab('sync')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  activeTab === 'sync'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                <span>eCourts Auto-Sync</span>
              </button>
            </nav>
          </div>

          {/* Advocate Quick Profile */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow">
                ADV
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">Adv. Rajeshwar Sharma</p>
                <p className="text-[10px] text-slate-400 truncate">High Court & District Courts</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-slate-950 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Bar */}
          <header className="h-16 bg-slate-900/80 backdrop-blur border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center space-x-4 flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search Case ID, CNR Number, Client Name, Court..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAddCaseModal(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center space-x-1.5 transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>New Case</span>
              </button>

              <button
                onClick={() => handleSimulateSync()}
                title="Quick Sync with eCourts"
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition flex items-center justify-center"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-indigo-400' : ''}`} />
              </button>
            </div>
          </header>

          {/* Dynamic Tab Body */}
          <div className="p-6 space-y-6 flex-1">
            {/* 1. DASHBOARD VIEW */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card 1: Total Active Cases */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:border-slate-700 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">Total Cases</span>
                      <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                        <FileText className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-2xl font-bold text-slate-100">{stats.totalCases}</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Active under legal representation</p>
                    </div>
                  </div>

                  {/* Card 2: Urgent Hearings Today */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:border-slate-700 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">Hearings This Week</span>
                      <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                        <Calendar className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-2xl font-bold text-amber-400">{stats.upcomingThisWeek}</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {stats.urgentTodayCount} Scheduled for Today
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Total Collected Fees */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:border-slate-700 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">Fees Received</span>
                      <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-2xl font-bold text-emerald-400">
                        ₹{stats.totalPaid.toLocaleString('en-IN')}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Cleared chamber fees</p>
                    </div>
                  </div>

                  {/* Card 4: Total Pending Payments */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:border-slate-700 transition">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">Pending Dues (Baki)</span>
                      <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-2xl font-bold text-rose-400">
                        ₹{stats.pendingBalance.toLocaleString('en-IN')}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Outstanding client balance</p>
                    </div>
                  </div>
                </div>

                {/* Dashboard Grid: Left Urgent Cases + Right Hearing Schedule */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column: Immediate Priority Cases */}
                  <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <h2 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-amber-400" />
                          <span>Upcoming Court Dates & Action Preparation</span>
                        </h2>
                        <p className="text-xs text-slate-400">Prioritized by Next Hearing Date (NDOH)</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('cases')}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
                      >
                        <span>View All</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {cases.slice(0, 3).map(c => {
                        const due = c.totalFee - c.paidAmount;
                        return (
                          <div
                            key={c.id}
                            className="bg-slate-950 border border-slate-800 rounded-lg p-4 hover:border-indigo-500/50 transition flex flex-col sm:flex-row justify-between sm:items-center space-y-3 sm:space-y-0"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="bg-indigo-950 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-800">
                                  {c.cnr}
                                </span>
                                <span className="text-xs text-slate-400">{c.courtName}</span>
                              </div>
                              <h4 className="font-semibold text-sm text-slate-100">{c.title}</h4>
                              <p className="text-xs text-slate-400 italic">
                                📝 Prep: {c.prepNotes}
                              </p>
                            </div>

                            <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                              <div className="text-left sm:text-right">
                                <span className="text-[10px] uppercase text-slate-400 block font-medium">
                                  Next Date (NDOH)
                                </span>
                                <span className="text-xs font-bold text-amber-400">{c.ndoh}</span>
                              </div>
                              <div className="mt-1 flex items-center space-x-2">
                                <button
                                  onClick={() => {
                                    setSelectedCase(c);
                                    setActiveTab('cases');
                                  }}
                                  className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
                                >
                                  Open Case
                                </button>
                                <button
                                  onClick={() => triggerAlarmSoundTest(c)}
                                  className="text-[11px] bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800 px-2.5 py-1 rounded flex items-center space-x-1"
                                >
                                  <Bell className="w-3 h-3" />
                                  <span>Test Alert</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Quick eCourts Portal Sync Widget */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                    <div className="border-b border-slate-800 pb-3">
                      <h2 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
                        <RefreshCw className="w-4 h-4 text-indigo-400" />
                        <span>eCourts Live Scraper Engine</span>
                      </h2>
                      <p className="text-xs text-slate-400">Fetch daily orders & cause list</p>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-medium text-slate-300 block">
                        Enter CNR Number for Instant Sync:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. DLHC010023452024"
                        value={syncCNRInput}
                        onChange={e => setSyncCNRInput(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono"
                      />

                      <button
                        onClick={() => handleSimulateSync()}
                        disabled={isSyncing}
                        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold py-2 rounded-lg text-xs flex items-center justify-center space-x-2 transition shadow-md"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                        <span>{isSyncing ? 'Scraping eCourts...' : 'Sync Case Records Now'}</span>
                      </button>

                      {/* Sync Log Monitor */}
                      {syncLogs.length > 0 && (
                        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[10px] text-emerald-400 space-y-1 max-h-40 overflow-y-auto">
                          {syncLogs.map((log, index) => (
                            <p key={index} className="leading-snug">{log}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. CASE DIRECTORY & DETAIL VIEW */}
            {activeTab === 'cases' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 space-y-4">
                  {/* Filters Bar */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-1 overflow-x-auto py-1">
                      {['ALL', 'Arguments', 'Evidence Phase', 'PENDING_PAYMENT'].map(filter => (
                        <button
                          key={filter}
                          onClick={() => setStatusFilter(filter)}
                          className={`text-[11px] px-2.5 py-1 rounded-md border font-medium whitespace-nowrap transition ${
                            statusFilter === filter
                              ? 'bg-indigo-600 text-white border-indigo-500'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                          }`}
                        >
                          {filter === 'ALL' ? 'All Cases' : filter === 'PENDING_PAYMENT' ? 'Pending Fees' : filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Case List Cards */}
                  <div className="space-y-3 max-h-[calc(100vh-210px)] overflow-y-auto pr-1">
                    {filteredCases.map(c => {
                      const isSelected = selectedCase?.id === c.id;
                      const pendingAmt = c.totalFee - c.paidAmount;

                      return (
                        <div
                          key={c.id}
                          onClick={() => setSelectedCase(c)}
                          className={`p-4 rounded-xl border cursor-pointer transition ${
                            isSelected
                              ? 'bg-slate-900 border-indigo-500 ring-1 ring-indigo-500/50 shadow-md'
                              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono bg-slate-950 text-indigo-400 px-2 py-0.5 rounded border border-slate-800">
                              {c.cnr}
                            </span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                              c.status === 'Arguments' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                            }`}>
                              {c.status}
                            </span>
                          </div>

                          <h3 className="font-semibold text-slate-100 text-sm leading-snug line-clamp-1">{c.title}</h3>
                          <p className="text-xs text-slate-400 mt-1 flex items-center space-x-1">
                            <Building className="w-3.5 h-3.5 text-slate-500" />
                            <span className="truncate">{c.courtName}</span>
                          </p>

                          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                            <span className="text-slate-400">
                              NDOH: <strong className="text-amber-400">{c.ndoh}</strong>
                            </span>
                            <span className={`font-semibold ${pendingAmt > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                              {pendingAmt > 0 ? `₹${pendingAmt.toLocaleString('en-IN')} Due` : 'Paid Full'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="lg:col-span-7">
                  {selectedCase ? (
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
                      {/* Case Header */}
                      <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono bg-indigo-950 text-indigo-300 px-2.5 py-1 rounded border border-indigo-800">
                              CNR: {selectedCase.cnr}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">
                              Type: {selectedCase.caseType}
                            </span>
                          </div>
                          <h2 className="text-xl font-bold text-slate-100 mt-2">{selectedCase.title}</h2>
                          <p className="text-xs text-slate-400 mt-1 flex items-center space-x-1">
                            <MapPin className="w-3.5 h-3.5 text-rose-400" />
                            <span>{selectedCase.courtName} — {selectedCase.bench}</span>
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleSimulateSync(selectedCase.cnr)}
                            className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                            <span>eCourts Sync</span>
                          </button>
                        </div>
                      </div>

                      {/* Party & Client Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Petitioner vs Respondent</p>
                          <p className="text-xs text-slate-200 mt-1">
                            <strong className="text-indigo-400">P:</strong> {selectedCase.petitioner}
                          </p>
                          <p className="text-xs text-slate-200 mt-0.5">
                            <strong className="text-rose-400">R:</strong> {selectedCase.respondent}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Representing Client</p>
                          <p className="text-xs text-slate-200 font-semibold mt-1">{selectedCase.clientName}</p>
                          <p className="text-xs text-slate-400">{selectedCase.clientPhone} | {selectedCase.clientEmail}</p>
                        </div>
                      </div>

                      {/* Preparation & Strategy Notes */}
                      <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-500/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center space-x-1">
                            <FileText className="w-3.5 h-3.5" />
                            <span>Action Preparation Notes for Next Sunwai</span>
                          </h4>
                          <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded">
                            NDOH: {selectedCase.ndoh}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">{selectedCase.prepNotes}</p>
                      </div>

                      {/* Hearing History Timeline */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-indigo-400" />
                          <span>Hearing Order History & Court Orders</span>
                        </h3>

                        <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
                          {selectedCase.hearings.map((h, i) => (
                            <div key={i} className="relative pl-8 space-y-1">
                              <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-indigo-500 border-2 border-slate-900" />
                              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-xs space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-indigo-300">{h.date}</span>
                                  <span className="text-slate-400 text-[11px]">{h.judge}</span>
                                </div>
                                <p className="text-slate-300">{h.summary}</p>
                                <div className="pt-1 flex items-center justify-between">
                                  <a
                                    href={`#download-${h.orderPdf}`}
                                    onClick={e => { e.preventDefault(); alert(`Simulated Download of ${h.orderPdf}`); }}
                                    className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 underline"
                                  >
                                    <Download className="w-3 h-3" />
                                    <span>Download Daily Order PDF</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Financial Quick Glance for Case */}
                      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-400">Total Agreed Fee: <strong className="text-slate-200">₹{selectedCase.totalFee.toLocaleString('en-IN')}</strong></p>
                          <p className="text-xs text-slate-400">Paid: <strong className="text-emerald-400">₹{selectedCase.paidAmount.toLocaleString('en-IN')}</strong> | Balance: <strong className="text-rose-400">₹{(selectedCase.totalFee - selectedCase.paidAmount).toLocaleString('en-IN')}</strong></p>
                        </div>
                        <button
                          onClick={() => setShowAddPaymentModal(true)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                        >
                          + Add Payment Entry
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-400">
                      Select a case from the directory list to view complete history and settings.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. SUNWAI ALARMS & NOTIFICATION SIMULATOR */}
            {activeTab === 'alarms' && (
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                        <Bell className="w-5 h-5 text-rose-400" />
                        <span>Sunwai Miss Na Ho - Smart Court Alarm Manager</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Configure 3-Stage Hearing Alerts (T-7 Briefing, T-1 Evening Reminder, T-0 Morning Loud Alarm)
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cases.map(c => (
                      <div key={c.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-indigo-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                              {c.cnr}
                            </span>
                            <h4 className="font-bold text-sm text-slate-100 mt-1">{c.title}</h4>
                            <p className="text-xs text-slate-400">{c.courtName}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-slate-500 block uppercase font-bold">Next Date</span>
                            <span className="text-xs font-bold text-amber-400">{c.ndoh}</span>
                          </div>
                        </div>

                        {/* Configured Triggers */}
                        <div className="bg-slate-900 p-3 rounded-lg text-xs space-y-2 border border-slate-800/80">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-300">📅 T-7 Days Preparation Alert:</span>
                            <span className={`font-semibold ${c.alarms?.t7Days ? 'text-emerald-400' : 'text-slate-500'}`}>
                              {c.alarms?.t7Days ? 'ENABLED' : 'DISABLED'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-300">🌙 T-1 Evening Client WhatsApp:</span>
                            <span className={`font-semibold ${c.alarms?.t1DayEvening ? 'text-emerald-400' : 'text-slate-500'}`}>
                              {c.alarms?.t1DayEvening ? 'ENABLED' : 'DISABLED'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-300">⏰ T-0 Morning Court Alarm:</span>
                            <span className="font-bold text-rose-400">
                              {c.alarms?.alarmTime || '07:30 AM'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-end space-x-2 pt-1">
                          <button
                            onClick={() => triggerAlarmSoundTest(c)}
                            className="bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1 transition"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Simulate Alarm Audio</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. FINANCIAL LEDGER (LEN-DEN TRACKER) */}
            {activeTab === 'ledger' && (
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
                    <div>
                      <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                        <DollarSign className="w-5 h-5 text-emerald-400" />
                        <span>Len-Den Chamber Financial Ledger & Fee Tracker</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Total Agreed Fee, Received Amount & Pending Balances
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAddPaymentModal(true)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center space-x-2 transition self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Record New Payment</span>
                    </button>
                  </div>

                  {/* Ledger Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider bg-slate-950/50">
                          <th className="p-3">Case Title / CNR</th>
                          <th className="p-3">Client Name</th>
                          <th className="p-3">Total Agreed Fee</th>
                          <th className="p-3">Paid Amount</th>
                          <th className="p-3">Pending Balance</th>
                          <th className="p-3 text-right">Actions & Invoice</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-xs">
                        {cases.map(c => {
                          const pending = c.totalFee - c.paidAmount;
                          return (
                            <tr key={c.id} className="hover:bg-slate-800/40 transition">
                              <td className="p-3">
                                <p className="font-semibold text-slate-100">{c.title}</p>
                                <p className="text-[10px] text-indigo-400 font-mono">{c.cnr}</p>
                              </td>
                              <td className="p-3 text-slate-300">
                                {c.clientName}
                              </td>
                              <td className="p-3 font-semibold text-slate-200">
                                ₹{c.totalFee.toLocaleString('en-IN')}
                              </td>
                              <td className="p-3 font-semibold text-emerald-400">
                                ₹{c.paidAmount.toLocaleString('en-IN')}
                              </td>
                              <td className="p-3 font-bold">
                                {pending > 0 ? (
                                  <span className="text-rose-400 bg-rose-950/40 border border-rose-800 px-2 py-0.5 rounded">
                                    ₹{pending.toLocaleString('en-IN')} Baki
                                  </span>
                                ) : (
                                  <span className="text-emerald-400 bg-emerald-950/40 border border-emerald-800 px-2 py-0.5 rounded">
                                    Full Settlement
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-right space-x-2">
                                {pending > 0 && (
                                  <button
                                    onClick={() => sendWhatsAppReminder(c)}
                                    className="bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-[11px] px-2.5 py-1 rounded transition inline-flex items-center space-x-1"
                                  >
                                    <Send className="w-3 h-3" />
                                    <span>WhatsApp Reminder</span>
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    setActiveInvoice(c);
                                    setShowInvoiceModal(true);
                                  }}
                                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] px-2.5 py-1 rounded transition inline-flex items-center space-x-1"
                                >
                                  <FileText className="w-3 h-3 text-indigo-400" />
                                  <span>Receipt</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 5. eCOURTS AUTO-SYNC SIMULATOR TAB */}
            {activeTab === 'sync' && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                    <RefreshCw className="w-5 h-5 text-indigo-400" />
                    <span>High Court & District Court Auto-Scraper Dashboard</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Connects with eCourts Services API & NJDG Portal using CNR Number
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-semibold text-slate-300">Target CNR Number:</label>
                      <input
                        type="text"
                        placeholder="Enter 16 Digit Legal CNR Number (e.g. DLHC010023452024)"
                        value={syncCNRInput}
                        onChange={e => setSyncCNRInput(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 font-mono"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={() => handleSimulateSync()}
                        disabled={isSyncing}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg text-xs flex items-center justify-center space-x-2 transition"
                      >
                        <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                        <span>{isSyncing ? 'Scraping live court logs...' : 'Start eCourts Sync'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Sync Terminal Box */}
                  <div className="mt-4 bg-black/80 p-4 rounded-lg font-mono text-xs text-emerald-400 border border-slate-800 space-y-2 min-h-48">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-500 text-[10px]">
                      <span>eCourts API Terminal Console v2.4</span>
                      <span>STATUS: {isSyncing ? 'ACTIVE SCRAPING' : 'READY'}</span>
                    </div>

                    {syncLogs.length === 0 ? (
                      <p className="text-slate-600 italic">Click 'Start eCourts Sync' to trigger auto-fetch process...</p>
                    ) : (
                      syncLogs.map((log, i) => (
                        <p key={i} className="leading-normal">{log}</p>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {}
      {/* MODAL 1: ADD NEW CASE */}
      {showAddCaseModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">Add New Case Profile</h3>
              <button onClick={() => setShowAddCaseModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const newCase = {
                  id: `CASE-2024-00${cases.length + 1}`,
                  cnr: fd.get('cnr') || 'DLHC010099992024',
                  title: fd.get('title'),
                  petitioner: fd.get('petitioner'),
                  respondent: fd.get('respondent'),
                  clientName: fd.get('clientName'),
                  clientPhone: fd.get('clientPhone'),
                  clientEmail: fd.get('clientEmail'),
                  caseType: fd.get('caseType'),
                  courtName: fd.get('courtName'),
                  bench: fd.get('bench'),
                  status: 'Notice Stage',
                  ndoh: fd.get('ndoh'),
                  totalFee: Number(fd.get('totalFee') || 100000),
                  paidAmount: Number(fd.get('initialPayment') || 0),
                  prepNotes: fd.get('prepNotes') || 'Initial document verification & vakalatnama filing.',
                  hearings: [],
                  payments: fd.get('initialPayment') > 0 ? [{
                    id: `PAY-${Date.now().toString().slice(-4)}`,
                    date: new Date().toISOString().split('T')[0],
                    amount: Number(fd.get('initialPayment')),
                    mode: 'Initial Advance',
                    notes: 'Advance retainer'
                  }] : [],
                  alarms: { t7Days: true, t1DayEvening: true, t0DayMorning: true, alarmTime: '07:30' }
                };
                setCases([newCase, ...cases]);
                setSelectedCase(newCase);
                setShowAddCaseModal(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-300 mb-1 font-medium">CNR Number (eCourts Unique ID)</label>
                <input required name="cnr" placeholder="e.g. DLHC010023452024" className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100 font-mono" />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Case Title (Petitioner vs Respondent)</label>
                <input required name="title" placeholder="e.g. Vijay Kumar vs. State" className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Client Name</label>
                  <input required name="clientName" placeholder="Client Name" className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100" />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Client Phone (WhatsApp)</label>
                  <input required name="clientPhone" placeholder="+91 9876543210" className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Court Name</label>
                  <input required name="courtName" placeholder="Delhi High Court" className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100" />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Next Hearing Date (NDOH)</label>
                  <input required type="date" name="ndoh" defaultValue="2026-10-25" className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Total Agreed Fee (₹)</label>
                  <input required type="number" name="totalFee" placeholder="100000" className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100" />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Initial Payment Received (₹)</label>
                  <input type="number" name="initialPayment" placeholder="25000" className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100" />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowAddCaseModal(false)} className="bg-slate-800 text-slate-300 px-4 py-2 rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded">
                  Create Case Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD PAYMENT ENTRY */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">Record Fee Payment Entry</h3>
              <button onClick={() => setShowAddPaymentModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                const fd = new FormData(e.target);
                handleAddPayment({
                  caseId: fd.get('caseId'),
                  amount: fd.get('amount'),
                  mode: fd.get('mode'),
                  notes: fd.get('notes')
                });
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Select Case</label>
                <select name="caseId" defaultValue={selectedCase?.id} className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100">
                  {cases.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.title} (Pending: ₹{(c.totalFee - c.paidAmount).toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Amount Received (₹)</label>
                <input required type="number" name="amount" placeholder="e.g. 25000" className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100" />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Payment Mode</label>
                <select name="mode" className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100">
                  <option value="UPI / GPay / PhonePe">UPI / GPay / PhonePe</option>
                  <option value="Bank Transfer (NEFT/RTGS)">Bank Transfer (NEFT/RTGS)</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Notes / Receipt Ref</label>
                <input name="notes" placeholder="Part fee received for argument stage" className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100" />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowAddPaymentModal(false)} className="bg-slate-800 text-slate-300 px-4 py-2 rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2 rounded">
                  Save Payment Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: INVOICE / RECEIPT GENERATOR */}
      {showInvoiceModal && activeInvoice && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
                <Printer className="w-4 h-4 text-indigo-400" />
                <span>Fee Payment Receipt</span>
              </h3>
              <button onClick={() => setShowInvoiceModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Print Styled Receipt Content */}
            <div className="bg-white text-slate-900 p-5 rounded-lg space-y-4 text-xs font-sans">
              <div className="text-center border-b pb-3">
                <h4 className="font-bold text-base text-slate-900 uppercase">Advocate Chambers</h4>
                <p className="text-[10px] text-slate-600">High Court & District Legal Representation Services</p>
                <p className="text-[10px] text-slate-500 mt-1">Receipt Date: {new Date().toLocaleDateString()}</p>
              </div>

              <div className="space-y-1">
                <p><strong>Client Name:</strong> {activeInvoice.clientName}</p>
                <p><strong>Case Matter:</strong> {activeInvoice.title}</p>
                <p><strong>CNR Number:</strong> {activeInvoice.cnr}</p>
                <p><strong>Court:</strong> {activeInvoice.courtName}</p>
              </div>

              <table className="w-full text-left border-collapse border border-slate-300 text-[11px] my-2">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300">
                    <th className="p-1.5">Description</th>
                    <th className="p-1.5 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-1.5 border-b border-slate-200">Total Agreed Legal Retainer</td>
                    <td className="p-1.5 border-b border-slate-200 text-right">₹{activeInvoice.totalFee.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 border-b border-slate-200">Total Fees Received</td>
                    <td className="p-1.5 border-b border-slate-200 text-right text-emerald-700 font-bold">₹{activeInvoice.paidAmount.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-1.5 font-bold">Outstanding Balance (Baki)</td>
                    <td className="p-1.5 text-right font-bold text-rose-700">₹{(activeInvoice.totalFee - activeInvoice.paidAmount).toLocaleString('en-IN')}</td>
                  </tr>
                </tbody>
              </table>

              <div className="pt-2 text-[10px] text-slate-500 text-center border-t">
                Computer Generated Fee Receipt. Thank you!
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => {
                  alert('Receipt printing simulated!');
                  setShowInvoiceModal(false);
                }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded text-xs flex items-center space-x-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}