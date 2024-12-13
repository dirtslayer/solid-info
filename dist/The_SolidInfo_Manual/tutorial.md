# The Solid Info Tutorial

## What is Solid Info

Solid Info is a Markdown File browser that is made to work like 
the GNU Info program. We could also call Solid Info a static site 
generator that has single key navigation.

The collection of Markdown files live in a public folder and have
a books.json file to describe the included chapters and pages.

## Using Solid Info

| Key       | Command                                   | 
|-----------|-------------------------------------------|
| **h**     | Invoke the Info tutorial.                 |
| **?**     | Get a short summary of **info** commands. |
| **n**     | Move to the "next" chapter.               |
| **p**     | Move to the "previous" chapter.           |
| **u**     | Move up (contents).                       |
| **q**     | Quit **info**.                            |
| **v**     | View markdown source                      |


## Books, Chapters, Pages

Markdown is organized into books, each book has chapters. 
A book is a folder under the public directory and
a chapter is a md file within the book directory. There are no
pages per se, as a md file can be any length.

## Adapt Solid Info to show your md files

1. Fork or copy this repository
2. Place your markdown files in folders inside the public folder
3. Edit books.json - This contents file determines the order and what
   is included. You can have arbitrary files inside your book, but they
   will not be displayed unless they are added to the books.json
4. Generate static site with npm run build.
5. Deploy the dist folder to your web server or github pages. Optionally
   you could build a container with npm run build-container.

## Request Support

If you'd like support click the green button labeled New Issue here:
[Solid Info Issues](https://github.com/dirtslayer/solid-info/issues)
