---
layout:     post
title:      Shipping machine learning modules in a single executable
date:       2018-01-05 06:39:25
summary:   
tags: backend
comments: true
---

You have done all your research, prototyped it, optimize it and now you are ready to ship it. This post not only focusses on shipping machine learning modules but python based codebases in general.

### How do you ship ?
1. Expose an API
2. Package your code in a single executable

<!--break-->

To expose an API in some situations is not a feasible solution. Let's suppose the client wants on-premise deployment with no connection to outside world may be because it's too critical server for them. They don't want to take any chances by doing any external requests. We faced a similar usecase in our product StegoSOC - Cloud native security operations center.

### What's next ?
The easiest way to do is use pyinstaller package.

simply run
`pyinstaller app.py`

make sure to use --onefile option to generate single executable otherwise it will spin up several executables for each dependencies(not necessarily python).
So use
`pyinstaller --onefile app.py`

Now in case of sklearn, we particulary faced problems while packaging code because of ?
As stated [here](https://pythonhosted.org/PyInstaller/hooks.html#understanding-pyinstaller-hooks)


> The majority of Python packages use normal methods of importing their dependencies, and PyInstaller locates all their files without difficulty. But some packages make unusual uses of the Python import mechanism, or make clever changes to the import system at runtime. For this or other reasons, PyInstaller cannot reliably find all the needed files, or may include too many files. A hook can tell about additional source files or data files to import, or files not to import.


### How to use hooks feature in pyinstaller?
Simply create a python script in same directory where your main(app.py) is located. Name of that python script should be `hook-full-import-name.py`, where full-import-name is the fully-qualified name of an imported script or module.

for example sklearn may cause issues. So for sklearn filename should be `hook-sklearn.py` 
You can find the list of existing hooks already written for several python packages [here](https://github.com/pyinstaller/pyinstaller/tree/develop/PyInstaller/hooks)

content of `hook-sklearn.py` file will be
```
from PyInstaller.utils.hooks import collect_submodules
hiddenimports = collect_submodules('sklearn')
```


I know that all of hooks file in their repo is written ways but mostly the way i wrote for sklearn should work most of the times.

Note: I was using `PyInstaller==3.3.1`
