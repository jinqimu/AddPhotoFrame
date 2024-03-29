## What's this?

A script to frame the photos

![](https://img.shields.io/github/stars/jinqimu/addPhotoFrame)
![](https://img.shields.io/badge/language-html-red)
![](https://img.shields.io/badge/language-python-green)

## Example

### BEFORE
1. <img src="https://cdn.jsdelivr.net/gh/jinqimu/cloudimg/img/20200605202803.jpg" width="200"/>

2. <img src="https://cdn.jsdelivr.net/gh/jinqimu/cloudimg/img/20200622213137.jpg" width="200" />

### AFTER

1. <img src="https://cdn.jsdelivr.net/gh/jinqimu/cloudimg/img/20200605181605.png" width="200" />

2. <img src="https://cdn.jsdelivr.net/gh/jinqimu/cloudimg/img/20200622220507.png" width="400"/>

## How to use?

### Python

run `python ./main.py` in shell, choose son_pic and output directory;

### HTML

Click **APF.html**，then choose son_pic;

You can try on **[this website](https://jinqimu.github.io/apf)**

### EXE (independent)

Click **APF.exe**，then choose son_pic and output directory;

## What needs to be fixed (or new feature)

- [ ] Can't process a photo with very small pixels;
- [ ] Can't process some RAW, such as CR2, PEF, RAF...(buut I don't want to fix it);
- [x] ~~process both landscape mode and portrait mode~~
- [x] The LOGO;

## Update history

### 2021-06-27 v0.0.7

Fix bugs & add brand LOGO

I test LOGOs of following brands:
* Canon
* Nikon
* Fujifilm
* Sony
* Pentax

*Notice: Only JS version will be updated this time*

### 2020-09-12 v0.0.5

Update some parameter.

### 2020-08-07 v0.0.4

add pic_drag(HTML)

### 2020-07-22 v0.0.3

* Fix bug: data formatting error.

* Improve loading sequence.(HTML)

### 2020-06-22 v0.0.2

Add HTML version.

### 2020-06-05 v0.0.1

START.