<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import { tweened } from 'svelte/motion';
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';

  export let montaKysymysta;
  export let pisteet;

  const valmiusTween = tweened(0, {
    duration: 10000,
  });

  valmiusTween.set(1);

  function progressValmis() {
    valmiusTween.set(0);
    dispatch('valmis');
  }

  // kun progress on valmis eli täynnä, suoritetaan progressValmis funktio
  onMount(() => {
    valmiusTween.subscribe((value) => {
      if (value === 1) {
        progressValmis();
      }
    });
  });
</script>

<main>
  <div class="scorecard" transition:slide>
    <div class="progressio">
      <p class="sulkeudu">Closes:</p>
      <progress value={$valmiusTween} />
    </div>

    <h2>Trivia complete</h2>
    <h3>Correct answers</h3>
    <p class="tulos">{pisteet} of {montaKysymysta}</p>
    <br />
    <button on:click={progressValmis}>Return</button>
    <br />
  </div>
</main>

<style>
  .sulkeudu {
    font-size: medium;
  }

  .progressio {
    text-align: center;
  }
  h2 {
    color: white;
    font-size: 6vh;
    text-align: center;
  }
  h3 {
    color: white;
    font-size: 5vh;
    text-align: center;
    margin: 0;
  }
  .tulos {
    color: white;
    font-size: xx-large;
    text-align: center;
    margin: 0;
  }

  button {
    text-align: center;
    margin: 5% 20%;
    font-size: 3vh;
  }

  .scorecard {
    background-color: purple;
    justify-content: center;
    display: grid;
    margin: 5% 35%;
    /* border-style: inherit; */
    border-radius: 2em;
  }
</style>
