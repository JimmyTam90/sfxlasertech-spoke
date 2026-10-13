'use client';

import { useState } from 'react';
import { SELECTOR } from '@/lib/manifest';
import AffiliateLink from './AffiliateLink';

export default function Selector() {
  const [jobId, setJobId] = useState(SELECTOR.jobs[0].id);
  const [optionId, setOptionId] = useState(null);

  const job = SELECTOR.jobs.find((j) => j.id === jobId);
  const option = job.options.find((o) => o.id === optionId) || null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <fieldset>
          <legend className="text-sm font-semibold text-white">1. What do you need to do?</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {SELECTOR.jobs.map((j) => (
              <label
                key={j.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm ${
                  jobId === j.id ? 'border-brand-light bg-slate-800 text-white' : 'border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                <input
                  type="radio"
                  name="job"
                  value={j.id}
                  checked={jobId === j.id}
                  onChange={() => {
                    setJobId(j.id);
                    setOptionId(null);
                  }}
                  className="h-4 w-4 accent-sky-500"
                />
                {j.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-white">2. How demanding is the workload?</legend>
          <div className="mt-3 grid gap-2">
            {job.options.map((o) => (
              <label
                key={o.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm ${
                  optionId === o.id ? 'border-brand-light bg-slate-800 text-white' : 'border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                <input
                  type="radio"
                  name="workload"
                  value={o.id}
                  checked={optionId === o.id}
                  onChange={() => setOptionId(o.id)}
                  className="h-4 w-4 accent-sky-500"
                />
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div aria-live="polite" className="rounded-xl border border-slate-700 bg-slate-900 p-6">
        {option ? (
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-light">Suggested starting point</p>
            <h3 className="text-xl font-semibold text-white">{option.result.title}</h3>
            <p className="text-sm leading-relaxed text-slate-300">{option.result.detail}</p>
            <p className="text-xs text-slate-400">
              A starting point only. Material, thickness, duty cycle and your site’s power supply decide the right machine. Confirm specifications with the merchant.
            </p>
            <AffiliateLink destination={option.result.destination} placement="selector_result" className="btn-primary">
              {option.result.cta} →
            </AffiliateLink>
          </div>
        ) : (
          <p className="text-sm text-slate-400">Choose a job and a workload to see where to start looking.</p>
        )}
      </div>
    </div>
  );
}
