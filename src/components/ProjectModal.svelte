<script lang="ts">
  import type { Project } from '../data/projects';
  import { stages, stageLabels, categoryLabels } from '../data/projects';
  import { onMount } from 'svelte';

  let { project, onclose }: { project: Project; onclose: () => void } = $props();

  const currentStageIndex = $derived(stages.indexOf(project.stage));
  const stageColorVar = $derived(`var(--stage-${project.stage})`);

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') onclose();
  }

  function handleOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onclose();
    }
  }

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
    };
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="modal-overlay" onclick={handleOverlayClick}>
  <div class="modal-card" role="dialog" aria-modal="true" aria-label={project.name}>
    <!-- Close button -->
    <button class="modal-close" onclick={onclose} aria-label="Close">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" stroke-width="1.5" />
        <rect x="1" y="1" width="18" height="18" stroke="currentColor" stroke-width="0.5" opacity="0.3" />
      </svg>
    </button>

    <!-- Crop marks -->
    <svg class="modal-crop modal-crop--tl" width="16" height="16" viewBox="0 0 16 16">
      <path d="M0 6 L0 0 L6 0" stroke="currentColor" stroke-width="0.75" fill="none" />
    </svg>
    <svg class="modal-crop modal-crop--tr" width="16" height="16" viewBox="0 0 16 16">
      <path d="M16 6 L16 0 L10 0" stroke="currentColor" stroke-width="0.75" fill="none" />
    </svg>
    <svg class="modal-crop modal-crop--bl" width="16" height="16" viewBox="0 0 16 16">
      <path d="M0 10 L0 16 L6 16" stroke="currentColor" stroke-width="0.75" fill="none" />
    </svg>
    <svg class="modal-crop modal-crop--br" width="16" height="16" viewBox="0 0 16 16">
      <path d="M16 10 L16 16 L10 16" stroke="currentColor" stroke-width="0.75" fill="none" />
    </svg>

    <!-- Header -->
    <div class="modal-header">
      <span class="modal-category">{categoryLabels[project.category]}</span>
      <span class="modal-id">#{project.id.toUpperCase()}</span>
    </div>

    <h2 class="modal-title">{project.name}</h2>
    <p class="modal-tagline">{project.tagline}</p>

    <!-- Stage progress -->
    <div class="modal-stages">
      {#each stages as s, i}
        <div class="modal-stage" class:past={i < currentStageIndex} class:current={i === currentStageIndex} class:future={i > currentStageIndex}>
          <div
            class="modal-stage__dot"
            style={i <= currentStageIndex ? `background: ${i === currentStageIndex ? stageColorVar : 'var(--color-text-muted)'};` : ''}
          ></div>
          <span class="modal-stage__label">{stageLabels[s]}</span>
        </div>
      {/each}
    </div>

    <div class="modal-divider"></div>

    <!-- Description -->
    <p class="modal-description">{project.description}</p>

    <!-- Details grid -->
    <div class="modal-details">
      {#if project.tech.length > 0}
        <div class="modal-detail">
          <span class="modal-detail__label">Stack</span>
          <span class="modal-detail__value">{project.tech.join(' / ')}</span>
        </div>
      {/if}

      <div class="modal-detail">
        <span class="modal-detail__label">Founders</span>
        <span class="modal-detail__value">{project.founders.join(', ')}</span>
      </div>

      {#if project.domain}
        <div class="modal-detail">
          <span class="modal-detail__label">Domain</span>
          <span class="modal-detail__value">{project.domain}</span>
        </div>
      {/if}
    </div>

    <!-- External link -->
    {#if project.url}
      <a href={project.url} target="_blank" rel="noopener noreferrer" class="modal-link">
        <span>Visit {project.domain}</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M4 10 L10 4 M6 4 L10 4 L10 8" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </a>
    {/if}
  </div>
</div>

<style>
  .modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: oklch(0.05 0.005 250 / 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--sp-21);
    animation: overlay-in 0.25s ease;
  }

  @keyframes overlay-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal-card {
    position: relative;
    background: var(--color-bg-elevated);
    border: 1px solid var(--color-grid-line);
    padding: var(--sp-34);
    max-width: 640px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    animation: card-in 0.3s ease;
  }

  @keyframes card-in {
    from { opacity: 0; transform: translateY(20px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .modal-close {
    position: absolute;
    top: var(--sp-13);
    right: var(--sp-13);
    background: none;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
    padding: var(--sp-5);
    transition: color 0.2s ease;
  }

  .modal-close:hover {
    color: var(--color-orange);
  }

  .modal-crop {
    position: absolute;
    color: var(--color-orange-dim);
  }

  .modal-crop--tl { top: 6px; left: 6px; }
  .modal-crop--tr { top: 6px; right: 6px; }
  .modal-crop--bl { bottom: 6px; left: 6px; }
  .modal-crop--br { bottom: 6px; right: 6px; }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--sp-13);
  }

  .modal-category {
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-orange);
  }

  .modal-id {
    font-size: 0.55rem;
    letter-spacing: 0.15em;
    color: var(--color-reg-mark);
  }

  .modal-title {
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--sp-5);
  }

  .modal-tagline {
    font-size: 0.875rem;
    font-weight: 300;
    color: var(--color-text-muted);
    margin-bottom: var(--sp-21);
  }

  .modal-stages {
    display: flex;
    gap: var(--sp-8);
    margin-bottom: var(--sp-21);
  }

  .modal-stage {
    display: flex;
    align-items: center;
    gap: var(--sp-3);
  }

  .modal-stage__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid var(--color-grid-line);
  }

  .modal-stage.past .modal-stage__dot {
    border: none;
    opacity: 0.5;
  }

  .modal-stage.current .modal-stage__dot {
    border: none;
  }

  .modal-stage__label {
    font-size: 0.55rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  .modal-stage.current .modal-stage__label {
    color: var(--color-text);
  }

  .modal-divider {
    height: 1px;
    background: var(--color-grid-line);
    margin: var(--sp-21) 0;
  }

  .modal-description {
    font-size: 0.875rem;
    line-height: 1.7;
    color: var(--color-text);
    font-weight: 300;
    margin-bottom: var(--sp-21);
  }

  .modal-details {
    display: flex;
    flex-direction: column;
    gap: var(--sp-8);
    margin-bottom: var(--sp-21);
  }

  .modal-detail {
    display: flex;
    gap: var(--sp-13);
  }

  .modal-detail__label {
    font-size: 0.625rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    min-width: 80px;
  }

  .modal-detail__value {
    font-size: 0.75rem;
    color: var(--color-text);
  }

  .modal-link {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-5);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-orange);
    padding: var(--sp-8) var(--sp-13);
    border: 1px solid var(--color-orange);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .modal-link:hover {
    background: var(--color-orange-glow);
    text-decoration: none;
  }

  @media (max-width: 768px) {
    .modal-card {
      padding: var(--sp-21);
      max-height: 100vh;
      height: 100%;
    }

    .modal-overlay {
      padding: 0;
    }

    .modal-stages {
      flex-wrap: wrap;
    }
  }
</style>
