# bracket-padder

> ... for Visual Studio Code

A simple package that provides smart whitespace padding and closing of bracket pairs: `()` `[]` `{}`

![package gif](https://cloud.githubusercontent.com/assets/6108538/22630998/56e3f60e-ec05-11e6-8e5b-53c99e36f46c.gif)

## Examples
The `|` character represents cursor position.

### Auto padding
`(|)` + <kbd>Space</kbd> results in `( | )` instead of `( |)`.

### Auto closing
`( | )` + <kbd>)</kbd> results in `(  )|` instead of `( )| )`.

## Other Implementations

- [Atom](https://github.com/viablelab/bracket-padder)

## Note
_This is the result of a short experimentation with the Visual Studio Code API,
and there's likely a better solution to solve this problem. The initial approach
was to provide commands like "smartCloseCurlyBracket" that would just perform
the expected default behavior unless some conditions were met. Ran into trouble
here as manually inserting characters didn't play well with the built-in
auto-closing of bracket pairs that you normally get when inputting certain
characters._
