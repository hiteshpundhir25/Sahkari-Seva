import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Building2, 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  FileText,
  HeartHandshake
} from 'lucide-react';

export const InvoicePage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();

  if (!bookingId) return null;

  const booking = dataService.getBookingById(bookingId);
  if (!booking) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Invoice not found.</p>
        <Link to="/customer/bookings"><Button size="sm">Back</Button></Link>
      </div>
    );
  }

  const invoice = booking.invoice || {
    invoice_number: `INV-COOP-${new Date().getFullYear()}-001`,
    subtotal: booking.final_amount,
    platform_fee: Number((booking.final_amount * 0.05).toFixed(2)),
    cooperative_share: Number((booking.final_amount * 0.10).toFixed(2)),
    worker_amount: Number((booking.final_amount * 0.85).toFixed(2)),
    tax: 0.00,
    total_amount: booking.final_amount,
    generated_at: booking.updated_at
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Action Bar (Hidden during print) */}
      <div className="flex items-center justify-between print:hidden">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Booking
        </button>

        <Button
          size="sm"
          onClick={handlePrint}
          leftIcon={<Printer className="w-4 h-4" />}
        >
          Print / Save PDF Invoice
        </Button>
      </div>

      {/* Printable Invoice Paper */}
      <Card className="p-8 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-lg space-y-8 print:bg-white print:text-slate-900 print:border-0 print:shadow-none">
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b-2 border-slate-900 dark:border-slate-700 print:border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-coop-700 text-white flex items-center justify-center font-bold">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-black font-display text-slate-900 dark:text-white print:text-slate-900 tracking-tight">
                {booking.cooperative?.name || 'Delhi Shramik Sahakari Sangh'}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 print:text-slate-500 font-medium">
                Reg No: {booking.cooperative?.registration_number || 'DL/COOP/2021/8842'} • Multi-Trade Labour Cooperative
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 print:text-slate-400">
                {booking.cooperative?.address}, {booking.cooperative?.city} - {booking.cooperative?.pincode}
              </p>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-coop-800 dark:text-coop-300 bg-coop-50 dark:bg-coop-950/60 print:bg-coop-50 px-2.5 py-1 rounded-md border border-coop-200 dark:border-coop-800 print:border-coop-200">
              Tax Invoice & Receipt
            </span>
            <p className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100 print:text-slate-900 mt-1.5">
              {invoice.invoice_number}
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 print:text-slate-400">
              Date: {new Date(invoice.generated_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Customer & Worker Meta Grid */}
        <div className="grid grid-cols-2 gap-6 text-xs">
          <div>
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
              Billed To (Customer):
            </span>
            <p className="font-bold text-slate-900 dark:text-white print:text-slate-900 text-sm">{booking.customer?.full_name}</p>
            <p className="text-slate-600 dark:text-slate-300 print:text-slate-600 mt-0.5">{booking.address}</p>
            <p className="text-slate-600 dark:text-slate-300 print:text-slate-600">{booking.city}, {booking.state} - {booking.pincode}</p>
            <p className="text-slate-500 dark:text-slate-400 print:text-slate-500 mt-0.5">Phone: {booking.customer?.phone}</p>
          </div>

          <div className="text-right sm:text-left">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
              Service Executed By (Worker):
            </span>
            <p className="font-bold text-slate-900 dark:text-white print:text-slate-900 text-sm">{booking.worker?.profile?.full_name}</p>
            <p className="text-slate-600 dark:text-slate-300 print:text-slate-600 mt-0.5">Trade: {booking.worker?.skill_category} Professional</p>
            <p className="text-slate-600 dark:text-slate-300 print:text-slate-600">Worker Code: {booking.worker?.worker_code}</p>
            <p className="text-emerald-700 dark:text-emerald-400 print:text-emerald-700 font-semibold mt-0.5 flex items-center justify-end sm:justify-start gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Cooperative Certified
            </p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 dark:border-slate-700 print:border-slate-200 bg-slate-50 dark:bg-slate-800/60 print:bg-slate-50 text-slate-700 dark:text-slate-300 print:text-slate-700">
                <th className="py-2.5 px-3 font-bold font-display">Service Description</th>
                <th className="py-2.5 px-3 font-bold font-display">Job Code</th>
                <th className="py-2.5 px-3 font-bold font-display text-right">Standard Tariff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 print:divide-slate-100">
              <tr>
                <td className="py-3 px-3">
                  <p className="font-bold text-slate-900 dark:text-white print:text-slate-900">{booking.service_category?.name} Service</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 print:text-slate-500 mt-0.5">{booking.service_description}</p>
                </td>
                <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-300 print:text-slate-600">{booking.booking_code}</td>
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white print:text-slate-900 text-right">₹{invoice.subtotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Cooperative Transparent Wage Breakdown Box */}
        <div className="p-4 rounded-2xl bg-coop-50/60 dark:bg-coop-950/40 print:bg-coop-50/60 border border-coop-200 dark:border-coop-800 print:border-coop-200 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-coop-900 dark:text-coop-300 print:text-coop-900">
            <HeartHandshake className="w-4 h-4 text-coop-700 dark:text-coop-400" /> Transparent Cooperative Fund Distribution
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1">
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 print:bg-white border border-coop-200 dark:border-coop-800 print:border-coop-200">
              <span className="text-slate-500 dark:text-slate-400 print:text-slate-500 block">Direct Worker Share (85%)</span>
              <span className="font-bold text-slate-900 dark:text-white print:text-slate-900 text-xs">₹{invoice.worker_amount.toFixed(2)}</span>
            </div>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 print:bg-white border border-coop-200 dark:border-coop-800 print:border-coop-200">
              <span className="text-slate-500 dark:text-slate-400 print:text-slate-500 block">Cooperative Welfare Pool (10%)</span>
              <span className="font-bold text-saffron-700 dark:text-saffron-400 print:text-saffron-700 text-xs">₹{invoice.cooperative_share.toFixed(2)}</span>
            </div>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 print:bg-white border border-coop-200 dark:border-coop-800 print:border-coop-200">
              <span className="text-slate-500 dark:text-slate-400 print:text-slate-500 block">Platform Maintenance (5%)</span>
              <span className="font-bold text-slate-900 dark:text-white print:text-slate-900 text-xs">₹{invoice.platform_fee.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Totals & Signature */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-4 border-t-2 border-slate-200 dark:border-slate-700 print:border-slate-200">
          <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 print:text-slate-500">
            <p className="font-bold text-slate-800 dark:text-slate-200 print:text-slate-800">Payment Status: PAID IN FULL</p>
            <p>Transaction Mode: Demo Sandbox / UPI</p>
            <p>GST Exemption under Labour Cooperative Federation Rules</p>
          </div>

          <div className="text-right space-y-1 w-full sm:w-60">
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 print:text-slate-600">
              <span>Subtotal:</span>
              <span>₹{invoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 print:text-slate-600">
              <span>Taxes (0%):</span>
              <span>₹0.00</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white print:text-slate-900 pt-1 border-t border-slate-200 dark:border-slate-700 print:border-slate-200">
              <span>Total Paid:</span>
              <span className="text-coop-700 dark:text-coop-400">₹{invoice.total_amount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Seal */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 print:border-slate-100 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 print:text-slate-400">
          <p>Thank you for supporting registered labour cooperatives and fair wages!</p>
          <div className="flex items-center gap-1 text-coop-800 dark:text-coop-300 print:text-coop-800 font-bold">
            <CheckCircle2 className="w-4 h-4 text-coop-600 dark:text-coop-400" /> Authenticated Digital Receipt
          </div>
        </div>
      </Card>
    </div>
  );
};
