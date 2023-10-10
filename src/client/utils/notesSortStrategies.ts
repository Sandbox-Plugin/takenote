import { NoteItem } from '@/types'

import { getNoteTitle } from './helpers'
import { NotesSortKey } from './enums'

export interface NotesSortStrategy {
  sort: (a: NoteItem, b: NoteItem) => number
}

const withFavorites = (sortFunction: NotesSortStrategy['sort']) => (a: NoteItem, b: NoteItem) => {
  if (a.favorite && !b.favorite) return -1
  if (!a.favorite && b.favorite) return 1

  return sortFunction(a, b)
}

const createdDateUp: NotesSortStrategy = {
  sort: (a: NoteItem, b: NoteItem): number => {
    const dateA = new Date(a.created)
    const dateB = new Date(b.created)

    return dateA < dateB ? 1 : -1
  },
}

const lastUpdatedUp: NotesSortStrategy = {
  sort: (a: NoteItem, b: NoteItem): number => {
    const dateA = new Date(a.lastUpdated)
    const dateB = new Date(b.lastUpdated)

    // the first note in the list should consistently sort after if it is created at the same time
    return dateA < dateB ? 1 : -1
  },
}

const titleUp: NotesSortStrategy = {
  sort: (a: NoteItem, b: NoteItem): number => {
    const titleA = getNoteTitle(a.text)
    const titleB = getNoteTitle(b.text)

    if (titleA === titleB) return 0

    return titleA > titleB ? 1 : -1
  },
}

const createdDateDown: NotesSortStrategy = {
  sort: (a: NoteItem, b: NoteItem): number => {
    const dateA = new Date(b.created)
    const dateB = new Date(a.created)

    return dateA < dateB ? 1 : -1
  },
}

const lastUpdatedDown: NotesSortStrategy = {
  sort: (a: NoteItem, b: NoteItem): number => {
    const dateA = new Date(b.lastUpdated)
    const dateB = new Date(a.lastUpdated)

    // the first note in the list should consistently sort after if it is created at the same time
    return dateA < dateB ? 1 : -1
  },
}

const titleDown: NotesSortStrategy = {
  sort: (a: NoteItem, b: NoteItem): number => {
    const titleA = getNoteTitle(b.text)
    const titleB = getNoteTitle(a.text)

    if (titleA === titleB) return 0

    return titleA > titleB ? 1 : -1
  },
}

export const sortStrategyMap: { [key in NotesSortKey]: NotesSortStrategy } = {
  [NotesSortKey.LAST_UPDATED_UP]: lastUpdatedUp,
  [NotesSortKey.LAST_UPDATED_DOWN]: lastUpdatedDown,
  [NotesSortKey.TITLE_UP]: titleUp,
  [NotesSortKey.TITLE_DOWN]: titleDown,
  [NotesSortKey.CREATED_DATE_UP]: createdDateUp,
  [NotesSortKey.CREATED_DATE_DOWN]: createdDateDown,
}

export const getNotesSorter = (notesSortKey: NotesSortKey) =>
  withFavorites(sortStrategyMap[notesSortKey].sort)
