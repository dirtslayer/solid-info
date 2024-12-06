# How to use Indexbook

1. Copy index.html into your document root
2. Create index_include.md with a list of markdown files
3. Serve with http server or place in pages folder of your repo.
    - open without web server using --allow-file-access-from-files flag
     https://stackoverflow.com/a/75257872/1267585

## Example index_include.md

```
The_Indexbook_Manual/Cover.md
The_Indexbook_Manual/Why_Indexbook.md
The_Indexbook_Manual/Indexbook_Parts.md
The_Indexbook_Manual/How_to_Indexbook.md
The_Indexbook_Manual/project_todo.md
```

## Using nushell to generate index_include.md

![terminal screenshot](./media/screenshot-2024-11-05-06-27-18.png)

```nushell
ls The_Indexbook_Manual/ 2024_Journal/ 
    | where type == file
    | get name | sort -r | to text 
    | save -f index_include.md
```

## Generating PDF

- [ ] TODO Generate PDF