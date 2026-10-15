import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { services, pageHead } from '@/lib/site';
import { Button } from '@/components/ui/button';
import { FinalCTA } from '@/components/site-shell';
export const Route = createFileRoute('/services/')({head:()=>pageHead('Our services','Explore software development, digital marketing, ads, campaigns, conversion optimisation and AI video production.'),component:Services});
function Services(){const [filter,setFilter]=useState('All');return <><section className="page-intro"><div className="eyebrow">One digital partner. Every next step.</div><h1>Build better.<br/>Grow together.</h1><p>From software foundations to scroll-stopping creative, we connect the expertise your business needs to move forward.</p></section><section className="container page-body"><div className="filter-bar">{['All','Build','Grow','Create'].map(f=><Button variant="nav" className={filter===f?'active':''} onClick={()=>setFilter(f)} key={f}>{f}</Button>)}</div><div className="service-grid">{services.filter(s=>filter==='All'||s.group===filter).map(s=><Link className="service-item" key={s.slug} to="/services/$slug" params={{slug:s.slug}}><div className="eyebrow">{s.group}</div><h3>{s.title}<ArrowUpRight/></h3><p>{s.description}</p></Link>)}</div></section><FinalCTA/></>}
