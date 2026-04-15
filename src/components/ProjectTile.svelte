<script lang="ts">
  import type { Project } from '../data/projects';
  import { stages, stageLabels, categoryLabels } from '../data/projects';

  let { project, onclick }: { project: Project; onclick: () => void } = $props();

  const currentStageIndex = $derived(stages.indexOf(project.stage));

  const stageColorVar = $derived(`var(--stage-${project.stage})`);
</script>

<button class="tile tile-hover" onclick={onclick}>
  <!-- Corner crop marks -->
  <svg class="tile__crop tile__crop--tl" width="12" height="12" viewBox="0 0 12 12">
    <path d="M0 4 L0 0 L4 0" stroke="currentColor" stroke-width="0.75" fill="none" />
  </svg>
  <svg class="tile__crop tile__crop--br" width="12" height="12" viewBox="0 0 12 12">
    <path d="M12 8 L12 12 L8 12" stroke="currentColor" stroke-width="0.75" fill="none" />
  </svg>

  <div class="tile__header">
    <span class="tile__category">{categoryLabels[project.category]}</span>
    <span class="tile__stage-dot" style="background: {stageColorVar};" title={stageLabels[project.stage]}></span>
  </div>

  <h3 class="tile__name">{project.name}</h3>
  <p class="tile__tagline">{project.tagline}</p>

  {#if project.domain}
    <span class="tile__domain">{project.domain}</span>
  {/if}

  <!-- Stage progress -->
  <div class="tile__stages">
    {#each stages as s, i}
      <div
        class="tile__stage-pip"
        class:past={i < currentStageIndex}
        class:current={i === currentStageIndex}
        class:future={i > currentStageIndex}
        style={i === currentStageIndex ? `background: ${stageColorVar};` : ''}
      ></div>
    {/each}
  </div>
</button>

<style>
  .tile {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--sp-8);
    padding: var(--sp-21);
    background: var(--color-bg-elevated);
    border: 1px solid var(--color-grid-line);
    cursor: pointer;
    text-align: left;
    font-family: var(--font-mono);
    color: var(--color-text);
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
  }

  .tile__crop {
    position: absolute;
    color: var(--color-reg-mark);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .tile__crop--tl { top: 4px; left: 4px; }
  .tile__crop--br { bottom: 4px; right: 4px; }

  .tile:hover .tile__crop {
    opacity: 1;
    color: var(--color-orange);
  }

  .tile__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .tile__category {
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  .tile__stage-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .tile__name {
    font-size: 1.25rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: auto;
  }

  .tile__tagline {
    font-size: 0.75rem;
    font-weight: 300;
    color: var(--color-text-muted);
    line-height: 1.4;
  }

  .tile__domain {
    font-size: 0.6rem;
    color: var(--color-orange-dim);
    letter-spacing: 0.1em;
  }

  .tile__stages {
    display: flex;
    gap: 3px;
    margin-top: auto;
  }

  .tile__stage-pip {
    width: 16px;
    height: 2px;
    border-radius: 1px;
  }

  .tile__stage-pip.past {
    background: var(--color-text-muted);
    opacity: 0.4;
  }

  .tile__stage-pip.current {
    /* set inline */
  }

  .tile__stage-pip.future {
    background: var(--color-grid-line);
  }
</style>
