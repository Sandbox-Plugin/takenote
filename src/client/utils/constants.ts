import { Folder, NotesSortKey, DirectionText } from '@/utils/enums'
import { ThemeModes } from '@/types'

export const folderMap: Record<Folder, string> = {
  [Folder.ALL]: 'All Notes',
  [Folder.FAVORITES]: 'Favorites',
  [Folder.SCRATCHPAD]: 'Scratchpad',
  [Folder.TRASH]: 'Trash',
  [Folder.CATEGORY]: 'Category',
}

export const iconColor = 'rgba(255, 255, 255, 0.25)'

export const shortcutMap = [
  { action: 'Create a new note', key: 'N' },
  { action: 'Delete a note', key: 'U' },
  { action: 'Create a category', key: 'C' },
  { action: 'Download a note', key: 'O' },
  { action: 'Sync all notes', key: 'L' },
  { action: 'Markdown preview', key: 'P' },
  { action: 'Toggle theme', key: 'K' },
  { action: 'Search notes', key: 'F' },
  { action: 'Prettify a note', key: 'I' },
]

export const notesSortOptions = [
  { value: NotesSortKey.TITLE_UP, label: 'Title ↑', direction: 'top' },
  { value: NotesSortKey.TITLE_DOWN, label: 'Title ↓', direction: 'down' },
  { value: NotesSortKey.CREATED_DATE_UP, label: 'Date Created ↑', direction: 'top' },
  { value: NotesSortKey.CREATED_DATE_DOWN, label: 'Date Created ↓', direction: 'down' },
  { value: NotesSortKey.LAST_UPDATED_UP, label: 'Last Updated ↑', direction: 'top' },
  { value: NotesSortKey.LAST_UPDATED_DOWN, label: 'Last Updated ↓', direction: 'down' },
]

export const themesModeOptions = [
  { value: ThemeModes.DARK, label: 'Dark' },
  { value: ThemeModes.LIGHT, label: 'Light' },
  { value: ThemeModes.SYNC_BY_SYSTEM, label: 'Sync By System' },
]

export const themesModeOptions = [
  { value: ThemeModes.DARK, label: 'Dark' },
  { value: ThemeModes.LIGHT, label: 'Light' },
  { value: ThemeModes.SYNC_BY_SYSTEM, label: 'Sync By System' },
]

export const directionTextOptions = [
  { value: DirectionText.LEFT_TO_RIGHT, label: 'Left to right' },
  { value: DirectionText.RIGHT_TO_LEFT, label: 'Right to left' },
]
