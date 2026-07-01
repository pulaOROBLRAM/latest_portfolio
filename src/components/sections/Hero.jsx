function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__inner">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dot" aria-hidden="true" />
          Available for opportunities · ML &amp; Full-Stack
        </div>

        <h1 className="hero__title">
          <span className="hero__title-primary">Building</span>{' '}
          <span className="hero__title-accent">intelligent applications.</span>
        </h1>

        <p className="hero__subtitle">
          Full-stack developer specializing in web apps and AI-powered solutions.
        </p>

        <div className="hero__actions">
          <a href="#work" className="hero__btn-primary">
            View work →
          </a>
          <a href="#contact" className="hero__btn-secondary">
            Get in touch
          </a>
        </div>
      </div>

      <p className="hero__meta">
        Based in Philippines • Open to remote
      </p>
    </section>
  )
}

export default Hero
