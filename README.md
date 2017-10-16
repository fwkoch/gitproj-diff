# gitproj-diff

Easy links for your git project diffs!

## Purpose

[git-project](https://github.com/aranzgeo/git-project) enables smooth project
and sub-repository management when all component repositories are rapidly changing.
Unfortunately, when sub-repositories change, this only shows up in the parent repo
as a one line diff with the old and new commit references.

This chrome extension turns those one line diffs in github into links that
take you directly to the compare view in the sub-repo.

## Installation

This extension may be installed as an unpacked extension in developer mode:

1. Navigate to `chrome://extensions`
2. Check "Developer mode" box
3. Click "Load unpacked extension..."
4. Navigate to and select the `gitproj-diff/` folder

You may also need to set up aliases. This is a dictionary of library nickname keys
and actual library name values.

For example, if your .gitproj file looks like:

```
version: 0.1.0
repos:
       MSR deps/my-sub-repo git@github.com:org/my-sub-repo.git
states:
       MSR dev bea52b0fde4a896139b1526b457837b07e6dd987
```

you need to set up:
```javascript
...
var aliases = {
    "MSR": "my-sub-repo",
}
...
```

## Limitations

- All repositories and sub-repositories must be under the same user/org.
- Changes to github HTML will most likely break this extension.
- The Javascript code isn't exceptionally beautiful...

## Acknowledgments

This extension was originally based on a template created by Tom Maxwell,
available [here](https://9to5google.com/2015/06/14/how-to-make-a-chrome-extensions/).
