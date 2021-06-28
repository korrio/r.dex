// eslint-disable-next-line import/no-unresolved
import { VonderTheme } from 'the-vonder-uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends VonderTheme {}
}
