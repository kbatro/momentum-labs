<script lang="ts">
  import { onMount } from 'svelte';

  let svgEl: SVGSVGElement | undefined = $state();

  const segments = [
    { label: 'SHAPE', angle: 0 },
    { label: 'PATH', angle: 90 },
    { label: 'RESOURCE', angle: 180 },
    { label: 'LAUNCH', angle: 270 },
  ];

  onMount(() => {
    if (!svgEl) return;

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const wheel = svgEl!.querySelector('.flywheel-group');
        if (!wheel) return;

        gsap.to(wheel, {
          rotation: 360,
          transformOrigin: '50% 50%',
          ease: 'none',
          scrollTrigger: {
            trigger: svgEl,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        });
      });
    });
  });
</script>

<div class="flywheel-container">
  <svg bind:this={svgEl} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" class="flywheel-svg">
    <!-- Outer ring -->
    <circle cx="150" cy="150" r="120" stroke="var(--color-grid-line)" stroke-width="0.5" />
    <circle cx="150" cy="150" r="100" stroke="var(--color-grid-line)" stroke-width="0.5" />

    <!-- Rotating group -->
    <g class="flywheel-group">
      <!-- Arcs -->
      <path d="M150 30 A120 120 0 0 1 270 150" stroke="var(--color-orange)" stroke-width="2" fill="none" opacity="0.8" />
      <path d="M270 150 A120 120 0 0 1 150 270" stroke="var(--color-orange)" stroke-width="2" fill="none" opacity="0.6" />
      <path d="M150 270 A120 120 0 0 1 30 150" stroke="var(--color-orange)" stroke-width="2" fill="none" opacity="0.4" />
      <path d="M30 150 A120 120 0 0 1 150 30" stroke="var(--color-orange)" stroke-width="2" fill="none" opacity="0.2" />

      <!-- Segment dots -->
      <circle cx="150" cy="30" r="4" fill="var(--color-orange)" />
      <circle cx="270" cy="150" r="4" fill="var(--color-orange)" opacity="0.8" />
      <circle cx="150" cy="270" r="4" fill="var(--color-orange)" opacity="0.6" />
      <circle cx="30" cy="150" r="4" fill="var(--color-orange)" opacity="0.4" />
    </g>

    <!-- Center crosshair (static) -->
    <line x1="145" y1="150" x2="155" y2="150" stroke="var(--color-reg-mark)" stroke-width="0.5" />
    <line x1="150" y1="145" x2="150" y2="155" stroke="var(--color-reg-mark)" stroke-width="0.5" />
    <circle cx="150" cy="150" r="2" fill="var(--color-orange)" />
  </svg>

  <!-- Labels (static, outside the rotating group) -->
  <div class="flywheel-labels">
    {#each segments as seg}
      <span class="flywheel-label" style="--angle: {seg.angle}deg;">
        {seg.label}
      </span>
    {/each}
  </div>
</div>

<style>
  .flywheel-container {
    position: relative;
    width: 300px;
    height: 300px;
    margin: var(--sp-34) auto;
  }

  .flywheel-svg {
    width: 100%;
    height: 100%;
  }

  .flywheel-labels {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .flywheel-label {
    position: absolute;
    font-family: var(--font-mono);
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    color: var(--color-text-muted);
    text-transform: uppercase;
  }

  .flywheel-label:nth-child(1) { top: 5px; left: 50%; transform: translateX(-50%); }
  .flywheel-label:nth-child(2) { right: -10px; top: 50%; transform: translateY(-50%); }
  .flywheel-label:nth-child(3) { bottom: 5px; left: 50%; transform: translateX(-50%); }
  .flywheel-label:nth-child(4) { left: -10px; top: 50%; transform: translateY(-50%); }
</style>
