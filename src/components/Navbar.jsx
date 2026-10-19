const Navbar = () => (
  <nav className="relative z-50 mx-auto flex max-w-6xl items-center justify-end px-5 py-7 sm:px-8">
    <div className="flex items-center gap-5 text-sm text-slate-300 sm:gap-7">
      <a href="#about" className="transition hover:text-cyan-200">Perfil</a>
      <a href="#projects" className="transition hover:text-cyan-200">Proyectos</a>
      <a href="https://github.com/mercydomi" target="_blank" rel="noreferrer" className="rounded-full border border-slate-700 px-4 py-2 transition hover:border-cyan-300 hover:text-cyan-200">GitHub</a>
    </div>
  </nav>
);

export default Navbar;
