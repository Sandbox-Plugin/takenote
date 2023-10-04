import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Moon, Sun, Zap } from 'react-feather'

import { ThemeModes } from '@/types'

import { getSettings } from './selectors'
import { toggleDarkTheme, updateCodeMirrorOption, changeThemeMode } from './slices/settings'

export const initSystemThemeMode =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
export const NewThemeService = () => {
  const dispatch = useDispatch()

  const { darkTheme, themeMode } = useSelector(getSettings)
  const _toggleDarkTheme = (bool: boolean | undefined = undefined) =>
    dispatch(toggleDarkTheme(bool))
  const _changeThemeMode = (mode: string) => dispatch(changeThemeMode(mode))
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

  const toggleDarkThemeHandler = (mode: string) => {
    let themeName
    switch (mode) {
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
        themeName = initSystemThemeMode ? 'new-moon' : 'base16-light'

        if (darkTheme !== initSystemThemeMode) _toggleDarkTheme()
        break
    }
    _changeThemeMode(mode)
    _updateCodeMirrorOption('theme', themeName)
    _updateCodeMirrorOption('themeMode', themeName)
  }

  return (
    <>
      <button className="note-menu-bar-button" onClick={(e) => e.stopPropagation()}>
        {themeMode === ThemeModes.LIGHT && <Sun aria-hidden="true" size={18} />}
        {themeMode === ThemeModes.DARK && <Moon aria-hidden="true" size={18} />}
        {themeMode === ThemeModes.SYNC_BY_SYSTEM && <Zap aria-hidden="true" size={18} />}
        <div className="hover-btns">
          <button
            className="note-menu-bar-button"
            onClick={() => toggleDarkThemeHandler(ThemeModes.LIGHT)}
          >
            <Sun aria-hidden="true" size={18} />
          </button>
          <button
            className="note-menu-bar-button"
            onClick={() => toggleDarkThemeHandler(ThemeModes.DARK)}
          >
            <Moon aria-hidden="true" size={18} />
          </button>
          <button
            className="note-menu-bar-button"
            onClick={() => toggleDarkThemeHandler(ThemeModes.SYNC_BY_SYSTEM)}
          >
            <Zap aria-hidden="true" size={18} />
          </button>
        </div>
        <span className="sr-only">Themes</span>
      </button>
    </>
  )
}
