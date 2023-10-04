import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { ThemeModes } from '@/types'

import { getSettings } from './selectors'
import { toggleDarkTheme, updateCodeMirrorOption } from './slices/settings'

export const initSystemThemeMode =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
export const NewThemeService = () => {
  const dispatch = useDispatch()

  const { darkTheme, themeMode } = useSelector(getSettings)
  const _toggleDarkTheme = (bool: boolean | undefined = undefined) =>
    dispatch(toggleDarkTheme(bool))
  const _updateCodeMirrorOption = (key: string, value: any) =>
    dispatch(updateCodeMirrorOption({ key, value }))

  useEffect(() => {
    detectTheme(initSystemThemeMode)

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      detectTheme(event.matches)
    })
  }, [])

  const detectTheme = (mode: boolean) => {
    let themeName

    switch (themeMode) {
      case ThemeModes.DARK:
        themeName = 'new-moon'
        if (!darkTheme) _toggleDarkTheme()
        break
      default:
      case ThemeModes.LIGHT:
        themeName = 'base16-light'
        if (darkTheme) _toggleDarkTheme()
        break
      case ThemeModes.SYNC_BY_SYSTEM:
        themeName = mode ? 'new-moon' : 'base16-light'
        _toggleDarkTheme(mode)
        break
    }
    _updateCodeMirrorOption('theme', themeName)
    _updateCodeMirrorOption('themeMode', themeName)
  }

  return null
}
