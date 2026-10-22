'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Icon } from '@/components/IconSprite';

interface ChatMessage {
  id: string;
  who: string;
  text: string;
  icon: string;
  time: string;
  type?: 'judge' | 'you' | 'other';
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    who: 'Judge AI',
    text: 'The matter is called. Let the record state that the accused is present and the counsel for the State may proceed.',
    icon: 'i-judge',
    time: '10:32',
    type: 'judge',
  },
  {
    id: 'm2',
    who: 'Prosecution AI',
    text: 'State calls PW1, the eyewitness. I offer PW1 for examination-in-chief.',
    icon: 'i-scales',
    time: '10:33',
    type: 'other',
  },
  {
    id: 'm3',
    who: 'Judge AI',
    text: 'PW1 is examined. Objections, counsel for the Defence?',
    icon: 'i-judge',
    time: '10:33',
    type: 'judge',
  },
  {
    id: 'm4',
    who: 'Witness AI',
    text: 'I saw the accused near the bus stop at about 9:40 pm. The light from the shop was on. I did not recognise him at first.',
    icon: 'i-witness',
    time: '10:34',
    type: 'other',
  },
  {
    id: 'm5',
    who: 'Judge AI',
    text: 'Counsel, the witness has paused mid-answer. You may proceed with your cross-examination.',
    icon: 'i-judge',
    time: '10:35',
    type: 'judge',
  },
];

