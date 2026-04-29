#!/usr/bin/env node

"use strict";

/**
 * Standalone SM-2 validation harness.
 *
 * Production logic is intentionally mirrored here as a pure function so we can
 * validate deterministic state transitions without touching runtime behaviour.
 */

const DAY_MS = 24 * 60 * 60 * 1000;
const BASE_ISO = Date.UTC(2026, 0, 1, 12, 0, 0, 0);
const MIN_EASE_FACTOR = 1.3;

function dayToIso(day) {
  return new Date(BASE_ISO + Math.max(0, Number(day || 0)) * DAY_MS).toISOString();
}

function isoToDay(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 0;
  return Math.max(0, Math.round((date.getTime() - BASE_ISO) / DAY_MS));
}

function createVirtualClock(startDay = 0) {
  let currentDay = Math.max(0, Number(startDay || 0));
  return {
    nowDay() {
      return currentDay;
    },
    nowIso() {
      return dayToIso(currentDay);
    },
    advanceTime(days = 1) {
      currentDay += Math.max(0, Number(days || 0));
      return currentDay;
    },
  };
}

function normalizeState(input = {}, fallbackDay = 0) {
  const nextReviewDay = Number.isFinite(Number(input.nextReviewDay))
    ? Math.max(0, Number(input.nextReviewDay))
    : isoToDay(input.nextReviewDate || dayToIso(fallbackDay));

  return {
    repetitions: Math.max(0, Number(input.repetitions || 0) || 0),
    interval: Math.max(0, Number(input.interval || 0) || 0),
    easeFactor: Math.max(MIN_EASE_FACTOR, Number(input.easeFactor || input.EF || 2.5) || 2.5),
    nextReviewDay,
    nextReviewDate: dayToIso(nextReviewDay),
    mistakeCount: Math.max(0, Number(input.mistakeCount || 0) || 0),
    strength: ["WEAK", "MEDIUM", "STRONG"].includes(input.strength) ? input.strength : "WEAK",
    consecutiveEasy: Math.max(0, Number(input.consecutiveEasy || 0) || 0),
    hifdhStage: ["NEW", "LEARNING", "REVISING", "MASTERED"].includes(input.hifdhStage)
      ? input.hifdhStage
      : "NEW",
  };
}

function applySm2Pure(cardState, rating, currentDay) {
  const state = normalizeState(cardState, currentDay);
  const grade = Math.max(0, Math.min(5, Number(rating || 0)));

  if (grade < 3) {
    state.repetitions = 0;
    state.interval = 1;
    state.strength = "WEAK";
    state.mistakeCount += 1;
    state.consecutiveEasy = 0;
  } else {
    state.repetitions += 1;
    if (state.repetitions === 1) state.interval = 1;
    else if (state.repetitions === 2) state.interval = 6;
    else state.interval = Math.max(1, Math.round(state.interval * state.easeFactor));

    const delta = 0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02);
    state.easeFactor = Math.max(MIN_EASE_FACTOR, state.easeFactor + delta);
    state.consecutiveEasy = grade === 5 ? state.consecutiveEasy + 1 : 0;

    if (state.consecutiveEasy >= 3) state.strength = "STRONG";
    else if (state.repetitions >= 2) state.strength = "MEDIUM";
  }

  state.nextReviewDay = currentDay + Math.max(1, Math.round(state.interval));
  state.nextReviewDate = dayToIso(state.nextReviewDay);

  return state;
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertStateTransition(previous, next, rating, currentDay, label) {
  const fields = [
    ["repetitions", next.repetitions],
    ["interval", next.interval],
    ["easeFactor", next.easeFactor],
    ["nextReviewDay", next.nextReviewDay],
  ];

  fields.forEach(([name, value]) => {
    assert(value !== undefined, `${label}: ${name} is undefined after rating ${rating}`);
    assert(!Number.isNaN(Number(value)), `${label}: ${name} is NaN after rating ${rating}`);
  });

  assert(next.easeFactor >= MIN_EASE_FACTOR, `${label}: easeFactor below minimum after rating ${rating}`);
  assert(next.interval >= 0, `${label}: interval negative after rating ${rating}`);
  assert(next.repetitions >= 0, `${label}: repetitions negative after rating ${rating}`);
  assert(next.nextReviewDay >= currentDay + 1, `${label}: nextReviewDay did not move forward after rating ${rating}`);
  assert(next.nextReviewDate === dayToIso(next.nextReviewDay), `${label}: nextReviewDate desynced from nextReviewDay`);

  if (rating < 3) {
    assert(next.repetitions === 0, `${label}: failure rating should reset repetitions`);
    assert(next.interval === 1, `${label}: failure rating should reset interval to 1`);
    assert(next.nextReviewDay === currentDay + 1, `${label}: failure rating should schedule next day`);
  } else if (previous.repetitions === 0 && rating >= 3) {
    assert(next.repetitions === 1, `${label}: first success should set repetitions to 1`);
  }
}

