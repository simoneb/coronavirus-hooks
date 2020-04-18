import { useEffect, useRef } from 'react'

import virus from './covid-virus.png'

const translate = (e, size) => {
  const [nextX, nextY] = [
    Math.random() * document.documentElement.scrollWidth - size / 2,
    Math.random() * document.documentElement.scrollHeight - size / 2
  ]
  e.style.transform = `translate3d(${nextX}px, ${nextY}px, 0px)`
}

const transitions = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out']

const createElements = (count, size) =>
  new Array(count).fill('img').map(e => {
    const i = document.createElement(e)
    i.height = size
    i.style.position = 'fixed'
    i.src = virus
    i.style.opacity = 0
    translate(i, size)

    return i
  })

function animate(e, size, mountedRef) {
  if (!mountedRef.current) {
    return
  }

  const nextDuration = Math.random() * 4 + 2

  e.style.transitionTimingFunction =
    transitions[Math.floor(Math.random() * transitions.length)]
  e.style.transitionDuration = `${nextDuration}s`
  e.style.opacity = Math.random()
  translate(e, size)

  setTimeout(animate, nextDuration * 1000, e, size, mountedRef)
}

const createContainer = (count, size, mountedRef) => {
  const div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.top = 0
  div.style.left = 0
  div.style.right = 0
  div.style.bottom = 0
  div.style.pointerEvents = 'none'

  const elements = createElements(count, size)

  div.append(...elements)
  document.body.append(div)
  elements.forEach(e => animate(e, size, mountedRef))

  return div
}

const DEFAULTS = { count: 100, size: 20 }

export default function useCoronavirus({
  count = DEFAULTS.count,
  size = DEFAULTS.size
} = DEFAULTS) {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    const container = createContainer(count, size, mountedRef)

    return () => {
      mountedRef.current = false
      container.remove()
    }
  }, [count, size])
}
