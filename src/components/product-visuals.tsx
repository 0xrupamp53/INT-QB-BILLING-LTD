import { useEffect, useState } from 'react';
import { Check, CheckCircle2, Code2, Database, Globe, LayoutDashboard, MessageSquare, MoreHorizontal, Search, ShieldCheck, Sparkles, TrendingUp, Video, Zap, Star, ArrowUpRight, Smartphone, Pause, Play, ArrowRight, Server, Rocket } from 'lucide-react';
import { Button } from './ui/button';
import sneaker from '@/assets/campaign-sneaker.jpg';

const panels = [
 {name:'Web Development',short:'Websites',title:'From your first visit to your next customer.',description:'A fast, clear website built around your customer journey.',steps:['Designing the experience','Connecting your systems','Ready for launch'],toast:'Your website, ready for the next step.',icon:Globe},
 {name:'App Development',short:'Apps',title:'Your product idea, taking shape.',description:'Connected web and mobile experiences, built around real people.',steps:['Mapping user journeys','Building your application','Testing the experience'],toast:'Your idea → a connected application.',icon:Smartphone},
 {name:'Backend Architecture',short:'Backend',title:'Everything connected. Nothing left to chance.',description:'Secure APIs, organised data and reliable business logic.',steps:['Designing the architecture','Connecting services and data','Checking system health'],toast:'Dependable foundations for what comes next.',icon:Server},
 {name:'Ads Dashboard',short:'Ads & growth',title:'Your campaigns, working together.',description:'Meta, Google and your website. One clear view of the journey.',steps:['Planning your audience','Launching the campaign','Reviewing conversion signals'],toast:'Creative, campaigns and conversion — connected.',icon:TrendingUp},
 {name:'AI Video Generator',short:'AI video',title:'A new way to tell your product’s story.',description:'From a creative concept to your next campaign asset.',steps:['Creating the storyboard','Producing the scenes','Preparing channel-ready creative'],toast:'Your creative concept, brought to life.',icon:Video},
] as const;

