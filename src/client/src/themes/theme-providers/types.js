/* @flow */

export type Theme = Object; // TODO: add theme type attributes

export interface ThemeProvider {
  getTheme: (date?: Date) => ?Theme;
}
