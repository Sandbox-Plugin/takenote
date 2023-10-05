export enum Folder {
  ALL = 'ALL',
  CATEGORY = 'CATEGORY',
  FAVORITES = 'FAVORITES',
  SCRATCHPAD = 'SCRATCHPAD',
  TRASH = 'TRASH',
}

export enum Shortcuts {
  NEW_NOTE = 'ctrl+alt+n',
  NEW_CATEGORY = 'ctrl+alt+c',
  DELETE_NOTE = 'ctrl+alt+u',
  SYNC_NOTES = 'ctrl+alt+l',
  DOWNLOAD_NOTES = 'ctrl+alt+o',
  PREVIEW = 'alt+ctrl+p',
  TOGGLE_THEME = 'alt+ctrl+k',
  SEARCH = 'alt+ctrl+f',
  PRETTIFY = 'ctrl+alt+i',
}

export enum ContextMenuEnum {
  CATEGORY = 'CATEGORY',
  NOTE = 'NOTE',
}

export enum NotesSortKey {
  LAST_UPDATED_UP = 'lastUpdatedUp',
  LAST_UPDATED_DOWN = 'lastUpdatedDown',
  TITLE_UP = 'titleUp',
  TITLE_DOWN = 'titleDown',
  CREATED_DATE_UP = 'createdDateUp',
  CREATED_DATE_DOWN = 'createdDateDown',
}

export enum DirectionText {
  LEFT_TO_RIGHT = 'ltr',
  RIGHT_TO_LEFT = 'rtl',
}

export enum Errors {
  INVALID_LINKED_NOTE_ID = '<invalid note id provided>',
}
