<script>
  import { onMount } from 'svelte';
  import arvottuTieto from './tietoStore';
  import Choises from './Choises.svelte';

  export let vaikeustaso;
  export { kysymysNro, pisteet, kysytyt };
  export let montaKysymysta;
  let randomNumero;
  let kysytyt = [];

  let tiedot = [];
  let tieto = {};
  let nayta = false;
  let uusiKysymys = '';

  let kysymysNro = 0;
  let pisteet = 0;

  //Hae kysymys apista

  onMount(async () => {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=50&category=15&difficulty=${vaikeustaso}`
    );
    if (!response.ok) {
      throw new Error('Question not found');
    }

    tiedot = await response.json();
    paivita();
    nayta = true;
  });

  let valittuVastaus = '';

  let valittuOikea;
  let valittuVaara;
  let disabloitu = false;

  // näyttää uuden satunnaises kysymyksen
  function paivita() {
    // silmukka, jossa katsotaan onko kysymys jo kysytty.
    while (true) {
      //generoi satunnainen numero väliltä 0-50

      randomNumero = Math.floor(Math.random() * 50);

      if (!kysytyt.includes(randomNumero)) {
        kysytyt.push(randomNumero);
        kysytyt = kysytyt;
        break;
      } else {
        console.log('Kysymys on jo kysytty, haetaan uusi luku');
        continue;
      }
    }

    // @ts-ignore
    tieto = tiedot.results[randomNumero];
    valittuOikea = false;
    valittuVaara = false;
    disabloitu = false;
    kysymysNro++;
    if (kysymysNro > montaKysymysta) {
      nayta = false;
    }

    // Poistetaan kysymyksen ja oikean vastauksen turhat merkit, mitä API:sta tulee
    tieto.correct_answer.replace(/&|;|#039|quot|rsquot/gi, '');
    uusiKysymys = tieto.question.replace(/&|;|#039|quot|rsquot/gi, '');
    vieTieto();
  }

  // käsittele valittu vastaus

  function kasitteleValittu(e) {
    valittuVastaus = e.detail;
    disabloitu = true;
    if (valittuVastaus === tieto.correct_answer) {
      pisteet++;
      valittuOikea = true;
    } else {
      valittuVaara = true;
    }
    setTimeout(paivita, 1000);
  }

  const vieTieto = () =>
    arvottuTieto.set({
      type: tieto.type,
      difficulty: tieto.difficulty,
      category: tieto.category,
      question: tieto.question,
      correct_answer: tieto.correct_answer,
      incorrect_answers: tieto.incorrect_answers,
    });
</script>

{#if nayta}
  <p>Question number {kysymysNro}</p>
  <p>{uusiKysymys}</p>
  <div>
    <Choises
      on:valittu={kasitteleValittu}
      {valittuOikea}
      {valittuVaara}
      {disabloitu}
    />
  </div>
{:else}
  <p>Loading...</p>
{/if}

<style>
</style>
