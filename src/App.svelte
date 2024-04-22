<script>
  import Question from './lib/Question.svelte';
  import Score from './lib/Score.svelte';

  let vaikeustaso = '';
  let valittu = false;
  const montaKysymysta = 5;
  let kysymysNro = 0;
  let pisteet = 0;
  let kysytyt = [];

  function valitseVaikeus(vaikeus) {
    valittu = true;
    vaikeustaso = vaikeus;
  }
  function takaisin() {
    valittu = false;
    kysymysNro = 0;
    pisteet = 0;
    kysytyt = [];
  }
</script>

<main>
  <body>
    <header>
      <h1>GamingTrivia</h1>
    </header>
    {#if !valittu}
      <p class="desc">
        Welcome to GamingTrivia, where your gaming knowledge gets put to the
        test! Dive into a world of fun facts, obscure references, and legendary
        moments from your favorite games. Challenge yourself. Get ready to level
        up your gaming IQ and embark on an epic journey through gaming history.
        Let the quest for knowledge begin!
      </p>
      <p class="desc">
        Next, i need you to choose your difficulty and then you will answer {montaKysymysta}
        gaming themed questions based on the diffuculty you'll choose
      </p>
      <div class="vaikeus">
        <p>Choose your Difficulty</p>
        <button id="bottone1" on:click={() => valitseVaikeus('easy')}
          >Easy</button
        >
        <br />
        <br />
        <button id="bottone1" on:click={() => valitseVaikeus('medium')}
          >Medium</button
        >
        <br />
        <br />
        <button id="bottone1" on:click={() => valitseVaikeus('hard')}
          >Hard</button
        >
        <br />
      </div>
    {:else if kysymysNro > montaKysymysta}
      <Score {montaKysymysta} bind:pisteet on:valmis={takaisin} />
    {:else}
      <p>Difficulty: {vaikeustaso}</p>
      <Question
        {vaikeustaso}
        bind:kysymysNro
        bind:pisteet
        bind:kysytyt
        {montaKysymysta}
      />
      <br />
    {/if}
  </body>
</main>
