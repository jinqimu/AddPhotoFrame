input = document.getElementById("upload");
var img1 = document.getElementById("img");
var bg1 = document.getElementById("background1");
var bg2 = document.getElementById("background2");
const DUBAI_BOLD = new FontFace('DUBAI_BOLD', 'url(./source/DUBAI_BOLD.TTF)');
const ARIALN = new FontFace('ARIALN', 'url(./source/ARIALN.TTF)');
const Sony_Sketch_EF = new FontFace('Sony_Sketch_EF', 'url(./source/Sony_Sketch_EF.ttf)');
const FREESCPT = new FontFace('FREESCPT', 'url(./source/FREESCPT.TTF)');

console.log("APF v0.0.6, update date:2020-08-14.");

function loadFont(params) {
    DUBAI_BOLD.load();
    ARIALN.load();
    Sony_Sketch_EF.load();
    FREESCPT.load();
} loadFont();

function getData(img) {
    var _Model, _LensModel, _ISO, _F, _S, _EV, _Make;
    EXIF.getData(img, function() {
        var data = EXIF.getAllTags(this);
        console.log(data);
        
        _Model = data['Model'];
        _LensModel = data['LensModel'];
        _ISO = data['ISOSpeedRatings'];
        _F = data['FNumber'];
        _S = data['ExposureTime'];
        _EV = data['ExposureBias'];
        _Make = data['Make']
    });

    if (_Make.includes('RICOH')) {
        if (_Model.includes('PENTAX'))
            _Make = "Pentax";
        else
            _Make = "Ricoh";
    }
    if (_Make.includes('NIKON'))
        _Make = "Nikon";
    if (_Make.includes('SONY'))
        _Make = "Sony";
    if (_Make.includes('FUJIFILM')) {
        _Make = "Fujifilm";
        console.log(_LensModel + "!")
        _LensModel = _LensModel.replace(/\u0000/g, '').replace(/\\u0000/g, ""); //做两次replace消除null
    }

    return {_Model, _LensModel, _ISO, _F, _S, _EV, _Make};
}

function position(img) {
    var mom, p_son, p_Model, p_LensModel, p_ISO, p_F, p_S, p_EV, p_brand;
    if (img.width < img.height) {
        mom = bg2;
        p_son = [160, 0];

        p_Model = [1540, 525];
        p_LensModel = [1540, 738];
        p_ISO = [2010, 173];
        p_F = [2010, 456];
        p_S = [2010, 740];
        p_EV = [2010, 1023];
        p_brand = [1140, 621];
    } else {
        mom = bg1;
        p_son = [0, 270];

        p_Model = [621, 1388];
        p_LensModel = [621, 1493];
        p_ISO = [286, 1826];
        p_F = [515, 1826];
        p_S = [740, 1826];
        p_EV = [970, 1826];
        p_brand = [621, 1258];
    }
    
    return {mom, p_son, p_Model, p_LensModel, p_ISO, p_F, p_S, p_EV, p_brand};
}

