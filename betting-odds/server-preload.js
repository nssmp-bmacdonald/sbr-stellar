// @ts-check
"use strict"

/**
 * Set up datadog tracing. This should be called first, so Datadog can hook
 * all the other dependencies like `http`.
 */
function setUpDatadogTracing() {
  const { tracer: Tracer } = require('dd-trace')
  const tracer = Tracer.init({
    // Your options here.
    runtimeMetrics: true,
    logInjection: true,
  })
}

setUpDatadogTracing()
