import { KeyboardEventHandler, RefObject } from 'react'

export type imagesType = {
  id: string
  position: number[]
  image: string
  frameSize: number | [number, number, number];
  size: [number, number, number];
}

export type inputTextTypes = {
  handleKeyPress: KeyboardEventHandler<HTMLInputElement>
  inputRef: RefObject<HTMLInputElement>
  loading: boolean
}