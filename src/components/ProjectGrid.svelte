<script lang="ts">
  import type { Project, ProjectCategory } from '../data/projects';
  import { categoryLabels } from '../data/projects';
  import ProjectTile from './ProjectTile.svelte';
  import ProjectModal from './ProjectModal.svelte';
  import { onMount } from 'svelte';

  let { projects }: { projects: Project[] } = $props();

  let activeFilter: ProjectCategory | 'all' = $state('all');
  let selectedProject: Project | null = $state(null);
  let gridEl: HTMLElement | undefined = $state();

  const filteredProjects = $derived(
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)
  );

  const categories = $derived(
    ['all', ...new Set(projects.map((p) => p.category))] as (ProjectCategory | 'all')[]
  );

  function openProject(project: Project) {
    selectedProject = project;
  }

  function closeModal() {
    selectedProject = null;
  }

  onMount(() => {
    if (!gridEl) return;

    // Staggered entrance via GSAP if available
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const tiles = gridEl!.querySelectorAll('.tile-wrapper');
        gsap.fromTo(
          tiles,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridEl,
              start: 'top 80%',
              once: true,
            },
          }
        );
      });
    });
  });
</script>

<div class="filter-bar">
  {#each categories as cat}
    <button
      class="filter-pill"
      class:active={activeFilter === cat}
      onclick={() => (activeFilter = cat)}
    >
      {cat === 'all' ? 'All' : categoryLabels[cat]}
    </button>
  {/each}
</div>

<div class="project-grid" bind:this={gridEl}>
  {#each filteredProjects as project (project.id)}
    <div class="tile-wrapper">
      <ProjectTile {project} onclick={() => openProject(project)} />
    </div>
  {/each}

  <!-- Ghost cells to fill the grid -->
  {#each Array(Math.max(0, 8 - filteredProjects.length)) as _}
    <div class="ghost-cell"></div>
  {/each}
</div>

{#if selectedProject}
  <ProjectModal project={selectedProject} onclose={closeModal} />
{/if}

<style>
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-5);
    margin-bottom: var(--sp-21);
  }

  .filter-pill {
    font-family: var(--font-mono);
    font-size: 0.625rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: var(--sp-5) var(--sp-13);
    background: transparent;
    border: 1px solid var(--color-grid-line);
    color: var(--color-text-muted);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .filter-pill:hover {
    border-color: var(--color-orange-dim);
    color: var(--color-text);
  }

  .filter-pill.active {
    border-color: var(--color-orange);
    color: var(--color-orange);
    background: var(--color-orange-glow);
  }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--sp-3);
  }

  .tile-wrapper {
    opacity: 0; /* GSAP will animate this in */
  }

  .ghost-cell {
    aspect-ratio: 1;
    border: 1px solid var(--color-grid-line);
    opacity: 0.3;
  }

  @media (max-width: 1199px) {
    .project-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .project-grid {
      grid-template-columns: 1fr;
    }

    .ghost-cell {
      display: none;
    }
  }
</style>