function traceTransition(label, rating, previous, next) {
  const lines = [
    `[AYAH TEST] ${label}`,
    `rating: ${rating}`,
    `repetitions: ${previous.repetitions} -> ${next.repetitions}`,
    `interval: ${previous.interval} -> ${next.interval}`,
    `easeFactor: ${previous.easeFactor.toFixed(2)} -> ${next.easeFactor.toFixed(2)}`,
    `nextReviewDate: day-${previous.nextReviewDay} -> day-${next.nextReviewDay}`,
  ];
  console.log(lines.join("\n"));
}

function runScenario(name, ratings, options = {}) {
  const clock = createVirtualClock(options.startDay ?? 0);
  let state = normalizeState(options.initialState || {}, clock.nowDay());

  console.log(`\n=== ${name} ===`);

  ratings.forEach((rating, index) => {
    const dueDay = Math.max(clock.nowDay(), state.nextReviewDay);
    clock.advanceTime(Math.max(0, dueDay - clock.nowDay()));

    const previous = normalizeState(state, clock.nowDay());
    const next = applySm2Pure(previous, rating, clock.nowDay());

    traceTransition(`${name} step ${index + 1}`, rating, previous, next);
    assertStateTransition(previous, next, rating, clock.nowDay(), `${name} step ${index + 1}`);

    state = next;
    clock.advanceTime(1);
  });

  return state;
}

function createSeededRandom(seed = 42) {
  let value = Math.abs(Number(seed || 42)) % 2147483647;
  if (value === 0) value = 1;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function runStressScenario() {
  const random = createSeededRandom(99);
  const ratings = Array.from({ length: 100 }, () => Math.floor(random() * 6));
  return runScenario("D) STRESS TEST", ratings, {
    initialState: {
      repetitions: 0,
      interval: 0,
      easeFactor: 2.5,
      nextReviewDay: 0,
    },
  });
}

function runEdgeCases() {
  const results = [];
  results.push(runScenario("EDGE) repeated failures", [0, 0, 0, 0, 0]));
  results.push(runScenario("EDGE) repeated perfect scores", [5, 5, 5, 5, 5, 5]));
  results.push(runScenario("EDGE) alternating ratings", [5, 0, 5, 0, 5, 0, 5, 0]));
  results.push(runScenario("EDGE) rapid spam inputs", new Array(20).fill(3)));
  results.push(runScenario("EDGE) zero-initial state", [3, 4, 5], {
    initialState: {
      repetitions: 0,
      interval: 0,
      easeFactor: 0,
      nextReviewDay: 0,
    },
  }));
  return results[results.length - 1];
}

function main() {
  const scenarios = [
    () => runScenario("A) NORMAL PROGRESSION", [4, 4, 5, 4, 3]),
    () => runScenario("B) FAILURE HEAVY", [0, 0, 0, 0, 0]),
    () => runScenario("C) MIXED BEHAVIOUR", [4, 3, 5, 0, 4]),
    () => runStressScenario(),
    () => runEdgeCases(),
  ];

  const summary = [];

  try {
    scenarios.forEach((run) => {
      const finalState = run();
      summary.push({
        name: run.name || "scenario",
        finalState,
      });
    });

    console.log("\n=== SUMMARY ===");
    summary.forEach((entry, index) => {
      const state = entry.finalState;
      console.log(
        `PASS ${index + 1}: repetitions=${state.repetitions}, interval=${state.interval}, easeFactor=${state.easeFactor.toFixed(
          2
        )}, nextReviewDay=${state.nextReviewDay}`
      );
    });
    console.log(`\nResult: ${summary.length}/${summary.length} scenario groups passed.`);
  } catch (error) {
    console.error(`\nFAIL: ${error.message}`);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  applySm2Pure,
  createVirtualClock,
  dayToIso,
  isoToDay,
  normalizeState,
};
