'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/IconSprite';

export default function SignupPage() {
  const router = useRouter();
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [terms, setTerms] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  // Password strength
  const getPasswordStrength = (val: string) => {
    if (!val) return 'none';
    const hasLen = val.length >= 8;
    const hasNum = /\d/.test(val);
    const hasSpecial = /[A-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);
    if (hasLen && hasNum && hasSpecial) return 'strong';
    if (hasLen && (hasNum || hasSpecial)) return 'medium';
    return 'weak';
  };

  const strength = getPasswordStrength(password);

  const handleFillDemo = () => {
    setFirst('Aarav');
    setLast('Sharma');
    setEmail('aarav@example.com');
    setPassword('Practice2026!');
    setRole('aspirant');
    setTerms(true);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: boolean } = {};
    if (!first.trim()) newErrors.first = true;
    if (!last.trim()) newErrors.last = true;
    if (!isValidEmail(email)) newErrors.email = true;
    if (password.length < 8 || !/\d/.test(password)) newErrors.password = true;
    if (!terms) newErrors.terms = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    router.push(`/onboarding?role=${role}`);
  };

  return (
    <div className="auth">
      {/* Left Artwork */}
      <aside className="auth-art">
        <picture>
          <source className="auth-art-bg" srcSet="/assets/auth-panel.webp" type="image/webp" />
          <img className="auth-art-bg" src="/assets/auth-panel.png" alt="" aria-hidden="true" width={900} height={1200} />
        </picture>
        <div className="auth-art-body">
          <Link className="brand" href="/" aria-label="Adalat AI home">
            <img className="brand-mark" src="/assets/logo-mark.png" alt="" width={44} height={44} />
            <span className="brand-text">
              <span className="brand-name">Adalat AI</span>
              <span className="brand-hi">अदालत</span>
            </span>
          </Link>

          <div className="auth-art-quote">
            <h2>Your first case is waiting.</h2>
            <p>Start with a guided opening statement and work up to full cross-examination with scored feedback after every session.</p>
            <ul className="auth-art-points">
              <li>
                <Icon name="i-check-circle" size="sm" />
                Free to start, no card needed
              </li>
              <li>
                <Icon name="i-check-circle" size="sm" />
                Criminal, civil and evidence matters
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Right Form */}
      <main className="auth-panel">
        <div className="auth-form">
          <h1>Create your account</h1>
          <p>Tell us who you are so we can shape your practice.</p>

          <div className="auth-demo-hint">
            <span><strong>Testing?</strong> Fill demo registration info</span>
            <button type="button" data-fill-signup-demo onClick={handleFillDemo}>
              Fill demo
            </button>
          </div>

          <form id="signup-form" onSubmit={handleSubmit} noValidate>
            <div className="field-row">
              <div className="field">
                <label htmlFor="first">First name</label>
                <div className="input-wrap">
                  <Icon name="i-user" size="sm" />
                  <input
                    type="text"
                    id="first"
                    name="first"
                    placeholder="Aarav"
                    autoComplete="given-name"
                    value={first}
                    onChange={(e) => {
                      setFirst(e.target.value);
                      if (errors.first) setErrors((prev) => ({ ...prev, first: false }));
                    }}
                    aria-invalid={errors.first ? 'true' : undefined}
                    required
                  />
                </div>
                {errors.first && <p className="hint is-error" style={{ display: 'block' }}>Please enter your first name.</p>}
              </div>

              <div className="field">
                <label htmlFor="last">Last name</label>
                <div className="input-wrap">
                  <Icon name="i-user" size="sm" />
                  <input
                    type="text"
                    id="last"
                    name="last"
                    placeholder="Sharma"
                    autoComplete="family-name"
                    value={last}
                    onChange={(e) => {
                      setLast(e.target.value);
                      if (errors.last) setErrors((prev) => ({ ...prev, last: false }));
                    }}
                    aria-invalid={errors.last ? 'true' : undefined}
                    required
                  />
                </div>
                {errors.last && <p className="hint is-error" style={{ display: 'block' }}>Please enter your last name.</p>}
              </div>
            </div>

            <div className="field">
              <label htmlFor="email">Email address</label>
              <div className="input-wrap">
                <Icon name="i-mail" size="sm" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: false }));
                  }}
                  aria-invalid={errors.email ? 'true' : undefined}
                  required
                />
              </div>
              {errors.email && <p className="hint is-error" style={{ display: 'block' }}>Please enter a valid email address.</p>}
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="input-wrap">
                <Icon name="i-lock" size="sm" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: false }));
                  }}
                  aria-invalid={errors.password ? 'true' : undefined}
                  required
                />
                <button
                  type="button"
                  className="pwd-toggle"
                  data-toggle-pwd="password"
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPwd(!showPwd)}
                >
                  {showPwd ? 'Hide' : 'Show'}
                </button>
              </div>

              {password && (
                <div className="pwd-meter is-visible" id="pwd-meter" data-strength={strength}>
                  <span className="pwd-meter-bar"></span>
                  <span className="pwd-meter-bar"></span>
                  <span className="pwd-meter-bar"></span>
                </div>
              )}

              {errors.password ? (
                <p className="hint is-error" style={{ display: 'block' }}>Password must be at least 8 characters with at least one number.</p>
              ) : (
                <p className="hint" id="password-hint">Minimum 8 characters, with one number.</p>
              )}
            </div>

            <div className="field">
              <label id="role-label">I am a&hellip;</label>
              <div className="role-grid" role="radiogroup" aria-labelledby="role-label">
                <label className="role-opt">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={role === 'student'}
                    onChange={() => setRole('student')}
                  />
                  <Icon name="i-cap" />
                  <span>
                    <b>Law student</b>
                    <em>Building advocacy fundamentals from case files.</em>
                  </span>
                </label>

                <label className="role-opt">
                  <input
                    type="radio"
                    name="role"
                    value="aspirant"
                    checked={role === 'aspirant'}
                    onChange={() => setRole('aspirant')}
                  />
                  <Icon name="i-landmark" />
                  <span>
                    <b>Judiciary aspirant</b>
                    <em>Preparing for civil service and judicial exams.</em>
                  </span>
                </label>

                <label className="role-opt">
                  <input
                    type="radio"
                    name="role"
                    value="advocate"
                    checked={role === 'advocate'}
                    onChange={() => setRole('advocate')}
                  />
                  <Icon name="i-shield" />
                  <span>
                    <b>Practicing advocate</b>
                    <em>Rehearsing trial theories, cross-exam, and witness strategy.</em>
                  </span>
                </label>

                <label className="role-opt">
                  <input
                    type="radio"
                    name="role"
                    value="college"
                    checked={role === 'college'}
                    onChange={() => setRole('college')}
                  />
                  <Icon name="i-people" />
                  <span>
                    <b>Faculty or college</b>
                    <em>Running classroom moot court sessions.</em>
                  </span>
                </label>
              </div>
            </div>

            <div className="field" style={{ marginTop: '16px' }}>
              <label className="check-row" style={{ marginTop: 0 }}>
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  checked={terms}
                  onChange={(e) => {
                    setTerms(e.target.checked);
                    if (errors.terms) setErrors((prev) => ({ ...prev, terms: false }));
                  }}
                  required
                />
                <span>
                  I agree to the <a className="link" href="#">Terms</a> and <a className="link" href="#">Privacy Policy</a>.
                </span>
              </label>
              {errors.terms && <p className="hint is-error" style={{ display: 'block' }}>Please accept the terms to continue.</p>}
            </div>

            <button className="btn btn-primary btn-lg btn-block" type="submit" style={{ marginTop: '22px' }}>
              <span>Create account</span>
              <Icon name="i-arrow-right" size="sm" />
            </button>
          </form>

          <p className="auth-alt">
            Already have an account? <Link className="link" href="/login">Log in</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
