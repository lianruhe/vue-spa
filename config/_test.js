import { argv } from 'yargs'

const coverageEnabled = !argv.watch

const coverageReporters = [
  { type: 'lcov' }
]

if (coverageEnabled) {
  coverageReporters.push(
    { type: 'json-summary', file: 'lcov.json' }
  )
} else {
  coverageReporters.push(
    { type: 'text-summary' }
  )
}

export default config => ({
  compilerDevtool: 'inline-source-map',
  coverageEnabled,
  coverageReporters
})