function process(file) {
    if (window.FileReader) {
        var reader = new FileReader();

        reader.onload = function (e) {
            image = e.target.result;
            var can = document.getElementById("canvas");

            var ctx = can.getContext('2d');
            var img = new Image();

            img.onload = async function () {
                console.log(getData(img));
                if (img.width < img.height) {
                    can.setAttribute("width", "2208px");
                    can.setAttribute("height", "1242px");
                    ctx.drawImage(bg2, 0, 0);
                    // 图像，绘制起点xy，x缩放，y缩放
                    ctx.drawImage(img, 160, 0, img.width * 1242 / img.height, 1242);
                } else {
                    can.setAttribute("width", "1242px");
                    can.setAttribute("height", "2208px");
                    ctx.drawImage(bg1, 0, 0);
                    ctx.drawImage(img, 0, 270, 1242, img.height * 1242 / img.width);
                }

                var { _Model, _LensModel, _ISO, _F, _S, _EV, _Make } = getData(img);
                console.log(_Model);

                var { mom, p_son, p_Model, p_LensModel, p_ISO, p_F, p_S, p_EV, p_brand } = position(img);
                console.log(p_Model);

                // add brand
                ctx.arc(p_brand[0], p_brand[1], 50, 0, 360, false);
                ctx.fillStyle = "#d02e26";
                ctx.fill();
                await loadFont();
                document.fonts.add(FREESCPT);
                ctx.font = "56px FREESCPT";
                text = _Make;
                if (text.length <= 4) ctx.font = "62px FREESCPT";
                text_size = ctx.measureText(text);
                [font_width, font_height] = [text_size.width, text_size.actualBoundingBoxAscent];
                if (font_width > 100) {
                    ctx.font = "48px FREESCPT";
                    text_size = ctx.measureText(text);
                    [font_width, font_height] = [text_size.width, text_size.actualBoundingBoxAscent];
                    ctx.arc(p_brand[0], p_brand[1], font_width/2+5, 0, 360, false);
                    ctx.fill();
                }
                ctx.fillStyle = "white";
                ctx.fillText(text, p_brand[0]-font_width/2, p_brand[1]+font_height/3);

                // font
                ctx.fillStyle = "white";
                // _Model
                text = _Model || "--";
                document.fonts.add(DUBAI_BOLD);
                ctx.font = "52px DUBAI_BOLD";
                text_size = ctx.measureText(text);
                [font_width, font_height] = [text_size.width, text_size.actualBoundingBoxAscent];
                ctx.fillText(text, p_Model[0] - font_width / 2, p_Model[1] + font_height * 2 / 3);

                // _LensModel
                ctx.fillStyle = "#848484";
                text = _LensModel || "----";
                document.fonts.add(ARIALN);
                ctx.font = "40px ARIALN";
                console.log(ctx.font);

                text_size = ctx.measureText(text);
                [font_width, font_height] = [text_size.width, text_size.actualBoundingBoxAscent];
                ctx.fillText(text, p_LensModel[0] - font_width / 2, p_LensModel[1] + font_height * 2 / 3);

                // params
                ctx.fillStyle = "white";
                text = _ISO || "--";
                document.fonts.add(Sony_Sketch_EF);
                ctx.font = "40px Sony_Sketch_EF"
                text_size = ctx.measureText(text);
                [font_width, font_height] = [text_size.width, text_size.actualBoundingBoxAscent];
                ctx.fillText(text, p_ISO[0] - font_width / 2, p_ISO[1] + font_height * 2 / 3);

                text = _F.toFixed(1) || "--";
                text_size = ctx.measureText(text);
                [font_width, font_height] = [text_size.width, text_size.actualBoundingBoxAscent];
                ctx.fillText(text, p_F[0] - font_width / 2, p_F[1] + font_height * 2 / 3);

                try {
                    function gcd(a, b) {
                        if (a % b == 0) return b;
                        return arguments.callee(b, a % b);
                    }
                    let temp = gcd(_S.numerator, _S.denominator)
                    text = _S.numerator / temp + '/' + _S.denominator / temp;
                } catch (error) {
                    text = "--";
                }
                ctx.font = "34px Sony_Sketch_EF";
                console.log(_S);

                text_size = ctx.measureText(text);
                [font_width, font_height] = [text_size.width, text_size.actualBoundingBoxAscent];
                ctx.fillText(text, p_S[0] - font_width / 2, p_S[1] + font_height * 2 / 3);

                text = Math.round(_EV * 100) / 100;
                if (isNaN(text)) text = "--";
                console.log(typeof (_EV));
                ctx.font = "40px Sony_Sketch_EF";
                text_size = ctx.measureText(text);
                [font_width, font_height] = [text_size.width, text_size.actualBoundingBoxAscent];
                ctx.fillText(text, p_EV[0] - font_width / 2, p_EV[1] + font_height * 2 / 3);

                img1.src = can.toDataURL('image/png');
            }
            img.src = image;
        }
        reader.readAsDataURL(file);
    }
}

input.addEventListener('change', function (params) {
    console.log(typeof(input.files[0]));
    file = input.files[0];
    process(file);
})

// 拖拽上传图片
function pic_drag() {

    function getDropFileCallBack(dropFile) {
        console.log(("area yes"));
        if (dropFile.type.match(/image*/)) {
            console.log("YES");
            process(dropFile);
        } else {
            console.log("此" + dropFile.name + "不是图片文件！");
        }
    }

    var dropZone = document.getElementById("drag");

    dropZone.addEventListener("focus", function () {  //防止弹出键盘
        document.activeElement.blur();
    })

    document.addEventListener("mouseover", function (e) {
        e.preventDefault();
        e.stopPropagation();
    }, false);

    dropZone.addEventListener("drop", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var df = e.dataTransfer;
        var dropFiles = []; // 拖拽的文件，会放到这里
        var dealFileCnt = 0; // 读取文件是个异步的过程，需要记录处理了多少个文件了
        var allFileLen = df.files.length; // 所有的文件的数量，给非Chrome浏览器使用的变量

        // 检测是否已经把所有的文件都遍历过了
        function checkDropFinish() {
            if (dealFileCnt === allFileLen - 1) {
                for (var i = 0; i < allFileLen; i++) {
                    getDropFileCallBack(dropFiles[i]);
                }
            }
            dealFileCnt++;
        }

        if (df.items !== undefined) {
            // Chrome拖拽文件逻辑
            for (var i = 0; i < df.items.length; i++) {
                var item = df.items[i];
                if (item.kind === "file" && item.webkitGetAsEntry().isFile) {
                    var file = item.getAsFile();
                    dropFiles.push(file);
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        getDropFileCallBack(file);
                    }
                    reader.readAsDataURL(file);
                } else if (item.type.match(/plain*/))
                    item.getAsString(function (str) {
                        console.log(str);
                        // neirong.value += str;
                    });
            }
        }
    }, false);
}
// 拖拽end
pic_drag();