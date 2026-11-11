/* Supplemental interactive demonstrations for Session 03.
 * This script simulates output for teaching. It does NOT execute Dart source.
 * The copyable snippets alongside each simulation contain real Dart code.
 */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const sim = $('nullSimulator');
  if (sim) {
    let scenario = 'present';
    let operation = 'check';
    const expressions = {
      check: 'if (name != null) print(name.length);',
      access: 'print(name?.toUpperCase());',
      fallback: "print(name ?? 'Guest');",
      assign: "name ??= 'Guest'; print(name);",
      assert: 'print(name!.length);'
    };
    function render() {
      const missing = scenario === 'missing';
      const original = missing ? 'null' : "'Mira'";
      let result, explanation, warning = false;
      switch (operation) {
        case 'check':
          result = missing ? 'Branch skipped (name is null)' : '4';
          explanation = missing ? 'The null check is false. The guarded code is skipped, preventing an unsafe access.' : 'The check is true. Flow analysis promotes name from String? to String inside the block.';
          break;
        case 'access':
          result = missing ? 'null' : 'MIRA';
          explanation = missing ? 'The receiver is null. ?. skips the method call and yields null; no crash.' : 'The receiver exists, so toUpperCase() runs and returns MIRA.';
          break;
        case 'fallback':
          result = missing ? 'Guest (name stays null)' : 'Mira (name stays Mira)';
          explanation = missing ? "?? returns the fallback 'Guest', but does not assign it to name." : '?? returns the current name because it is not null. The fallback is ignored.';
          break;
        case 'assign':
          result = missing ? "Guest (name becomes 'Guest')" : "Mira (name stays 'Mira')";
          explanation = missing ? '??= writes the fallback into name only because name is null.' : '??= does not overwrite an existing non-null name.';
          break;
        case 'assert':
          warning = missing;
          result = missing ? 'Runtime exception: null-check operator used on a null value' : '4';
          explanation = missing ? 'The ! assertion is false: executing this expression in Dart would throw. The teaching simulation does not crash.' : 'This value is non-null, so ! succeeds, but a check is safer when absence is possible.';
          break;
      }
      $('simBefore').textContent = `String? name = ${original};`;
      $('simExpression').textContent = expressions[operation];
      $('simAfter').textContent = result;
      const verdict = $('simVerdict');
      verdict.textContent = explanation;
      verdict.classList.toggle('warning', warning);
      sim.querySelectorAll('[data-null-value]').forEach(btn => {
        const active = btn.dataset.nullValue === scenario;
        btn.classList.toggle('active', active);btn.setAttribute('aria-pressed', String(active));
      });
      sim.querySelectorAll('[data-null-op]').forEach(btn => {
        const active = btn.dataset.nullOp === operation;
        btn.classList.toggle('active', active);btn.setAttribute('aria-pressed', String(active));
      });
    }
    sim.querySelectorAll('[data-null-value]').forEach(btn => btn.addEventListener('click', () => {scenario = btn.dataset.nullValue;render();}));
    sim.querySelectorAll('[data-null-op]').forEach(btn => btn.addEventListener('click', () => {operation = btn.dataset.nullOp;render();}));
    render();
  }

  // Mimic the Dart double.tryParse(input) result in this input-focused demo.
  function parseDartDouble(text) {
    const value = text.trim();
    if (!value || !/^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/.test(value)) return null;
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
  }
  const calc = $('calcSimulator');
  if (calc) {
    const run = () => {
      const a = parseDartDouble($('calcA').value), b = parseDartDouble($('calcB').value);
      const result = $('calcResult');
      if (a === null || b === null) {
        result.textContent = 'Invalid input: enter two valid numbers. Dart double.tryParse() would return null for the invalid value.';
        result.classList.add('warning');return;
      }
      const parts = [`Sum: ${a+b}`,`Difference: ${a-b}`,`Product: ${a*b}`, b === 0 ? 'Cannot divide by zero' : `Quotient: ${a/b}`];
      result.textContent = parts.join('  ·  ');
      result.classList.toggle('warning', b === 0);
    };
    $('calcRun').addEventListener('click',run);
    ['calcA','calcB'].forEach(id => $(id).addEventListener('keydown', e => {if (e.key === 'Enter') run();}));
  }

  const guess = $('guessSimulator');
  if (guess) {
    let target = 0, attempts = 0, finished = false;
    const reset = () => {
      target = Math.floor(Math.random()*100)+1;
      attempts = 0;finished = false;
      $('guessInput').value = '';
      $('guessResult').textContent = 'A new secret number is ready. Valid integer guesses count as attempts.';
      $('guessResult').classList.remove('warning');
      $('guessHistory').replaceChildren();
      $('guessInput').focus();
    };
    const run = () => {
      if (finished) { $('guessResult').textContent = 'You solved this round. Select New game to play again.'; return; }
      const raw = $('guessInput').value.trim();
      const parsed = /^[+-]?\d+$/.test(raw) ? Number(raw) : NaN;
      const result = $('guessResult');
      if (!Number.isSafeInteger(parsed) || parsed < 1 || parsed > 100) {
        result.textContent = 'Please enter a valid whole number from 1 to 100. This does not count as an attempt.';
        result.classList.add('warning');return;
      }
      attempts++;
      const hint = parsed < target ? 'Too low' : parsed > target ? 'Too high' : `Correct in ${attempts} valid attempt${attempts===1?'':'s'}`;
      const chip = document.createElement('span');chip.textContent = `${parsed} · ${hint}`;$('guessHistory').append(chip);
      result.textContent = hint + (parsed===target ? '!' : '! Try again.');
      result.classList.remove('warning');
      if (parsed===target) finished=true;
      $('guessInput').value = '';
      $('guessInput').focus();
    };
    $('guessRun').addEventListener('click',run);
    $('guessReset').addEventListener('click',reset);
    $('guessInput').addEventListener('keydown', e => {if (e.key==='Enter') run();});
    // Initial value is not exposed to the learner.
    target = Math.floor(Math.random()*100)+1;
  }
})();
