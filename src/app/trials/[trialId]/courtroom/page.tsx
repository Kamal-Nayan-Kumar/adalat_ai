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
  type?: 'judge' | 'you' | 'prosecution' | 'witness' | 'system';
}

interface ExhibitDoc {
  code: string;
  title: string;
  source: string;
  excerpt: string;
  status: string;
  tip: string;
}

const EXHIBITS_DATA: ExhibitDoc[] = [
  {
    code: 'Ex.1',
    title: 'Post-mortem examination report',
    source: 'Hospital Medical Dossier (Dr. S. Rao, p. 14)',
    excerpt: 'Single incised stab wound on left thoracic wall. Dimensions: 2.2 cm length, 4.5 cm depth. Weapon profile: single-edged sharp blade.',
    status: 'Admitted into Record',
    tip: 'Compare blade dimension with Ex.2 seized knife width (3.1 cm) to create material contradiction.',
  },
  {
    code: 'Ex.2',
    title: 'Seizure memo of iron knife',
    source: 'Police Station Case Diary (PW4 Arresting IO, p. 28)',
    excerpt: 'Recovery effected from bush near roadside shelter. Seizure memo drawn on 15 March 2024 at 02:10 am without independent panch witnesses.',
    status: 'Contested Recovery',
    tip: 'Challenge recovery validity under Section 238 BNSS and State of Rajasthan vs. Raja Ram precedent.',
  },
  {
    code: 'Ex.3',
    title: 'Site sketch map with lighting layout',
    source: 'Draftsman Crime Scene Survey (IO Report, p. 4)',
    excerpt: 'Bus shelter located 42 metres from nearest operational municipal streetlight. Ambient illumination at 09:40 pm rated insufficient.',
    status: 'Admitted into Record',
    tip: 'Confront PW1 on inability to identify accused from 42 metres distance in near darkness.',
  },
  {
    code: 'Ex.4',
    title: 'Certified First Information Report (FIR)',
    source: 'Civil Lines Police Station (FIR No. 104/2024)',
    excerpt: 'FIR registered at 11:45 pm against unknown assailant. Accused named 18 hours later based solely on supplementary statement.',
    status: 'Admitted into Record',
    tip: 'Highlight that PW1 did not name the accused in the prompt first information report.',
  },
];

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
    type: 'prosecution',
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
    type: 'witness',
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
  const [activeSpeaker, setActiveSpeaker] = useState<'judge' | 'prosecution' | 'defence' | 'witness'>('witness');
  const [currentSpeech, setCurrentSpeech] = useState<{ who: string; role: string; text: string; icon: string }>({
    who: 'Witness AI (PW1)',
    role: 'Eyewitness in Box',
    text: 'I saw the accused near the bus stop at about 9:40 pm. The light from the shop was on. I did not recognise him at first.',
    icon: 'i-witness',
  });
  const [gavelAlert, setGavelAlert] = useState<string | null>(null);
  const [witnessDemeanor, setWitnessDemeanor] = useState({ credibility: 62, stress: 78, heartRate: 114 });
  const [admittedOnTable, setAdmittedOnTable] = useState<string[]>(['Ex.1', 'Ex.3']);
  const [agentReasoning, setAgentReasoning] = useState('Witness AI is deposing under oath from Section 161 BNSS police statement.');
  const [selectedExhibit, setSelectedExhibit] = useState<ExhibitDoc | null>(null);
  const [showVerdict, setShowVerdict] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(872); // 14:32
  const [crossScore, setCrossScore] = useState(6.9);
  const [objectionScore, setObjectionScore] = useState(8.1);

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

  const addMessage = (who: string, icon: string, text: string, type?: 'judge' | 'you' | 'prosecution' | 'witness' | 'system') => {
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

    // 1. Defence speaks first
    setActiveSpeaker('defence');
    setStageStatus('Objection raised — Judge considering...');
    setAgentReasoning("Defence Counsel has raised an objection under Section 137 BSA...");
    setCurrentSpeech({
      who: 'Defence Counsel (You)',
      role: 'Cross-Examining Advocate',
      text: trimmed,
      icon: 'i-shield',
    });

    // Check if user tendered Ex.2
    if (trimmed.includes('Ex.2') && !admittedOnTable.includes('Ex.2')) {
      setAdmittedOnTable((prev) => [...prev, 'Ex.2']);
    }

    // 2. Judge AI ruling and Gavel Strike after 700ms
    setTimeout(() => {
      setGavelAlert('OBJECTION SUSTAINED &bull; SECTION 137 BSA');
      addMessage('Judge AI', 'i-judge', 'Noted. Objection sustained. Let the record reflect that. Counsel, you may proceed.', 'judge');
      setStageStatus('Your turn');
      setActiveSpeaker('judge');
      setCurrentSpeech({
        who: 'The Hon\'ble Judge AI',
        role: 'Presiding Sessions Judge',
        text: 'Objection sustained. The question is leading under Section 137 BSA. Prosecution shall rephrase.',
        icon: 'i-judge',
      });
      setAgentReasoning('Defence objection sustained. You have the floor to cross-examine PW1.');
      setObjectionScore((prev) => Math.min(10, +(prev + 0.2).toFixed(1)));
      setCrossScore((prev) => Math.min(10, +(prev + 0.3).toFixed(1)));
      setWitnessDemeanor({ credibility: 48, stress: 92, heartRate: 128 });

      setTimeout(() => setGavelAlert(null), 3500);
    }, 700);
  };

  // Autonomous next-turn simulation step
  const handleSimulateNextStep = () => {
    setActiveSpeaker('prosecution');
    setStageStatus("Prosecution's turn");
    setAgentReasoning('Prosecution AI is re-examining PW1 on identification confirmation.');
    const qText = 'PW1, did you distinctly see the accused holding an iron knife before the complainant collapsed?';
    addMessage('Prosecution AI', 'i-scales', qText, 'prosecution');
    setCurrentSpeech({
      who: 'Prosecution AI',
      role: 'Public Prosecutor',
      text: qText,
      icon: 'i-scales',
    });

    setTimeout(() => {
      setActiveSpeaker('witness');
      setAgentReasoning('Witness AI is recalling statements recorded in police case diary.');
      const aText = 'Yes, sir, he had something dark in his right hand, but it was foggy and the light was dim.';
      addMessage('Witness AI', 'i-witness', aText, 'witness');
      setCurrentSpeech({
        who: 'Witness AI (PW1)',
        role: 'Eyewitness in Box',
        text: aText,
        icon: 'i-witness',
      });
      setWitnessDemeanor({ credibility: 55, stress: 84, heartRate: 120 });
    }, 900);
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

      {/* LEFT COLUMN: Case File & Evidence Inspector */}
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
              <li><Icon name="i-calendar" size="xs" />Offence date: 14 Mar 2024</li>
              <li><Icon name="i-shield-check" size="xs" />BNS / BNSS / BSA 2023</li>
            </ul>
          </div>

          <div className="court-info-block">
            <h3>Case facts</h3>
            <ul className="court-list">
              <li><Icon name="i-alert" size="xs" />Death of complainant at roadside</li>
              <li><Icon name="i-alert" size="xs" />Knife seized from accused, PW4</li>
              <li><Icon name="i-witness" size="xs" />Single eyewitness, PW1, injured</li>
              <li><Icon name="i-clock" size="xs" />Alibi of 9:40 pm, uncorroborated</li>
            </ul>
          </div>

          {/* Interactive Evidence Exhibits */}
          <div className="court-info-block">
            <h3>Trial Exhibits (Click to Inspect)</h3>
            <ul className="court-list">
              {EXHIBITS_DATA.map((ex) => (
                <li
                  key={ex.code}
                  onClick={() => setSelectedExhibit(ex)}
                  style={{ cursor: 'pointer', padding: '6px 8px', borderRadius: 'var(--r-xs)', transition: 'background .15s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(110,18,23,.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Icon name="i-doc-lines" size="xs" />
                  <span><strong>{ex.code}</strong> &mdash; {ex.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Live Skill Tracker */}
          <div className="court-info-block">
            <h3>Live Skill Tracker</h3>
            <div className="bars">
              <div className="bar-row" data-skill="8.4">
                <span>Opening</span><em>8.4/10</em>
                <i className="bar-track"><b className="bar-fill is-gold" style={{ width: '84%' }} /></i>
              </div>
              <div className="bar-row" data-skill="7.6">
                <span>Examination</span><em>7.6/10</em>
                <i className="bar-track"><b className="bar-fill" style={{ width: '76%' }} /></i>
              </div>
              <div className="bar-row" data-skill={crossScore.toString()}>
                <span>Cross</span><em>{crossScore}/10</em>
                <i className="bar-track"><b className="bar-fill" style={{ width: `${crossScore * 10}%` }} /></i>
              </div>
              <div className="bar-row" data-skill={objectionScore.toString()}>
                <span>Objections</span><em>{objectionScore}/10</em>
                <i className="bar-track"><b className="bar-fill is-green" style={{ width: `${objectionScore * 10}%` }} /></i>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* CENTRE: AI Courtroom Simulator Stage */}
      <main className="court-col court-col--stage">
        <picture className="stage-bg" aria-hidden="true">
          <source srcSet="/assets/court-front.webp" type="image/webp" />
          <img src="/assets/court-front.png" alt="" width={1200} height={800} />
        </picture>

        {/* Top Header with Procedural Stage Progress */}
        <div className="court-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h2>Courtroom</h2>
            <span className="app-live"><i></i>Live</span>
            <div className="stage-progress">
              <span className="stage-step is-done">1. Calling ✓</span>
              <span>&rsaquo;</span>
              <span className="stage-step is-active">2. Examination-in-Chief</span>
              <span>&rsaquo;</span>
              <span className="stage-step">3. Cross-Exam</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>
            <button
              className="btn btn-outline btn-sm"
              type="button"
              onClick={handleSimulateNextStep}
              title="Advance AI witness and prosecutor exchange"
              style={{ fontSize: '12px', padding: '4px 10px', height: '32px' }}
            >
              <Icon name="i-play" size="xs" />
              <span>Step Next ⏭</span>
            </button>
            <span className="tag tag-neutral" style={{ fontVariantNumeric: 'tabular-nums' }}>
              <Icon name="i-clock" size="xs" />
              {formatTimer(timerSeconds)}
            </span>
            <button className="ic-btn" id="open-verdict" aria-label="Show verdict" onClick={() => setShowVerdict(true)}>
              <Icon name="i-trophy" />
            </button>
          </div>
        </div>

        {/* Active Reasoning & Ambient Status Bar */}
        <div
          style={{
            margin: '8px 16px 0',
            padding: '7px 14px',
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(6px)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--r-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12.5px',
            color: 'var(--ink)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
            <span><strong>Agentic Reasoner:</strong> {agentReasoning}</span>
          </div>
          <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>Sec 238 BNSS Proceeding</span>
        </div>

        {/* STAGE CONTAINER WITH 3D PERSPECTIVE */}
        <div className="courtroom-3d-scene">
          <div className="courtroom-floor" />

          {/* GAVEL FLASH BANNER (WHEN OBJECTION SUSTAINED) */}
          {gavelAlert && (
            <div className="gavel-alert-banner" role="alert" style={{ position: 'relative', zIndex: 60 }}>
              <span style={{ fontSize: '18px' }}>⚖️</span>
              <span dangerouslySetInnerHTML={{ __html: gavelAlert }} />
            </div>
          )}

          {/* 1. TOP TIER: ELEVATED JUDGE DAIS (CENTERED, ALONE AT THE HIGH BENCH, AUDIENCE-FACING) */}
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div className={`bench-3d-dais speech-bubble-anchor ${activeSpeaker === 'judge' ? 'is-speaking' : ''}`}>
              {activeSpeaker === 'judge' && (
                <div className="speech-bubble-callout is-downward" style={{ borderColor: 'var(--maroon)' }}>
                  <div className="speech-bubble-who">The Hon&rsquo;ble Judge AI &bull; Judicial Ruling</div>
                  <div className="speech-bubble-text">&ldquo;{currentSpeech.text}&rdquo;</div>
                </div>
              )}
              <span className="ic-slot ic-slot--56" style={{ background: '#fff', color: 'var(--maroon)' }}>
                <Icon name="i-judge" size="xl" />
              </span>
              <div>
                <div style={{ fontFamily: 'var(--serif)', fontWeight: 800, fontSize: '18px', color: '#5A1A14' }}>
                  The Hon&rsquo;ble Judge AI
                </div>
                <div style={{ fontSize: '11.5px', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: '#8C5B32', marginTop: '2px' }}>
                  Presiding Sessions Bench &bull; Section 238 BNSS
                </div>
              </div>
              <span className="bench-status" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#7A5233' }}>
                <i style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4E9A73', display: 'inline-block' }} />
                <span>{stageStatus}</span>
              </span>
            </div>
          </div>

          {/* 2. MIDDLE TIER: WELL OF COURT & CLERK EVIDENCE TABLE */}
          <div className="court-well-table">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brick)' }}>
                Court Clerk Table &bull; Admitted Evidence:
              </span>
              <div className="evidence-chips">
                {admittedOnTable.map((code) => {
                  const doc = EXHIBITS_DATA.find((e) => e.code === code);
                  return (
                    <button
                      key={code}
                      type="button"
                      className="evidence-pill"
                      onClick={() => doc && setSelectedExhibit(doc)}
                      title={`Inspect ${doc?.title}`}
                    >
                      <Icon name="i-doc-check" size="xs" />
                      {code}: {doc?.title.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>Click exhibit to inspect</span>
          </div>

          {/* 3. BOTTOM TIER: 3 STATIONS (PROSECUTION ON LEFT, KATHGHARA IN CENTER, DEFENCE ON RIGHT) */}
          <div className="court-bar-grid">
            
            {/* PROSECUTION BAR (Left, angled 3D facing Judge) */}
            <article className={`station-prosecution speech-bubble-anchor ${activeSpeaker === 'prosecution' ? 'is-speaking' : ''}`}>
              {activeSpeaker === 'prosecution' && (
                <div className="speech-bubble-callout">
                  <div className="speech-bubble-who">Prosecution AI &bull; State Counsel</div>
                  <div className="speech-bubble-text">&ldquo;{currentSpeech.text}&rdquo;</div>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="ic-slot ic-slot--40" style={{ background: 'var(--peach)', color: 'var(--maroon)' }}>
                  <Icon name="i-scales" size="md" />
                </span>
                <div>
                  <b style={{ fontSize: '14px', color: 'var(--ink)' }}>Prosecution Bar</b>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>Public Prosecutor</p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--line)' }}>
                <span className="tag tag-neutral" style={{ fontSize: '11px' }}>
                  {activeSpeaker === 'prosecution' ? 'Examining PW1' : 'Waiting for Ruling'}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--muted)', fontStyle: 'italic' }}>Facing Dais &rsaquo;</span>
              </div>
            </article>

            {/* KATHGHARA (WITNESS STAND - Positioned in the middle of the court bar) */}
            <article className={`station-witness-box speech-bubble-anchor ${activeSpeaker === 'witness' ? 'is-speaking' : ''}`}>
              {activeSpeaker === 'witness' && (
                <div className="speech-bubble-callout">
                  <div className="speech-bubble-who">Witness AI (PW1) &bull; Deposing Under Oath</div>
                  <div className="speech-bubble-text">&ldquo;{currentSpeech.text}&rdquo;</div>
                </div>
              )}
              <div className="kathghara-slats" />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '4px' }}>
                <Icon name="i-witness" size="sm" />
                <b style={{ fontSize: '13px', color: 'var(--ink)' }}>PW1 in Kathghara</b>
              </div>
              <span className="tag tag-neutral" style={{ fontSize: '10px', padding: '2px 6px', marginTop: '4px' }}>
                {activeSpeaker === 'witness' ? 'Speaking Under Oath' : 'In Stand &bull; Oaths Act'}
              </span>

              {/* Real-time Demeanor Radar */}
              <div className="credibility-meter">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px' }}>
                  <span>Credibility</span>
                  <strong>{witnessDemeanor.credibility}%</strong>
                </div>
                <div className="credibility-bar">
                  <div
                    className="credibility-fill"
                    style={{
                      width: `${witnessDemeanor.credibility}%`,
                      background: witnessDemeanor.credibility > 55 ? '#059669' : '#D97706',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginTop: '2px' }}>
                  <span>Hesitation: {witnessDemeanor.stress}%</span>
                  <span>HR: {witnessDemeanor.heartRate} bpm</span>
                </div>
              </div>
            </article>

            {/* DEFENCE BAR & LECTERN (Right, angled 3D facing Judge - Your Station) */}
            <article className={`station-defence speech-bubble-anchor ${activeSpeaker === 'defence' ? 'is-speaking' : ''}`}>
              {activeSpeaker === 'defence' && (
                <div className="speech-bubble-callout">
                  <div className="speech-bubble-who">Defence Counsel (You) &bull; Cross-Examining</div>
                  <div className="speech-bubble-text">&ldquo;{currentSpeech.text}&rdquo;</div>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="ic-slot ic-slot--40" style={{ background: 'var(--rose)', color: 'var(--maroon)' }}>
                  <Icon name="i-shield" size="md" />
                </span>
                <div>
                  <b style={{ fontSize: '14px', color: 'var(--maroon)' }}>Defence Bar (You)</b>
                  <p style={{ fontSize: '12px', color: 'var(--body)', margin: 0 }}>Active Defence Counsel</p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--line)' }}>
                <span className="tag tag-neutral" style={{ fontSize: '11px', color: 'var(--maroon)' }}>
                  {activeSpeaker === 'defence' ? 'Your Turn' : 'Active Counsel'}
                </span>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  style={{ fontSize: '11px', padding: '3px 8px', height: '26px' }}
                  onClick={() => submitUserMessage('I have an objection, Your Honour! The question is leading under Section 137 BSA.')}
                >
                  Rise to Object
                </button>
              </div>
            </article>

          </div>
        </div>
      </main>

      {/* RIGHT COLUMN: Proceedings Stream & Nyaya Saathi Co-Pilot */}
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
          {/* Nyaya Saathi Live Co-Pilot Card */}
          <div className="copilot-panel">
            <div className="copilot-header">
              <span className="copilot-tag">
                <Icon name="i-shield-check" size="xs" />
                Nyaya Saathi &bull; Co-Pilot
              </span>
              <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Live Analysis</span>
            </div>
            <div className="copilot-body">
              PW1 mentioned ambient light from shop. Ex.3 proves shop was shuttered and nearest pole was 42m away.
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="copilot-action-btn"
                onClick={() => submitUserMessage('I object under Section 137 BSA — the question assumes facts not in evidence regarding ambient lighting.')}
              >
                + Apply Objection
              </button>
              <button
                type="button"
                className="copilot-action-btn"
                onClick={() => submitUserMessage('I tender Ex.3 site sketch to confront PW1 on the 42-metre distance from illumination.')}
              >
                + Confront with Ex.3
              </button>
            </div>
          </div>

          {/* Chat Stream */}
          <div className="chat-stream" id="chat-stream">
            {messages.map((m) => {
              const roleClass =
                m.type === 'judge'
                  ? 'msg-role--judge'
                  : m.type === 'prosecution'
                  ? 'msg-role--prosecution'
                  : m.type === 'witness'
                  ? 'msg-role--witness'
                  : 'msg-role--defence is-you';

              const roleLabel =
                m.type === 'judge'
                  ? 'Judge'
                  : m.type === 'prosecution'
                  ? 'Prosecutor'
                  : m.type === 'witness'
                  ? 'Witness (PW1)'
                  : 'Defence (You)';

              const rolePillClass =
                m.type === 'judge'
                  ? 'role-pill--judge'
                  : m.type === 'prosecution'
                  ? 'role-pill--prosecution'
                  : m.type === 'witness'
                  ? 'role-pill--witness'
                  : 'role-pill--defence';

              return (
                <div key={m.id} className={`msg ${roleClass}`}>
                  <span className="ic-slot">
                    <Icon name={m.icon} size="sm" />
                  </span>
                  <div className="msg-bubble">
                    <div className="msg-head-row">
                      <span className="msg-who">{m.who}</span>
                      <span className={`msg-role-pill ${rolePillClass}`}>{roleLabel}</span>
                    </div>
                    <div className="msg-text">{m.text}</div>
                    <div className="msg-time">{m.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Chips & Input Composer */}
        <form className="composer" onSubmit={(e) => { e.preventDefault(); submitUserMessage(inputVal); }}>
          <div className="chips">
            <button className="chip-btn" type="button" onClick={() => submitUserMessage('I have an objection, Your Honour. The question is leading.')}>
              Objection (Leading)
            </button>
            <button className="chip-btn" type="button" onClick={() => submitUserMessage('I tender Ex.2, the seizure memo of the knife, for identification.')}>
              Tender Ex.2
            </button>
            <button className="chip-btn" type="button" onClick={() => submitUserMessage('I seek permission to put the prior statement of PW1 to the witness.')}>
              Permission Gate
            </button>
            <button className="chip-btn" type="button" onClick={() => submitUserMessage('May I reserve my right to further cross-examine this witness?')}>
              Reserve
            </button>
          </div>

          <div className="composer-row">
            <input
              type="text"
              id="composer-input"
              placeholder="Enter legal argument or objection"
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

      {/* EXHIBIT DOSSIER INSPECTOR DRAWER */}
      {selectedExhibit && (
        <div className="evidence-drawer" onClick={() => setSelectedExhibit(null)}>
          <div className="evidence-drawer-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--line)' }}>
              <div>
                <span className="tag tag-neutral">{selectedExhibit.code}</span>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', marginTop: '4px' }}>
                  {selectedExhibit.title}
                </h3>
              </div>
              <button className="ic-btn" onClick={() => setSelectedExhibit(null)} aria-label="Close drawer">
                <Icon name="i-close" size="sm" />
              </button>
            </div>

            <div style={{ marginTop: '18px', flex: 1 }}>
              <div style={{ fontSize: '12.5px', color: 'var(--muted)', marginBottom: '8px' }}>
                <strong>Provenance:</strong> {selectedExhibit.source}
              </div>

              <div style={{ padding: '16px', background: 'var(--ivory-2)', border: '1.5px solid var(--line)', borderRadius: 'var(--r-sm)', fontSize: '14px', lineHeight: 1.6, color: 'var(--ink)', fontStyle: 'italic' }}>
                &ldquo;{selectedExhibit.excerpt}&rdquo;
              </div>

              <div style={{ marginTop: '20px', padding: '14px', background: 'var(--rose)', borderRadius: 'var(--r-sm)', border: '1px solid rgba(110,18,23,.12)' }}>
                <b style={{ color: 'var(--maroon)', fontSize: '13.5px', display: 'block' }}>Tactical Impeachment Guidance:</b>
                <p style={{ fontSize: '13px', color: 'var(--body)', marginTop: '4px', lineHeight: 1.45, margin: 0 }}>
                  {selectedExhibit.tip}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                type="button"
                onClick={() => {
                  submitUserMessage(`I tender ${selectedExhibit.code}, ${selectedExhibit.title.toLowerCase()}, for examination on the record.`);
                  setSelectedExhibit(null);
                }}
              >
                Tender into Record
              </button>
              <button className="btn btn-outline" type="button" onClick={() => setSelectedExhibit(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VERDICT MODAL */}
      <div className="modal" id="verdict" hidden={!showVerdict} role="dialog" aria-modal="true" aria-labelledby="verdict-title">
        <div className="modal-card">
          <span className="ic-slot ic-slot--48" style={{ background: 'var(--peach)', color: 'var(--maroon)' }}>
            <Icon name="i-trophy" size="lg" />
          </span>
          <h2 id="verdict-title" style={{ marginTop: '16px' }}>Verdict on State vs. Ramesh Kumar</h2>
          <p>On the admitted record only, the Court finds the prosecution has not proved the presence of the accused at the scene beyond the statement of PW1, which is materially contradicted by Ex.3.</p>
          <p style={{ marginTop: '12px' }}>
            The accused is <strong>acquitted</strong> and set at liberty. Your cross-examination score was <strong>{crossScore}/10</strong> &mdash; the contradiction landed effectively on the record.
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
