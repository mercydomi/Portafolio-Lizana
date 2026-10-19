import { useEffect, useState } from "react";

const USER = "mercydomi";
const GITHUB = `https://github.com/${USER}`;
const stack = ["JavaScript", "React", "Node.js", "Python", "Git", "Tailwind CSS"];

function App() {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${USER}/repos?sort=updated&per_page=6`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub no respondio");
        return response.json();
      })
      .then((data) => {
        setRepos(data.filter((repo) => !repo.fork));
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
    return () => controller.abort();
  }, []);

  return (
    <main className="relative z-10 mx-auto max-w-6xl px-5 pb-20 sm:px-8">
      <section className="grid min-h-[78vh] items-center gap-12 py-14 lg:grid-cols-[1.1fr_.9fr] lg:py-20" id="home">
        <div>
          <p className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-cyan-300 uppercase"><span className="h-px w-12 bg-cyan-300" /> Portfolio · 2026</p>
          <h1 className="max-w-3xl text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl">Dominick <span className="text-cyan-300">Lizana.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">Estudiante y desarrollador de software. Convierto ideas en productos digitales utiles, claros y con atencion a los detalles.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200">Ver proyectos</a>
            <a href={GITHUB} target="_blank" rel="noreferrer" className="rounded-full border border-slate-600 px-6 py-3 font-semibold transition hover:border-cyan-300 hover:text-cyan-200"><i className="ri-github-line mr-2" aria-hidden="true" /> GitHub</a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-transparent to-violet-500/25 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur">
            <div className="mb-3 flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /></div>
            <img src="/assets/developer-avatar.png" alt="Ilustracion de un desarrollador programando" className="mx-auto aspect-square w-full object-contain" />
            <div className="absolute bottom-7 left-7 rounded-xl border border-cyan-300/20 bg-slate-950/80 px-4 py-3 font-mono text-xs text-cyan-100 backdrop-blur"><span className="text-cyan-300">const</span> future = <span className="text-violet-300">build()</span></div>
          </div>
        </div>
      </section>

      <section id="about" className="grid gap-8 border-y border-white/10 py-16 md:grid-cols-[.7fr_1.3fr]">
        <p className="font-mono text-sm tracking-widest text-cyan-300 uppercase">01 / Perfil</p>
        <div><h2 className="text-3xl font-semibold sm:text-4xl">Aprender. Construir. Iterar.</h2><p className="mt-5 max-w-2xl leading-8 text-slate-300">Estoy fortaleciendo mis habilidades a traves de proyectos practicos, explorando tecnologias web y creando soluciones que tengan una buena experiencia de uso.</p><div className="mt-8 flex flex-wrap gap-2">{stack.map((item) => <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-200" key={item}>{item}</span>)}</div></div>
      </section>

      <section id="projects" className="py-20">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="font-mono text-sm tracking-widest text-cyan-300 uppercase">02 / Codigo abierto</p><h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Proyectos recientes</h2></div><a href={GITHUB} target="_blank" rel="noreferrer" className="text-sm font-semibold text-cyan-300 hover:text-cyan-100">Ver perfil completo <i className="ri-arrow-right-up-line" aria-hidden="true" /></a></div>
        {status === "loading" && <p className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-slate-400">Cargando repositorios desde GitHub…</p>}
        {status === "error" && <div className="rounded-2xl border border-dashed border-slate-600 p-8"><p className="text-slate-300">No se pudieron cargar los repositorios ahora mismo.</p><a className="mt-3 inline-block font-semibold text-cyan-300" href={GITHUB} target="_blank" rel="noreferrer">Abrir GitHub de Dominick <i className="ri-arrow-right-up-line" aria-hidden="true" /></a></div>}
        {status === "ready" && <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{repos.map((repo, index) => <a href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id} className="group min-h-56 rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-slate-900"><div className="flex items-center justify-between text-xs font-mono text-cyan-300"><span>0{index + 1}</span><i className="ri-arrow-right-up-line text-lg transition group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" /></div><h3 className="mt-10 text-xl font-semibold text-white">{repo.name.replaceAll("-", " ")}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{repo.description || "Repositorio disponible en GitHub."}</p><div className="mt-6 text-xs font-medium text-violet-300">{repo.language || "Codigo"}</div></a>)}</div>}
      </section>

      <section id="contact" className="rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-cyan-950/60 to-violet-950/40 px-7 py-12 text-center sm:px-12"><p className="font-mono text-xs tracking-[0.2em] text-cyan-300 uppercase">03 / Conectemos</p><h2 className="mx-auto mt-4 max-w-xl text-3xl font-semibold sm:text-4xl">Quieres ver lo que estoy construyendo?</h2><a href={GITHUB} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-100"><i className="ri-github-fill" aria-hidden="true" /> github.com/mercydomi</a></section>
    </main>
  );
}

export default App;
