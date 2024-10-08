import {MediaToolOptions} from '@types'
import React, {PropsWithChildren, createContext, useContext, useMemo} from 'react'
import {DropzoneOptions} from 'react-dropzone'
import {type Locale} from '@types'

type ContextProps = {
  dropzone: Pick<DropzoneOptions, 'maxSize'>
  creditLine: MediaToolOptions['creditLine']
  locales: Locale[]
}

const ToolOptionsContext = createContext<ContextProps | null>(null)

type Props = {
  options?: MediaToolOptions | void
}

export const ToolOptionsProvider = ({options, children}: PropsWithChildren<Props>) => {
  const value = useMemo<ContextProps>(() => {
    let creditLineExcludeSources

    if (options?.creditLine?.excludeSources) {
      creditLineExcludeSources = Array.isArray(options?.creditLine?.excludeSources)
        ? options.creditLine.excludeSources
        : [options?.creditLine?.excludeSources]
    }

    return {
      dropzone: {maxSize: options?.maximumUploadSize},
      creditLine: {
        enabled: options?.creditLine?.enabled || false,
        excludeSources: creditLineExcludeSources
      },
      locales: options?.locales || [{name: 'English', id: 'en'}]
    }
  }, [
    options?.creditLine?.enabled,
    options?.creditLine?.excludeSources,
    options?.maximumUploadSize,
    options?.locales
  ])

  return <ToolOptionsContext.Provider value={value}>{children}</ToolOptionsContext.Provider>
}

export const useToolOptions = () => {
  const context = useContext(ToolOptionsContext)

  if (!context) {
    throw new Error('useToolOptions must be used within an ToolOptionsProvider')
  }

  return context
}
