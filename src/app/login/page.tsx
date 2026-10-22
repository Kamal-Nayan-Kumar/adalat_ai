'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/IconSprite';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<{ email?: boolean; password?: boolean }>({});

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const handleFillDemo = () => {
    setEmail('aarav@example.com');
    setPassword('Practice2026!');
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailValid = isValidEmail(email);
    const passValid = Boolean(password.trim());

    if (!emailValid || !passValid) {
      setErrors({ email: !emailValid, password: !passValid });
      return;
    }

    setErrors({});
    router.push('/dashboard');
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
            <h2>Practise before it counts.</h2>
            <p>Every session is a full courtroom &mdash; judge, prosecution, defence and witness &mdash; arguing on the record of a real Indian case file.</p>
            <ul className="auth-art-points">
              <li>
                <Icon name="i-check-circle" size="sm" />
                Real cause-lists with case files
              </li>
              <li>
                <Icon name="i-check-circle" size="sm" />
                Feedback on six advocacy skills
              </li>
              <li>
                <Icon name="i-check-circle" size="sm" />
                IPC or BNS, picked by offence date
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Right Form */}
      <main className="auth-panel">
        <div className="auth-form">
          <h1>Welcome back</h1>
          <p>Log in to continue your courtroom practice.</p>

          <div className="auth-demo-hint">
            <span><strong>Testing?</strong> Fill demo student account</span>
            <button type="button" data-fill-demo onClick={handleFillDemo}>
              Fill demo
            </button>
          </div>

          <form id="login-form" onSubmit={handleSubmit} noValidate>
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
              {errors.email && <p className="hint is-error" id="email-error" style={{ display: 'block' }}>Please enter a valid email address.</p>}
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="input-wrap">
                <Icon name="i-lock" size="sm" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
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
              {errors.password && <p className="hint is-error" id="pwd-error" style={{ display: 'block' }}>Please enter your password.</p>}
              <p className="hint">
                <a className="link" href="#">
                  Forgot password?
                </a>
              </p>
            </div>

            <label className="check-row">
              <input type="checkbox" name="remember" defaultChecked />
              <span>Keep me signed in on this device</span>
            </label>

            <button className="btn btn-primary btn-lg btn-block" type="submit" style={{ marginTop: '22px' }}>
              <span>Log in</span>
              <Icon name="i-arrow-right" size="sm" />
            </button>
          </form>

          <p className="auth-alt">
            New to Adalat AI? <Link className="link" href="/signup">Create an account</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
