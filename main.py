from PIL import Image
import exifread
from PIL import ImageFont, ImageDraw
import tkinter as tk
from tkinter import filedialog
import os
import sys

def resource_path(relative_path):
    """ Get absolute path to resource, works for dev and for PyInstaller """
    try:
        # PyInstaller creates a temp folder and stores path in _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)

def Picture_Synthesis(M_Img,
                      son_img,
                      save_img,
                      coordinate=None):
    """
    :param mother_img: 母图
    :param son_img: 子图
    :param save_img: 保存图片名
    :param coordinate: 子图在母图的坐标
    :return:
    """
    #将图片赋值,方便后面的代码调用
    # M_Img = Image.open(mother_img)
    # M_Img = mother_img
    S_Img = Image.open(son_img)
    factor = 1  # 子图缩小的倍数1代表不变，2就代表原来的一半

    #给图片指定色彩显示格式
    # CMYK/RGBA 转换颜色格式（CMYK用于打印机的色彩，RGBA用于显示器的色彩）
    M_Img = M_Img.convert("RGBA")

    # 获取图片的尺寸
    M_Img_w, M_Img_h = M_Img.size  # 获取被放图片的大小（母图）
    print("母图尺寸：", M_Img.size)
    S_Img_w, S_Img_h = S_Img.size  # 获取小图的大小（子图）
    print("子图尺寸：", S_Img.size)
    factor = max(S_Img_w / M_Img_w, S_Img_h/M_Img_h)
    print(factor)

    size_w = int(S_Img_w / factor)
    size_h = int(S_Img_h / factor)

    # 防止子图尺寸大于母图
    if S_Img_w > size_w:
        S_Img_w = size_w
    if S_Img_h > size_h:
        S_Img_h = size_h

    # # 重新设置子图的尺寸
    # icon = S_Img.resize((S_Img_w, S_Img_h), Image.ANTIALIAS)
    icon = S_Img.resize((S_Img_w, S_Img_h), Image.ANTIALIAS)
    w = int((M_Img_w - S_Img_w) / 2)
    h = int((M_Img_h - S_Img_h) / 2)

    try:
        if coordinate == None or coordinate == "":
            coordinate = (w, h)
            # 粘贴子图到母图的指定坐标（当前居中）
            M_Img.paste(icon, coordinate, mask=None)
        else:
            print("已经指定坐标"+str(coordinate))
            # 粘贴子图到母图的指定坐标（当前居中）
            M_Img.paste(icon, coordinate, mask=None)
    except:
        print("坐标指定出错 ")
    # 保存图片
    # M_Img.save(save_img)
    return(M_Img)


# target = "D:/2019/2019-10-05/IMGP4114.PEF"


def getData(file):
    '''
    :param file: file_path
    '''
    f = open(file, 'rb')

    _LensModel = '----'
    _Model = _ISO = _F = _S = _EV = '--'

    try:
        tags = exifread.process_file(f, details=False)
        print(tags)
        try:
            _Model = str(tags['Image Model'])
        except:
            print('The image has no INFO of Model')
            pass
        try:
            _LensModel = str(tags['EXIF LensModel'])
        except:
            print('The image has no INFO of LensModel')
            pass
        try:
            _ISO = tags['EXIF ISOSpeedRatings']
        except:
            print('The image has no INFO of ISOSpeedRatings')
            pass
        try:
            _F = tags['EXIF FNumber']
        except:
            print('The image has no INFO of FUnmber')
            pass
        try:
            _S = tags['EXIF ExposureTime']
        except:
            print('The image has no INFO of ExposureTime')
            pass
        try:
            _EV = tags['EXIF ExposureBiasValue']
        except:
            print('The image has no INFO of ExposureBiasValue')
            pass
    except IOError:
        print('file not an image file')
        pass

    print(_Model, _LensModel, _ISO, _F, _S, _EV)
    return(_Model, _LensModel, _ISO, _F, _S, _EV)

def judge(pic):
    img = Image.open(pic)
    if (img.size[0] > img.size[1]):
        mom = "source/background1.png"
        p_son = (0, 270)

        p_Model = (621, 1388)
        p_LensModel = (621, 1493)
        p_ISO = (286, 1826)
        p_F = (515, 1826)
        p_S = (740, 1826)
        p_EV = (970, 1826)
    else:
        mom = "source/background2.png"
        p_son = (160, 0)

        p_Model = (1540, 525)
        p_LensModel = (1540, 738)
        p_ISO = (2010, 173)
        p_F = (2010, 456)
        p_S = (2010, 740)
        p_EV = (2010, 1023)

    return mom, p_son, p_Model, p_LensModel, p_ISO, p_F, p_S, p_EV

if __name__ == "__main__":
    root = tk.Tk()
    root.withdraw()

    print("需要处理的图片：")
    son = filedialog.askopenfilename()
    print("Loading")
    _Model, _LensModel, _ISO, _F, _S, _EV = getData(son)

    mom, p_son, p_Model, p_LensModel, p_ISO, p_F, p_S, p_EV = judge(son)
    image = Image.open(resource_path(mom))
    draw = ImageDraw.Draw(image)

    # _Model
    text = _Model
    font_type = resource_path("source/DUBAI_BOLD.TTF")
    font = ImageFont.truetype(font_type, 52)
    font_width, font_height = draw.textsize(text, font)
    draw.text((p_Model[0] - font_width / 2, p_Model[1] - font_height * 2 / 3),
              text, "white", font)

    # _LensModel
    text = _LensModel
    font_type = resource_path("source/ARIALN.TTF")
    font = ImageFont.truetype(font_type, 44)
    font_width, font_height = draw.textsize(text, font)
    draw.text((p_LensModel[0] - font_width / 2, p_LensModel[1] - font_height * 2 / 3),
              text, "#848484", font)

    # params
    text = str(_ISO)
    font_type = resource_path("source/Sony_Sketch_EF.ttf")
    font = ImageFont.truetype(font_type, 40)
    font_width, font_height = draw.textsize(text, font)
    draw.text((p_ISO[0] - font_width / 2, p_ISO[1] - font_height * 2 / 3),
              text, "white", font)

    text = str(_F)
    # font_type = "source/Sony_Sketch_EF.ttf"
    font = ImageFont.truetype(font_type, 40)
    font_width, font_height = draw.textsize(text, font)
    draw.text((p_F[0] - font_width / 2, p_F[1] - font_height * 2 / 3),
              text, "white", font)

    text = str(_S)
    # font_type = "source/Sony_Sketch_EF.ttf"
    font = ImageFont.truetype(font_type, 36)
    font_width, font_height = draw.textsize(text, font)
    draw.text((p_S[0] - font_width / 2, p_S[1] - font_height * 2 / 3),
              text, "white", font)

    text = str(_EV)
    # font_type = "Sony_Sketch_EF.ttf"
    font = ImageFont.truetype(font_type, 40)
    font_width, font_height = draw.textsize(text, font)
    draw.text((p_EV[0] - font_width / 2, p_EV[1] - font_height * 2 / 3),
              text, "white", font)

    print("输出的位置：")
    res = filedialog.askdirectory()
    if(res):
        fileShortName = os.path.splitext(os.path.split(son)[1])[0]
        Picture_Synthesis(image, son, "", p_son).save(res+'/'+fileShortName+'_sol.png')
