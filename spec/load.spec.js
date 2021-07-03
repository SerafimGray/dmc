/**
 * @jest-environment jsdom
*/
import {
  clearIntervalCheck,
  countPlaybackRate,
  prepareToAction,
  runAnimation,
  setPlaybackRate,
  setVideoSpeed,
  startAction,
  translatePlaybackRate,
  waitForWindowFocus
} from '../src/js/load';

beforeEach(() => {
  jest.useFakeTimers()
  document.body.innerHTML = `
    <body>
      <video id="background-video" />
    </body>
  `
})

afterEach(() => {
  jest.useRealTimers()
})

describe('clearIntervalCheck', () => {
  test('clears a timer if progress > 1', () => {
    const timer = jest.fn()
    const interval = setInterval(timer, 1000)
    jest.advanceTimersByTime(1000)
    expect(timer).toHaveBeenCalledTimes(1)
    const progress = 1.1
    clearIntervalCheck(interval, progress)
    jest.advanceTimersByTime(3000)
    expect(timer).toHaveBeenCalledTimes(1)
  })

  test('doesn\'t clear a timer if progress <= 1', () => {
    const timer = jest.fn()
    const interval = setInterval(timer, 1000)
    jest.advanceTimersByTime(1000)
    expect(timer).toHaveBeenCalledTimes(1)
    const progress = 1
    clearIntervalCheck(interval, progress)
    jest.advanceTimersByTime(3000)
    expect(timer).toHaveBeenCalledTimes(4)
  })
})

describe('countPlaybackRate', () => {
  test('returns playback rate depending on progress and method', () => {
    let playbackRate = countPlaybackRate(0, 1, 0.2, 'bezier')
    expect(playbackRate).toBeCloseTo(0.488)
    playbackRate = countPlaybackRate(1, 0.5, 0.8, 'linear')
    expect(playbackRate).toBe(0.6)
  })
})

describe('prepareToAction', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('starts actions on focus', () => {
    const hasFocusMock = jest.fn(() => true)
    document.hasFocus = hasFocusMock
    prepareToAction()
    expect(document.body.classList).toContain('run_animation')
  })

  test('waits for focus before start action', () => {
		const hasFocusMock = jest.fn(() => false)
    document.hasFocus = hasFocusMock
    const addEventListenerSpy = jest
      .spyOn(window, 'addEventListener')
      .mockImplementationOnce((event, handler) => {
        handler()
      })
    prepareToAction()
    expect(addEventListenerSpy).toBeCalledWith('focus', expect.any(Function))
  })
})

describe('runAnimation', () => {
  test('add run_animation class to body', () => {
    document.body.innerHTML = `
      <body />
    `
    runAnimation()
    expect(document.body.classList).toContain('run_animation')
  })
})

describe('setPlaybackRate', () => {
  test('sets playback rate for video element', () => {
    setPlaybackRate(0.5)
    const video = document.getElementById('background-video')
    expect(video.playbackRate).toBe(0.5)
    setPlaybackRate(0.05)
    expect(video.playbackRate).toBe(0)
  })
})

describe('setVideoSpeed', () => {
  test('set video playback ratio after delay', () => {
    const video = document.getElementById('background-video')
    expect(video.playbackRate).toBe(1)
    setVideoSpeed()
    jest.advanceTimersByTime(4000)
    expect(video.playbackRate).toBeCloseTo(0)
  })
})

describe('startAction', () => {
  test('runs animations and sets video speed', () => {
    startAction()
    expect(document.body.classList).toContain('run_animation')
    jest.advanceTimersByTime(4000)
    const video = document.getElementById('background-video')
    expect(video.playbackRate).toBeCloseTo(0)
  })
})

describe('translatePlaybackRate', () => {
  test('changes video playback rate during interval', () => {
    translatePlaybackRate(0, 1, 3000, 10)
    jest.advanceTimersByTime(1500)
    const video = document.getElementById('background-video')
    expect(video.playbackRate).toBeGreaterThan(0)
    expect(video.playbackRate).toBeLessThan(1)
    jest.advanceTimersByTime(1500)
    expect(video.playbackRate).toBeCloseTo(1)
  })
})

describe('waitForWindowFocus', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('runs startAction function', () => {
    document.body.innerHTML = `
      <body />
    `
    const addEventListenerSpy = jest
      .spyOn(window, 'addEventListener')
      .mockImplementationOnce((event, handler) => {
        handler()
      })
    waitForWindowFocus()
    expect(addEventListenerSpy).toBeCalledWith('focus', expect.any(Function))
    expect(document.body.classList).toContain('run_animation')
  })
})
