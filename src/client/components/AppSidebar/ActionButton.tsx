import React, { MouseEventHandler } from 'react'
import { Icon } from 'react-feather'
import { useSelector } from 'react-redux'

import { iconColor } from '@/utils/constants'
import { getSettings } from '@/selectors'

export interface ActionButtonProps {
  dataTestID: string
  disabled?: boolean
  handler: MouseEventHandler
  icon: Icon
  label: string
  text: string
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  dataTestID,
  disabled = false,
  handler,
  icon: IconCmp,
  label,
  text,
}) => {
  //
  const { color } = useSelector(getSettings)

  return (
    <button
      data-testid={dataTestID}
      className={`action-button ${color}`}
      aria-label={label}
      onClick={handler}
      disabled={disabled}
      title={label}
    >
      <IconCmp
        size={18}
        className="action-button-icon"
        color={iconColor}
        aria-hidden="true"
        focusable="false"
      />
      <span>{text}</span>
    </button>
  )
}
