/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const { assert } = require("devtools/shared/DevToolsUtils");
const { breakdownEquals, createSnapshot } = require("../utils");
const { actions, snapshotState: states } = require("../constants");
const { refreshSelectedCensus } = require("./snapshot");

const setBreakdownAndRefresh = exports.setBreakdownAndRefresh = function (heapWorker, breakdown) {
  return function *(dispatch, getState) {
    // Clears out all stored census data and sets the breakdown.
    dispatch(setBreakdown(breakdown));
    yield dispatch(refreshSelectedCensus(heapWorker));
  };
};

/**
 * Clears out all census data in the snapshots and sets
 * a new breakdown.
 *
 * @param {Breakdown} breakdown
 */
const setBreakdown = exports.setBreakdown = function (breakdown) {
  assert(typeof breakdown === "object" && breakdown.by,
    `Breakdowns must be an object with a \`by\` property, attempted to set: ${uneval(breakdown)}`);

  return {
    type: actions.SET_BREAKDOWN,
    breakdown,
  }
};
