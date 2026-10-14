import Link from 'next/link';
import AffiliateLink from '@/components/AffiliateLink';
import Card from '@/components/Card';
import Selector from '@/components/Selector';
import { CATEGORIES, COLLECTIONS, MODELS, APPLICATIONS, FAQ } from '@/lib/manifest';
import { SITE } from '@/lib/config';

const MERCHANT_STATED = [
  { label: 'Certifications listed', value: 'CE, FDA, ISO9001, UKCA, SGS, RoHS' },
  { label: 'US after-sales', value: 'Two service centers (merchant statement)' },
  { label: 'Shipping', value: 'Free shipping advertised; terms on merchant site' },
  { label: 'Stock', value: 'Some listings are marked “US Stock”' },
];

function SectionHeading({ id, eyebrow, title, children }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-light">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      {children && <p className="mt-3 text-slate-300">{children}</p>}
    </div>
  );
}

export default function HomePage() {
  const heroModel = MODELS[0];

  return (
    <>
      {/* Hero */}
      <section className="bg-blueprint border-b border-slate-800">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr,0.9fr] lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-light">
              Laser equipment for US workshops
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Find the right industrial laser for the job in front of you
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-300">
              {SITE.brandName} organizes SFX Laser Tech’s cleaning, welding, marking and cutting
              machines by application. Browse a category or use the selector, then continue to the
              merchant to confirm specifications, pricing and availability.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AffiliateLink
                destination={{ kind: 'category', id: 'all-laser-equipment' }}
                placement="hero"
                className="btn-primary"
              >
                Explore Equipment →
              </AffiliateLink>
              <Link href="/#selector" className="btn-secondary">
                Use the Power Selector
              </Link>
            </div>
            <p className="mt-4 max-w-xl text-xs text-slate-400">
              This website may contain affiliate links. We may earn a commission when you purchase
              through eligible links, at no additional cost to you.{' '}
              <Link href="/affiliate-disclosure" className="underline hover:text-brand-light">
                Affiliate Disclosure
              </Link>
            </p>
          </div>

          {/* Hero model block: same Card, so the order is Image → Title → Specs/Certifications → CTA */}
          <Card
            item={{ ...heroModel, description: heroModel.use }}
            placement="hero_model"
            headingLevel="h2"
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
          >
            <dl className="spec-grid">
              <dt className="font-medium text-slate-400">Power</dt>
              <dd className="text-slate-100">{heroModel.power || 'See merchant page'}</dd>
              <dt className="font-medium text-slate-400">Cooling</dt>
              <dd className="text-slate-100">{heroModel.cooling || 'See merchant page'}</dd>
              {MERCHANT_STATED.map((row) => (
                <div key={row.label} className="contents">
                  <dt className="font-medium text-slate-400">{row.label}</dt>
                  <dd className="text-slate-100">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-slate-400">
              Certifications, service and shipping are stated on the merchant’s website, observed {SITE.lastUpdated}. Not independently verified.
            </p>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="categories-title">
        <SectionHeading id="categories-title" eyebrow="Categories" title="Browse by machine type">
          Each card opens the matching collection on the merchant’s site.
        </SectionHeading>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((item) => (
            <Card key={item.id} item={item} placement="category_card" />
          ))}
        </div>

        <h3 className="mt-14 text-xl font-semibold text-white">Popular collections</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {COLLECTIONS.map((item) => (
            <Card key={item.id} item={item} placement="collection_card" />
          ))}
        </div>
      </section>

      {/* Models + comparison */}
      <section id="models" className="scroll-mt-20 border-y border-slate-800 bg-slate-900/50" aria-labelledby="models-title">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading id="models-title" eyebrow="Featured models" title="Models worth a closer look">
            Specifications below are limited to what the merchant’s listing titles state. Prices, stock, optical cable length and
            warranty terms are not shown because they were not verified and change often.
          </SectionHeading>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MODELS.map((m) => (
              <Card key={m.id} item={{ ...m, description: m.use }} placement="model_card">
                <dl className="spec-grid">
                  <dt className="text-slate-400">Power</dt>
                  <dd className="text-slate-100">{m.power || 'See merchant page'}</dd>
                  <dt className="text-slate-400">Cooling</dt>
                  <dd className="text-slate-100">{m.cooling || 'See merchant page'}</dd>
                </dl>
              </Card>
            ))}
          </div>

          <div className="mt-10 overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Comparison of featured laser machine models</caption>
              <thead className="bg-slate-800 text-slate-200">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Model</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Power</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Cooling</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Typical use</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Merchant listing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {MODELS.map((m) => (
                  <tr key={m.id}>
                    <th scope="row" className="px-4 py-3 font-medium text-white">{m.name}</th>
                    <td className="px-4 py-3">{m.power || 'See merchant page'}</td>
                    <td className="px-4 py-3">{m.cooling || 'See merchant page'}</td>
                    <td className="px-4 py-3">{m.use}</td>
                    <td className="px-4 py-3">
                      <AffiliateLink destination={m.destination} placement="comparison" className="font-semibold text-brand-light underline underline-offset-2 hover:text-white">
                        {m.cta}
                      </AffiliateLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Selector */}
      <section id="selector" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="selector-title">
        <SectionHeading id="selector-title" eyebrow="Fitment and power selector" title="Match a machine class to your workshop">
          Two quick questions point you at the right part of the merchant’s catalog.
        </SectionHeading>
        <div className="mt-8">
          <Selector />
        </div>
      </section>

      {/* Applications */}
      <section id="applications" className="scroll-mt-20 border-y border-slate-800 bg-slate-900/50" aria-labelledby="applications-title">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading id="applications-title" eyebrow="Applications" title="Laser application guides">
            General guidance for common workshop jobs. Always follow the manufacturer’s manual for your machine.
          </SectionHeading>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {APPLICATIONS.map((a) => (
              <article key={a.id} className="flex flex-col rounded-xl border border-slate-700 bg-slate-800/60 p-5">
                <h3 className="text-lg font-semibold text-white">{a.title}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand-light">{a.audience}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
                  {a.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <AffiliateLink destination={a.destination} placement="application_card" className="btn-primary w-full sm:w-auto">
                    {a.cta} →
                  </AffiliateLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section id="safety" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="safety-title">
        <SectionHeading id="safety-title" eyebrow="Laser safety" title="Eye protection and workshop safety" />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
            <h3 className="font-semibold text-white">Eyewear</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Eyewear must match your laser’s wavelength and power. Fiber lasers typically operate near 1064 nm, and workshops
              commonly specify OD 6+ or OD 7+ protection at that wavelength. The correct rating depends on the machine’s output and
              your site’s hazard assessment, so confirm it in the manual and with your laser safety officer. In the US, ANSI Z136.1 is the
              reference standard for safe laser use.
            </p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
            <h3 className="font-semibold text-white">Fumes, fire and access</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Cleaning and cutting produce fumes and particles, so plan extraction and filtration. Keep flammable material away from the
              beam path, restrict access to the work area while the laser is active, and make sure every operator is trained before use.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 border-t border-slate-800 bg-slate-900/50" aria-labelledby="faq-title">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Frequently asked questions" />
          <div className="mt-8 divide-y divide-slate-700 rounded-xl border border-slate-700 bg-slate-800/40">
            {FAQ.map((item) => (
              <details key={item.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white">
                  {item.q}
                  <span aria-hidden="true" className="text-brand-light transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="final-title">
        <div className="rounded-2xl border border-brand/40 bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-center sm:p-12">
          <h2 id="final-title" className="text-2xl font-bold text-white sm:text-3xl">Ready to check specifications and pricing?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Open the merchant’s full equipment catalog to confirm models, current prices, stock and warranty terms.
          </p>
          <div className="mt-6 flex justify-center">
            <AffiliateLink
              destination={{ kind: 'category', id: 'all-laser-equipment' }}
              placement="final_cta"
              className="btn-primary"
            >
              Explore Equipment →
            </AffiliateLink>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Affiliate link: we may earn a commission at no additional cost to you.
          </p>
        </div>
      </section>
    </>
  );
}
