
# Comment V for Visual Studio Code

<img src="https://user-images.githubusercontent.com/2157285/28877787-ace1415e-77b2-11e7-81fa-e4d3d7af50ec.gif" width="600" />

## What is this?

Comment V is a [Kary Comments](https://coding.standards.kary.us/comments) Generation Tool. Kary Comments are a part of the [Kary Coding Standards](https://coding.standards.kary.us) designed to bring richer layouts to the code. These comments are designed to work inside of that specifcitaion and with their own respective rules. So if you don't know them please read these articles before dowloading this extension.

- [Overview of Kary Coding Standards](https://coding.standards.kary.us/)
- [Introduction to Kary Comments](https://coding.standards.kary.us/comments/introduction)
- [Sectioning Code](https://coding.standards.kary.us/comments/sectioning)
- [Comments Reference](https://coding.standards.kary.us/comments/reference)

## Supported Comments

```

──
── ──────────────────────────────────────────────── I ──────────
──   :::::: F L A G : :  :   :    :     :        :          :
── ──────────────────────────────────────────────────────────
──

──
── ─── INDENTATION LEVEL 1 ────────────────────────────────────────────────────────
──

──
── ─────────────────────────────────────────────────── LEVEL 1 ENDING COMMENT ─────
──

        ──
        ── ─── INDENTATION LEVEL 2 ─────────────────────────────────────────
        ──

        ──
        ── ──────────────────────────────────── LEVEL 2 ENDING COMMENT ─────
        ──

                ──
                ── INDENTATION LEVEL 3
                ──

                ── • • • • •

        ── ─────────────────────────────────────────────────────────────────

── ────────────────────────────────────────────────────────────────────────────────
```

## How to use?
Comment V is content-aware so you don't have to choose your section type of comment. Comment uses `Kary Section Comment Width 80`, `Kary Section Comment Width 60` and `Kary Section InSection Comment` for start of your part and `Kary Line Comment Width 80`, `Kary Line Comment Width 60` and `Kary Separator Comment` for end of your section. What you have to do is to specify if the comment is start or the end of the section.

| Comments              | Keybindings           | Additional Information                                                            |
|-----------------------|-----------------------|-----------------------------------------------------------------------------------|
| Flag                  | `alt` + `shift` + `y` | You'll have to also give it the index number                                      |
| Section Header        | `alt` + `y`           | Section Comment for Indentation less than 2 and InSection comment for the rest    |
| Reverse Section Start | `alt` + `m`           | _same as section comment_                                                         |
| Section End           | `alt` + `l`           | Line Comment for Indentation less than 2 and Separator comment for the rest       |

> __NOTE__ <br> These keybindings are chosen such that they are both easy to use within QWERTY and Dvorak layouts.
