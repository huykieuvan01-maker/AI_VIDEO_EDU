const { SAMPLE_PROBLEMS } = require('./sampleProblems.cjs');
SAMPLE_PROBLEMS.forEach((s, idx) => {
  console.log(idx, s.id, 'presetData:', !!s.presetData, 'presetReport:', !!s.presetReport);
});
