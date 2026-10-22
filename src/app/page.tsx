import React from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Icon } from '@/components/IconSprite';

export default function LandingPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader activeRoute="home" />

      <main id="main">
        {/* HERO */}
        <section className="hero">
          <div className="hero-media" aria-hidden="true">
            <picture>
              <source srcSet="/assets/hero-courtroom.webp" type="image/webp" />
              <img src="/assets/hero-courtroom.png" alt="" width={1200} height={675} />
            </picture>
          </div>

          <div className="hero-band">
            <div className="hero-copy">
              <span className="badge-pill">AI Courtroom Simulator</span>

              <h1 className="hero-title">
                Practice Law.<br />
                Experience Court.<br />
                <span className="accent">Anywhere.</span>
              </h1>

              <p className="hero-lede">
                Adalat AI is a multi-agent LLM courtroom simulator for Indian law students and judiciary aspirants. Pick a case from a cause-list, argue before AI Judge, Prosecution, Defence and Witness, and get detailed feedback on your advocacy skills.
              </p>

              <div className="hero-actions">
                <Link className="btn btn-primary btn-lg" href="/signup">
                  <span>Start Practicing</span>
                  <Icon name="i-arrow-right" size="sm" />
                </Link>
                <a className="btn btn-outline btn-lg" href="#how">
                  <Icon name="i-play" size="sm" />
                  <span>See How It Works</span>
                </a>
              </div>

              <ul className="hero-points">
                <li>
                  <span className="ic-slot ic-slot--40">
                    <Icon name="i-cap" size="sm" />
                  </span>
                  <span>For Law Students</span>
                </li>
                <li>
                  <span className="ic-slot ic-slot--40">
                    <Icon name="i-landmark" size="sm" />
                  </span>
                  <span>For Judiciary Aspirants</span>
                </li>
                <li>
                  <span className="ic-slot ic-slot--40">
                    <Icon name="i-chart-bars" size="sm" />
                  </span>
                  <span>Skill-wise Feedback</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* AGENTS */}
        <section className="section agents" id="features">
          <div className="container-wide">
            <div className="agent-grid">
              <article className="agent-card">
                <span className="ic-slot ic-slot--56">
                  <Icon name="i-judge" size="xl" />
                </span>
                <h3>Judge AI</h3>
                <p>Manages courtroom flow, routes turns, rules on objections, admits or excludes exhibits and writes a reasoned verdict.</p>
              </article>

              <article className="agent-card">
                <span className="ic-slot ic-slot--56">
                  <Icon name="i-scales" size="xl" />
                </span>
                <h3>Prosecution AI</h3>
                <p>Presents the case for the State with realistic arguments, questions and evidence.</p>
              </article>

              <article className="agent-card">
                <span className="ic-slot ic-slot--56">
                  <Icon name="i-shield" size="xl" />
                </span>
                <h3>Defence AI</h3>
                <p>Challenges the case, cross-examines witnesses and raises objections.</p>
              </article>

              <article className="agent-card">
                <span className="ic-slot ic-slot--56">
                  <Icon name="i-witness" size="xl" />
                </span>
                <h3>Witness AI</h3>
                <p>Answers only from the case file, just like a real witness in court.</p>
              </article>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section how" id="how">
          <div className="container">
            <p className="eyebrow center">Realistic &amp; Structured Experience</p>
            <h2 className="h2 center">How Adalat AI Works</h2>
            <p className="section-sub center">From case-list to verdict &mdash; experience the full courtroom process.</p>

            <ol className="steps">
              <li className="step">
                <span className="step-icon">
                  <Icon name="i-doc" size="xl" />
                  <span className="step-badge">1</span>
                </span>
                <h3>Pick a Case</h3>
                <p>Choose from a curated cause-list with case files, facts and documents.</p>
              </li>
              <li className="step">
                <span className="step-icon">
                  <Icon name="i-people" size="xl" />
                  <span className="step-badge">2</span>
                </span>
                <h3>Plead &amp; Argue</h3>
                <p>Present your opening, examine witnesses, cross-examine and raise objections.</p>
              </li>
              <li className="step">
                <span className="step-icon">
                  <Icon name="i-gavel" size="xl" />
                  <span className="step-badge">3</span>
                </span>
                <h3>Real-time Courtroom</h3>
                <p>AI Judge manages turns, rules on objections and decides on exhibits and witnesses.</p>
              </li>
              <li className="step">
                <span className="step-icon">
                  <Icon name="i-doc-check" size="xl" />
                  <span className="step-badge">4</span>
                </span>
                <h3>Get a Verdict</h3>
                <p>Judge AI delivers a reasoned verdict based only on the admitted record.</p>
              </li>
              <li className="step">
                <span className="step-icon">
                  <Icon name="i-chart-bars" size="xl" />
                  <span className="step-badge">5</span>
                </span>
                <h3>Detailed Feedback</h3>
                <p>Receive a profile-wise report with scores and examiner-style remarks.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* LEGAL FRAMEWORK */}
        <section className="regime">
          <div className="container">
            <p className="eyebrow center">Built for the Indian legal context</p>
            <h2 className="h2 center">Correct Legal Framework, Always</h2>
            <p className="section-sub center">Adalat AI automatically uses the right legal regime based on the offence date:</p>

            <div className="regime-grid">
              <div className="regime-box regime-box-peach">
                <span className="ic-slot ic-slot--48">
                  <Icon name="i-calendar" size="lg" />
                </span>
                <span className="regime-text">
                  <b>Before 1 July 2024</b>
                  <span>IPC / CrPC / Evidence Act</span>
                </span>
              </div>

              <span className="regime-swap">
                <Icon name="i-arrow-swap" size="lg" />
              </span>

              <div className="regime-box regime-box-pink">
                <span className="ic-slot ic-slot--48">
                  <Icon name="i-calendar" size="lg" />
                </span>
                <span className="regime-text">
                  <b>On or after 1 July 2024</b>
                  <span>BNS 2023 / BNSS 2023 / BSA 2023</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* AUDIENCE */}
        <section className="section audience" id="audience">
          <div className="container-wide">
            <h2 className="h2 audience-title">Who is Adalat AI for?</h2>
            <div className="audience-grid">
              <article className="aud-card">
                <span className="ic-slot ic-slot--56">
                  <Icon name="i-cap" size="lg" />
                </span>
                <span className="aud-text">
                  <b>Law Students</b>
                  <em>Practice advocacy skills with realistic scenarios.</em>
                </span>
              </article>
              <article className="aud-card">
                <span className="ic-slot ic-slot--56">
                  <Icon name="i-landmark" size="lg" />
                </span>
                <span className="aud-text">
                  <b>Judiciary Aspirants</b>
                  <em>Build courtroom confidence and legal reasoning.</em>
                </span>
              </article>
              <article className="aud-card">
                <span className="ic-slot ic-slot--56">
                  <Icon name="i-shield" size="lg" />
                </span>
                <span className="aud-text">
                  <b>Practicing Advocates</b>
                  <em>Rehearse trial theories, cross-exam, and witness strategy.</em>
                </span>
              </article>
              <article className="aud-card">
                <span className="ic-slot ic-slot--56">
                  <Icon name="i-people" size="lg" />
                </span>
                <span className="aud-text">
                  <b>Law Colleges &amp; Faculty</b>
                  <em>Use as a training and objective assessment tool.</em>
                </span>
              </article>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="cta-banner" id="cta" aria-label="Try Adalat AI">
          <picture>
            <source srcSet="/assets/banner-cta.webp" type="image/webp" />
            <img src="/assets/banner-cta.png" alt="" width={1600} height={534} aria-hidden="true" />
          </picture>
          <div className="container cta-banner-inner">
            <div className="cta-copy">
              <h2>Practice Today.<br />Be a Better Advocate Tomorrow.</h2>
              <p>Experience Indian courts. Learn by doing.<br />Only on Adalat AI.</p>
            </div>
            <Link className="btn btn-light btn-lg" href="/signup">
              <span>Try Adalat AI</span>
              <Icon name="i-arrow-right" size="sm" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
