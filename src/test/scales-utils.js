// Copyright (c) 2016 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import test from 'tape';
import 'babel-polyfill';

import {getScaleObjectFromProps} from '../lib/utils/scales-utils';

function isScaleConsistent(scaleObject, attr) {
  return scaleObject && scaleObject.range && scaleObject.domain &&
    scaleObject.type && scaleObject.attr === attr;
}

const _allData = [{x: 1}, {x: 2}, {x: 3}, {x: 2}];
const xRange = [0, 100];
const xDomain = [1, 5];
const xType = 'ordinal';
const xDistance = 10;

test('getScaleObjectFromProps with empty props', function t(assert) {
  const nullResult = getScaleObjectFromProps({}, 'x');
  assert.ok(nullResult === null, 'Should return null if no props available.');
  assert.end();
});

test('getScaleObjectFromProps with empty range', function t(assert) {
  const noRangeResult = getScaleObjectFromProps({_allData}, 'x');
  assert.ok(noRangeResult === null, 'Should be null if no range is passed');
  assert.end();
});

test('getScaleObjectFromProps with incomplete props', function t(assert) {
  const incompleteResult = getScaleObjectFromProps({xRange, _allData}, 'x');
  assert.ok(isScaleConsistent(incompleteResult, 'x'),
    'Should be a consistent scale');
  assert.ok(incompleteResult.type === 'linear', 'Should be linear by detault');
  assert.end();
});

test('getScaleObjectFromProps with all props', function t(assert) {
  const completeResult = getScaleObjectFromProps(
    {xRange, _allData, xDomain, xType, xDistance}, 'x');
  assert.ok(isScaleConsistent(completeResult, 'x'),
    'Should be a consistent scale');
  assert.ok(completeResult.type === xType,
    'Should have same type that was passed by detault');
  assert.end();
});

test('getScaleObjectFromProps with the value that overrides props', function t(
  assert) {
  const valueResult = getScaleObjectFromProps({x: 10, _allData}, 'x');
  assert.ok(isScaleConsistent(valueResult, 'x'),
    'Should be a consistent scale');
  assert.ok(valueResult.isValue === true,
    'Should have isValue = true');
  assert.end();
});

