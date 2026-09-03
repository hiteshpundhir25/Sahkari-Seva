import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Building2, ShieldCheck, Mail, Phone, MapPin, Award } from 'lucide-react';
import { dataService } from '../../services/dataService';

export const AboutPage: React.FC = () => {
  const cooperatives = dataService.getCooperatives();

  return (
    <div className="space-y-12 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="coop">ABOUT SAHAKARI SEVA</Badge>
        <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white">
          Federation of Registered Labour Cooperative Societies
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Founded under the principle of democratic mutual aid, we connect Indian households directly with skilled, verified, and insured craftspeople.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-3 bg-coop-50/30 dark:bg-coop-950/30 border-coop-200 dark:border-coop-800">
          <h3 className="font-bold text-base text-coop-900 dark:text-coop-300 font-display flex items-center gap-2">
            <Award className="w-5 h-5 text-coop-600 dark:text-coop-400" /> Our Mission
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            To eliminate exploitative intermediaries from the gig economy by providing a cooperative-owned digital platform that guarantees 85% direct wage retention and comprehensive social security for every skilled technician.
          </p>
        </Card>

        <Card className="p-6 space-y-3 bg-saffron-50/30 dark:bg-saffron-950/30 border-saffron-200 dark:border-saffron-800">
          <h3 className="font-bold text-base text-saffron-900 dark:text-saffron-300 font-display flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-saffron-600 dark:text-saffron-400" /> Our Guarantee
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Every professional dispatched through this platform is backed by official cooperative membership, verified government trade qualifications, police clearances, and group public liability cover.
          </p>
        </Card>
      </div>

      {/* Affiliated Cooperatives */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
          Affiliated Cooperative Federations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cooperatives.map((c) => (
            <Card key={c.id} className="p-4 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-coop-600 flex items-center justify-center text-white font-bold shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate font-display">{c.name}</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">Reg: {c.registration_number}</p>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-3">{c.description}</p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 text-[10px] text-slate-500 dark:text-slate-400">
                <p className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3 h-3 text-coop-600 dark:text-coop-400 shrink-0" /> {c.city}, {c.state} ({c.pincode})
                </p>
                <p className="flex items-center gap-1.5 truncate">
                  <Phone className="w-3 h-3 text-coop-600 dark:text-coop-400 shrink-0" /> {c.phone}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
