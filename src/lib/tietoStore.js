import { writable } from 'svelte/store';

const arvottuTieto = writable({
  type: '',
  difficulty: '',
  category: '',
  question: '',
  correct_answer: '',
  incorrect_answers: [],
});

export default arvottuTieto;
