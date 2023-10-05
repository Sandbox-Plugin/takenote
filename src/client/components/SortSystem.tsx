import React from 'react'
import { AlignCenter } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'

import { notesSortOptions } from '@/utils/constants'
import { TestID } from '@resources/TestID'
import { getNotes, getSettings } from '@/selectors'
import { NotesSortKey } from '@/utils/enums'
import { updateNotesSortStrategy } from '@/slices/settings'
import { updateNotes } from '@/slices/note'
import { SelectOptions } from '@/components/SettingsModal/SelectOptions'

export const SortSystem = () => {
  const { notesSortKey } = useSelector(getSettings)
  const { notes, activeFolder, activeCategoryId } = useSelector(getNotes)

  const dispatch = useDispatch()

  const _updateNotesSortStrategy = (sortBy: NotesSortKey) =>
    dispatch(updateNotesSortStrategy(sortBy))
  const _updateNotes = (sortOrderKey: NotesSortKey) =>
    dispatch(updateNotes({ notes, activeFolder, activeCategoryId, sortOrderKey }))

  const updateNotesSortStrategyHandler = (selectedOption: any) => {
    _updateNotesSortStrategy(selectedOption.value)
    _updateNotes(selectedOption.value)
  }

  return (
    <div className="sort-header">
      <AlignCenter aria-hidden="true" size={18} />
      <SelectOptions
        title=""
        description=""
        onChange={updateNotesSortStrategyHandler}
        options={notesSortOptions}
        selectedValue={notesSortKey}
        testId={TestID.SORT_BY_DROPDOWN}
      />
    </div>
  )
}
