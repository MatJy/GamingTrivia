<script>
  import arvottuTieto from './tietoStore';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let valittuOikea;
  export let valittuVaara;
  export let disabloitu;

  function valitseVastaus(vastaus) {
    dispatch('valittu', vastaus);
  }

  let tyyppi = '';
  let vaara = [];
  let oikea = '';

  let vaihtoehdot = [];

  // Kun kutsutaan, se tekee uuden listan vaihtoetoisia vastauksia
  function paivita() {
    vaara = $arvottuTieto.incorrect_answers.map((vastaus) =>
      vastaus.replace(/&|;|#039|quot|rsquot/gi, '')
    );

    oikea = $arvottuTieto.correct_answer.replace(/&|;|#039|quot|rsquot/gi, '');
    vaihtoehdot = [...vaara, oikea];
  }

  // sekoittaa vaihtoehdot, jotta ne olisivat satunnaisessa järjestyksessä
  function sekoita() {
    // koodin löysin stack overflowsta ja muokkasin omiin tarpeisiin sopivaksi https://stackoverflow.com/a/12646864
    for (let i = vaihtoehdot.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = vaihtoehdot[i];
      vaihtoehdot[i] = vaihtoehdot[j];
      vaihtoehdot[j] = temp;
    }
  }

  $: {
    tyyppi = $arvottuTieto.type;
    paivita();
    sekoita();
  }
</script>

{#if tyyppi === 'multiple'}
  {#each vaihtoehdot as vaihtoehto}
    <div class="buttons">
      <button
        class:correct={valittuOikea && vaihtoehto === oikea}
        class:incorrect={valittuVaara &&
          vaihtoehto === vaara.find((v) => v === vaihtoehto)}
        on:click={() => valitseVastaus(vaihtoehto)}
        disabled={disabloitu}>{vaihtoehto}</button
      >
    </div>
  {/each}
{:else if tyyppi === 'boolean'}
  <div class="buttons">
    <button
      class:correct={valittuOikea && 'True' === oikea}
      on:click={() => valitseVastaus('True')}
      class:incorrect={valittuVaara &&
        'True' === vaara.find((v) => v === 'True')}
      disabled={disabloitu}>True</button
    >
    <button
      class:correct={valittuOikea && 'False' === oikea}
      class:incorrect={valittuVaara &&
        'False' === vaara.find((v) => v === 'False')}
      on:click={() => valitseVastaus('False')}>False</button
    >
  </div>
{:else}
  <p></p>
{/if}

<style>
  .buttons {
    display: flex;
    justify-content: center;
    margin: 2%;
  }

  button {
    font-size: x-large;
    padding: 0.5em 2em;
    border: transparent;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    background: dodgerblue;
    color: white;
    border-radius: 4px;
    margin-left: 2%;
  }

  .correct {
    background: lightgreen;
  }

  .incorrect {
    background: red;
  }

  .incorrect:hover {
    background: red;
  }

  .correct:hover {
    background: lightgreen;
  }

  button:hover {
    background: rgb(2, 0, 36);
    background: linear-gradient(
      90deg,
      rgba(30, 144, 255, 1) 0%,
      rgba(0, 212, 255, 1) 100%
    );
  }

  button:active {
    transform: translate(0em, 0.2em);
  }
</style>