export default function CourtroomPage() {
  const params = useParams();
  const trialId = (params?.trialId as string) || '1';

  const [activeTab, setActiveTab] = useState<'info' | 'stage' | 'chat'>('stage');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [stageStatus, setStageStatus] = useState("Prosecution's turn");
  const [showVerdict, setShowVerdict] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(872); // 14:32

  const scrollRef = useRef<HTMLDivElement>(null);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const addMessage = (who: string, icon: string, text: string, type?: 'judge' | 'you' | 'other') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = { id: `m_${Date.now()}_${Math.random()}`, who, text, icon, time, type };
    setMessages((prev) => [...prev, newMsg]);
    setTimeout(scrollToBottom, 50);
  };

  const submitUserMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addMessage('You', 'i-user', trimmed, 'you');
    setInputVal('');

    // Simulated Judge ruling after 700ms
    setTimeout(() => {
      addMessage('Judge AI', 'i-judge', 'Noted. Let the record reflect that. Counsel, you may proceed.', 'judge');
      setStageStatus('Your turn');
    }, 700);
  };

  return (
    <div className="court" data-show={activeTab}>
      {/* Mobile view tabs */}
      <div className="tabs" data-tabs role="tablist">
        <button role="tab" data-tab="info" aria-selected={activeTab === 'info'} onClick={() => setActiveTab('info')}>
          Case file
        </button>
        <button role="tab" data-tab="stage" aria-selected={activeTab === 'stage'} onClick={() => setActiveTab('stage')}>
          Court
        </button>
        <button role="tab" data-tab="chat" aria-selected={activeTab === 'chat'} onClick={() => setActiveTab('chat')}>
          Chat
        </button>
      </div>

      {/* LEFT: Case Info */}
      <aside className="court-col court-col--info">
        <div className="court-head">
          <span className="ic-slot ic-slot--40" style={{ background: 'var(--peach)', color: 'var(--maroon)' }}>
            <Icon name="i-doc-lines" size="sm" />
          </span>
          <div>
            <h2>Case file</h2>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>State vs. Ramesh Kumar</span>
          </div>
        </div>

        <div className="court-scroll">
          <div className="court-info-block">
            <h3>Registry</h3>
            <ul className="court-list">
              <li><Icon name="i-landmark" size="xs" />District Criminal Court</li>
              <li><Icon name="i-calendar" size="xs" />Offence date 14 Mar 2024</li>
              <li><Icon name="i-shield-check" size="xs" />BNS / BNSS / BSA 2023</li>
            </ul>
          </div>

          <div className="court-info-block">
            <h3>Case facts</h3>
            <ul className="court-list">
              <li><Icon name="i-alert" size="xs" />Death of the complainant at a roadside</li>
              <li><Icon name="i-alert" size="xs" />Knife seized from the accused, PW4</li>
              <li><Icon name="i-witness" size="xs" />Single eyewitness, PW1, injured</li>
              <li><Icon name="i-clock" size="xs" />Alibi of 9:40 pm, uncorroborated</li>
            </ul>
          </div>

          <div className="court-info-block">
            <h3>Exhibits</h3>
            <ul className="court-list">
              <li><Icon name="i-doc-lines" size="xs" />Ex.1 &mdash; Post-mortem report</li>
              <li><Icon name="i-doc-lines" size="xs" />Ex.2 &mdash; Seized knife, memo</li>
              <li><Icon name="i-doc-lines" size="xs" />Ex.3 &mdash; Site sketch</li>
              <li><Icon name="i-doc-lines" size="xs" />Ex.4 &mdash; FIR copy</li>
            </ul>
          </div>

          <div className="court-info-block">
            <h3>Skill tracker</h3>
            <div className="bars">
              <div className="bar-row" data-skill="8.4">
                <span>Opening</span><em>8.4/10</em>
                <i className="bar-track"><b className="bar-fill is-gold" style={{ width: '84%' }} /></i>
              </div>
              <div className="bar-row" data-skill="7.6">
                <span>Examination</span><em>7.6/10</em>
                <i className="bar-track"><b className="bar-fill" style={{ width: '76%' }} /></i>
              </div>
              <div className="bar-row" data-skill="6.9">
                <span>Cross</span><em>6.9/10</em>
                <i className="bar-track"><b className="bar-fill" style={{ width: '69%' }} /></i>
              </div>
              <div className="bar-row" data-skill="8.1">
                <span>Objections</span><em>8.1/10</em>
                <i className="bar-track"><b className="bar-fill is-green" style={{ width: '81%' }} /></i>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* CENTRE: Courtroom Stage */}
      <main className="court-col court-col--stage">
        <picture className="stage-bg" aria-hidden="true">
          <source srcSet="/assets/court-front.webp" type="image/webp" />
          <img src="/assets/court-front.png" alt="" width={1200} height={800} />
        </picture>

        <div className="court-head">
          <h2>Courtroom</h2>
          <span className="app-live" style={{ marginLeft: '8px' }}><i></i>Live</span>
          <span className="tag tag-neutral" style={{ marginLeft: '8px', fontVariantNumeric: 'tabular-nums' }}>
            <Icon name="i-clock" size="xs" />
            {formatTimer(timerSeconds)}
          </span>
          <div className="court-head" style={{ marginLeft: 'auto', border: 0, padding: 0, minHeight: 0 }}>
            <button className="ic-btn" id="open-verdict" aria-label="Show verdict" onClick={() => setShowVerdict(true)}>
              <Icon name="i-trophy" />
            </button>
          </div>
        </div>

        <div className="stage">
          <div className="bench">
            <span className="ic-slot ic-slot--64">
              <Icon name="i-judge" size="2xl" />
            </span>
            <div>
              <div className="bench-name">The Hon&rsquo;ble Judge AI</div>
              <div className="bench-role">Presiding</div>
            </div>
            <span className="bench-status">
              <i />
              <span id="stage-status">{stageStatus}</span>
            </span>
          </div>

          <div className="agents-row">
            <article className="agent-seat">
              <span className="ic-slot ic-slot--48"><Icon name="i-scales" size="lg" /></span>
              <b>Prosecution AI</b>
              <em>Presents the case for the State</em>
              <span className="tag tag-neutral">Speaking</span>
            </article>
            <article className="agent-seat">
              <span className="ic-slot ic-slot--48"><Icon name="i-shield" size="lg" /></span>
              <b>Defence AI</b>
              <em>Cross-examines and objects</em>
              <span className="tag tag-neutral">Waiting</span>
            </article>
            <article className="agent-seat">
              <span className="ic-slot ic-slot--48"><Icon name="i-witness" size="lg" /></span>
              <b>Witness AI</b>
              <em>Answers only from the case file</em>
              <span className="tag tag-neutral">In the box</span>
            </article>
          </div>

          <div className="stage-foot">
            <span>You are the counsel for the Defence</span>
            <span className="divider" aria-hidden="true" />
            <span>Section 238 BNSS &mdash; examination of witnesses</span>
          </div>
        </div>
      </main>

      {/* RIGHT: Proceedings Chat */}
      <aside className="court-col court-col--chat" id="chat-col" ref={scrollRef}>
        <div className="court-head">
          <span className="ic-slot ic-slot--40" style={{ background: 'var(--rose)', color: 'var(--maroon)' }}>
            <Icon name="i-gavel-lite" size="sm" />
          </span>
          <h2>Proceedings</h2>
          <button className="ic-btn" aria-label="Download transcript" onClick={() => window.print()}>
            <Icon name="i-download" size="sm" />
          </button>
        </div>

        <div className="court-scroll">
          <div className="chat-stream" id="chat-stream">
            {messages.map((m) => {
              const cls = m.type === 'you' ? 'msg is-you' : m.type === 'judge' ? 'msg is-judge' : 'msg';
              return (
                <div key={m.id} className={cls}>
                  <span className="ic-slot ic-slot--40">
                    <Icon name={m.icon} size="sm" />
                  </span>
                  <div className="msg-bubble">
                    <div className="msg-who">{m.who}</div>
                    <div className="msg-text">{m.text}</div>
                    <div className="msg-time">{m.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Composer */}
        <form className="composer" onSubmit={(e) => { e.preventDefault(); submitUserMessage(inputVal); }}>
          <div className="chips">
            <button
              className="chip-btn"
              type="button"
              style={{ background: 'var(--rose)', borderColor: 'var(--maroon)', color: 'var(--maroon)', fontWeight: 700 }}
              onClick={() => submitUserMessage('Nyaya Saathi: Under Section 137 BSA, PW1 cannot contradict their Section 161 BNSS statement without leave.')}
            >
              <Icon name="i-shield-check" size="xs" style={{ marginRight: '4px' }} />
              Nyaya Saathi
            </button>
            <button className="chip-btn" type="button" onClick={() => submitUserMessage('I have an objection, Your Honour. The question is leading.')}>
              Objection
            </button>
            <button className="chip-btn" type="button" onClick={() => submitUserMessage('I tender Ex.2, the seizure memo of the knife, for identification.')}>
              Tender exhibit
            </button>
            <button className="chip-btn" type="button" onClick={() => submitUserMessage('I seek permission to put the prior statement of PW1 to the witness.')}>
              Permission gate
            </button>
            <button className="chip-btn" type="button" onClick={() => submitUserMessage('May I reserve my right to further cross-examine this witness?')}>
              Reserve
            </button>
          </div>
          <div className="composer-row">
            <input
              type="text"
              id="composer-input"
              placeholder="Enter your submission or objection"
              aria-label="Your submission"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button className="composer-send" id="composer-send" type="submit" aria-label="Send">
              <Icon name="i-send" size="sm" />
            </button>
          </div>
        </form>
      </aside>

      {/* VERDICT MODAL */}
      <div className="modal" id="verdict" hidden={!showVerdict} role="dialog" aria-modal="true" aria-labelledby="verdict-title">
        <div className="modal-card">
          <span className="ic-slot ic-slot--48" style={{ background: 'var(--peach)', color: 'var(--maroon)' }}>
            <Icon name="i-trophy" size="lg" />
          </span>
          <h2 id="verdict-title" style={{ marginTop: '16px' }}>Verdict on State vs. Ramesh Kumar</h2>
          <p>On the admitted record only, the Court finds the prosecution has not proved the presence of the accused at the scene beyond the statement of PW1, which is materially contradicted by Ex.3.</p>
          <p style={{ marginTop: '12px' }}>
            The accused is <strong>acquitted</strong> and set at liberty. Your cross-examination score was <strong>6.9/10</strong> &mdash; the contradiction landed, but you moved on before the answer was complete.
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <Link className="btn btn-primary" href={`/trials/${trialId}/report`}>
              Read full report
            </Link>
            <button className="btn btn-outline" type="button" onClick={() => setShowVerdict(false)} data-close>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
