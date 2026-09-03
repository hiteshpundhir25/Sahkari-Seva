import React, { useState } from 'react';
import { dataService } from '../../services/dataService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  Layers, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Edit2,
  DollarSign
} from 'lucide-react';
import { ServiceCategory } from '../../types';

export const AdminServicesPage: React.FC = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>(dataService.getCategories());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleStartEdit = (cat: ServiceCategory) => {
    setEditingId(cat.id);
    setEditPrice(cat.base_price);
  };

  const handleSavePrice = (catId: string) => {
    const list = dataService.getCategories();
    const idx = list.findIndex(c => c.id === catId);
    if (idx !== -1) {
      list[idx].base_price = Number(editPrice);
      localStorage.setItem('sahakari_categories_v1', JSON.stringify(list));
      setCategories([...list]);
      setEditingId(null);
      setSuccessMsg('Cooperative standard tariff rate updated successfully.');
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <Badge variant="coop" size="sm">FAIR WAGE TARIFF REGULATION</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
          Standard Cooperative Service Tariffs
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Base pricing is democratically determined by the cooperative trade guild board, protecting worker earnings against predatory undercutting.
        </p>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => (
          <Card key={cat.id} className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-coop-50 dark:bg-coop-950/60 text-coop-700 dark:text-coop-400 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5 text-coop-600 dark:text-coop-400" />
              </div>
              {cat.emergency_available && (
                <Badge variant="emergency" size="sm" dot>24/7 Priority</Badge>
              )}
            </div>

            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white font-display">
                {cat.name} <span className="text-xs font-normal text-slate-400 dark:text-slate-500">({cat.name_hi})</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {cat.description}
              </p>
            </div>

            {/* Price Edit Area */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Standard Base Tariff</span>
                {editingId === cat.id ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(Number(e.target.value))}
                      className="w-20 px-2 py-1 text-xs border border-slate-200 dark:border-slate-700 rounded-md font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                    <Button size="sm" onClick={() => handleSavePrice(cat.id)}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <span className="text-base font-extrabold text-coop-700 dark:text-coop-400 font-display">
                    ₹{cat.base_price}
                  </span>
                )}
              </div>

              {editingId !== cat.id && (
                <button
                  onClick={() => handleStartEdit(cat)}
                  className="text-slate-400 hover:text-coop-600 dark:hover:text-coop-400 p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors"
                  title="Edit Tariff"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
