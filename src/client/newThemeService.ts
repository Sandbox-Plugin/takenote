import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { ThemeModes } from '@/types'

import { getSettings } from './selectors'
import { changeThemeMode, toggleDarkTheme, updateCodeMirrorOption } from './slices/settings'

export const NewThemeService = () => {
  const dispatch = useDispatch()

  const { darkTheme, themeMode } = useSelector(getSettings)
  const _toggleDarkTheme = () => dispatch(toggleDarkTheme())
  const _changeThemeMode = () => dispatch(changeThemeMode(ThemeModes.SYNC_BY_SYSTEM))
  const _updateCodeMirrorOption = (key: string, value: any) =>
    dispatch(updateCodeMirrorOption({ key, value }))

  const initTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

  useEffect(() => {
    console.log('initThemeinitThemeinitThemeinitThemeinitTheme ', initTheme, darkTheme, themeMode)

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      const newColorScheme = event.matches ? 'dark' : 'light'
      console.log('newColorScheme', newColorScheme, darkTheme)

      _toggleDarkTheme()

      _changeThemeMode()

      //     _toggleDarkTheme()
      // _updateCodeMirrorOption('theme', darkTheme ? 'base16-light' : 'new-moon')
    })
  }, [darkTheme])

  return null
}