export function Workspace({ initialView = 0, compact = false }: {initialView?: number;compact?:boolean}) {
 const [active,setActive] = useState(initialView);
 const [phase,setPhase] = useState(0);
 const [playing,setPlaying] = useState(true);
 const [reduced,setReduced] = useState(false);
 const [visible,setVisible] = useState(true);
 const [starred,setStarred] = useState(false);
 const [checklist,setChecklist] = useState(false);
 const complete=phase===3;
 useEffect(() => {
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  const sync=()=>setReduced(media.matches); sync(); media.addEventListener('change',sync);
  return ()=>media.removeEventListener('change',sync);
 }, []);
 useEffect(() => {
  if(!playing || reduced || !visible) return;
  const timer=window.setTimeout(()=>{
   if(document.hidden) return;
   if(phase<3) setPhase(p=>p+1);
   else {setPhase(0);setActive(a=>(a+1)%panels.length);}
  }, 1700);
  return ()=>window.clearTimeout(timer);
 }, [active,phase,playing,reduced,visible]);
 useEffect(()=>{const sync=()=>setVisible(!document.hidden);document.addEventListener('visibilitychange',sync);return()=>document.removeEventListener('visibilitychange',sync);},[]);
 const panel=panels[active] ?? panels[0];
 const choose=(i:number)=>{setActive(i);setPhase(0);setChecklist(false);};
 return <div className={compact?'demo-wrap compact-demo':'demo-wrap'}>
  <div className="hero-workspace" data-demo-playing={playing && !reduced} data-demo-view={panel.name} data-demo-phase={phase}>
   {!compact&&<><div className="doodle doodle-bubble"/><div className="doodle doodle-lines"/></>}
   <div className="workspace">
    <aside className="workspace-sidebar"><div className="workspace-brand"><span className="wordmark-icon">iq</span>Your project</div><Button variant="nav" className="workspace-link" onClick={()=>{choose(initialView);setChecklist(false);}}><LayoutDashboard/>Overview</Button><div className="workspace-caption">BUILD & GROW</div>
     {panels.map((p,i)=><Button key={p.name} variant="nav" className={`workspace-link ${active===i?'selected':''}`} aria-label={`Explore ${p.name}`} aria-pressed={active===i} onClick={()=>choose(i)}><p.icon/>{p.short}</Button>)}
     <div className="workspace-caption">PROJECT RESOURCES</div><Button variant="nav" className={`workspace-link ${checklist?'selected':''}`} aria-pressed={checklist} onClick={()=>setChecklist(!checklist)}><ShieldCheck/>Launch checklist</Button>
    </aside>
    <div className="workspace-main">
     <div className="workspace-toolbar"><span>Project workspace <span className="toolbar-extra"> / {panel.short}</span></span><div className="flex items-center gap-2"><Button variant="nav" size="icon" className="demo-pause" aria-label={playing?'Pause demo':'Play demo'} onClick={()=>setPlaying(!playing)}>{playing&&!reduced?<Pause/>:<Play/>}</Button><Button variant="nav" size="icon" className="demo-pause" aria-label={starred?'Unsave project':'Save project'} aria-pressed={starred} onClick={()=>setStarred(!starred)}><Star className={starred?'saved-star':''}/></Button></div></div>
     <div className="workspace-content demo-scene" key={active}>
      <span className="status"><CheckCircle2/> {complete?'Launched · Ready for what’s next':'Your project, in progress'}</span><h3>{panel.title}</h3><p>{panel.description}</p>
      <div className={`demo-preview stage-${phase}`}>
       {active===0&&<div className="website-demo"><div className="mini-nav"><strong>YOUR BRAND</strong><span>Products &nbsp; About &nbsp; Contact</span></div><div className="mini-site-body"><div><small>MADE FOR YOUR NEXT STEP</small><h4>A better experience.<br/>From the first click.</h4><span className="mini-cta">Explore your products <ArrowRight size={10}/></span></div><div className="mini-product"><Globe/><div className="mini-line"/><div className="mini-line short"/></div></div><div className="mini-trust"><CheckCircle2 size={11}/> Fast pages <CheckCircle2 size={11}/> Clear journeys <CheckCircle2 size={11}/> Every screen</div></div>}
       {active===1&&<div className="app-demo"><div className="app-list"><small>YOUR PRODUCT WORKSPACE</small><h4>Everything you need.<br/>Right where you need it.</h4><div><span className="task-icon"><LayoutDashboard/></span>Personal dashboard</div><div><span className="task-icon"><Zap/></span>Connected workflows</div></div><div className="phone-demo"><div className="phone-notch"/><small>Good morning, Alex</small><strong>Your day, simplified.</strong><div className="phone-tile"><CheckCircle2/><span>Project ready<br/><small>Everything in one place</small></span></div><div className="phone-bars"><i/><i/><i/><i/><i/></div><div className="phone-bottom"><Globe size={12}/><Search size={12}/><MessageSquare size={12}/></div></div></div>}
       {active===2&&<div className="architecture-demo"><div className="architecture-node"><Globe/>Web & mobile</div><div className="architecture-connector"/><div className="architecture-row"><div className="architecture-node"><ShieldCheck/>Access & security</div><div className="architecture-node"><Code2/>API services</div></div><div className="architecture-connector"/><div className="architecture-node"><Database/>Database & storage <span className="node-pulse"/></div></div>}
       {active===3&&<div className="ads-demo"><div className="ads-metrics"><div><small>YOUR CHANNELS</small><strong>Meta + Google</strong></div><div><small>YOUR FOCUS</small><strong>Customer enquiries</strong></div><span className="status">Illustrative demo</span></div><svg viewBox="0 0 460 80" fill="none" aria-label="Illustrative campaign trend"><path d="M0 70H460M0 40H460M0 10H460" className="chart-grid"/><path className="animated-chart" d="M0 65 L35 59 L70 64 L105 47 L140 52 L175 33 L210 40 L245 26 L280 32 L315 16 L350 21 L390 8 L425 14 L460 2" pathLength="1"/></svg><div className="chart-footer"><span>Launch</span><span>Test creative</span><span>Learn</span><span>Optimise</span></div></div>}
       {active===4&&<div className="video-demo"><img src={sneaker} alt="Illustrative AI-assisted footwear campaign creative" width={1200} height={800} loading="lazy"/><div className="video-demo-info"><span><Sparkles size={14}/> Campaign concept</span><strong>Bring your product<br/>into the spotlight.</strong><small>Storyboard → Scenes → Final edit</small><div className="video-timeline"><i/><i/><i/><i/><i/></div></div></div>}
      </div>
      {checklist&&<div className="launch-checklist"><strong>Launch checklist</strong>{['Experience designed','Systems connected','Quality checks complete','Ready to launch'].map((item,i)=><div key={item}>{phase>=i?<CheckCircle2/>:<span className="checklist-wait"/>}{item}</div>)}</div>}
       <div className="demo-progress-row"><span className="demo-progress-icon">{complete?<Rocket size={13}/>:<Sparkles size={13}/>}</span><span key={phase} className="demo-status-text">{complete?'Launching your next chapter':panel.steps[Math.min(phase,2)]}</span><div className="demo-progress-track"><div className={`demo-progress-fill phase-${phase}`}/></div></div>
     </div>
    </div>
   </div>
   <div className="workspace-toast" key={`${active}-${phase}`}><Sparkles/>{complete?panel.toast:panel.steps[Math.min(phase,2)]}{complete&&<Rocket size={14}/>}</div>
  </div>
  {!compact&&<div className="workspace-tabs" role="tablist" aria-label="Explore our capabilities">{panels.map((p,i)=><Button key={p.name} variant="nav" role="tab" aria-selected={active===i} className={active===i?'active':''} onClick={()=>choose(i)}>{p.short}</Button>)}</div>}
 </div>;
}
export function CodeVisual() { return <div className="feature-art"><div className="code-window"><div className="window-dots"><i/><i/><i/><span className="ml-auto text-muted-foreground">your-next-big-thing.tsx</span></div><div className="code-line"><b>const</b> yourNextChapter = {'{'}</div><div className="code-line indent">experience: <b>'beautiful'</b>,</div><div className="code-line indent">performance: <b>'exceptional'</b>,</div><div className="code-line indent">possibilities: <b>'endless'</b></div><div className="code-line">{'}'};</div><div className="mt-5 status"><CheckCircle2/> Ready for what’s next</div></div></div>; }
export function GrowthVisual() { return <div className="feature-art"><div className="chart-mockup"><small>Campaign overview · Illustrative data</small><h4>Growing together <ArrowUpRight className="inline" size={20}/></h4><svg viewBox="0 0 270 90" fill="none" aria-label="Illustrative growth chart"><path d="M0 80H270M0 45H270M0 10H270" stroke="currentColor" opacity=".1"/><path className="animated-chart" pathLength="1" d="M0 72 L20 68 L40 73 L60 54 L80 59 L100 40 L120 45 L140 32 L160 40 L180 20 L200 25 L220 12 L245 17 L270 0"/></svg><div className="chart-footer"><span>Strategy</span><span>Launch</span><span>Optimise</span><span>Grow</span></div></div></div>; }
export function VideoVisual() { return <div className="feature-art video-art"><img src={sneaker} alt="AI-assisted sneaker advertising concept" width={1200} height={800} loading="lazy"/><span className="video-play"><Video size={17}/></span><div className="video-timeline"><i/><i/><i/><i/><i/><i/></div></div>; }
export function OrbitVisual() { return <div className="orbit-art"><div className="orbit-tools"><span className="tool-square"><Code2/></span><span className="tool-square">G</span><span className="tool-square"><Video/></span></div><div className="orbit-center"><strong>One team. One clear direction.</strong><span className="status"><CheckCircle2/> Everything connected</span><p>Product → Campaign → Creative → Growth</p></div><div className="orbit-tools"><span className="tool-square"><Database/></span><span className="tool-square"><TrendingUp/></span><span className="tool-square"><Globe/></span></div></div>; }
