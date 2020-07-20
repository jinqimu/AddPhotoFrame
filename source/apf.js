input = document.getElementById("upload");
    var img1 = document.getElementById("img");
    var bg1 = document.getElementById("background1");
    var bg2 = document.getElementById("background2");

    function getData(img) {
        var _Model, _LensModel, _ISO, _F, _S, _EV;
        EXIF.getData(img, function() {
            var data = EXIF.getAllTags(this);
            console.log(data);
            
            _Model = data['Model'];
            _LensModel = data['LensModel'];
            _ISO = data['ISOSpeedRatings'];
            _F = data['FNumber'];
            _S = data['ExposureTime'];
            _EV = data['ExposureBias'];
        });
        return {_Model, _LensModel, _ISO, _F, _S, _EV};
    }

    function judge(img) {
        var mom, p_son, p_Model, p_LensModel, p_ISO, p_F, p_S, p_EV;
        if (img.width < img.height) {
            mom = bg1;
            p_son = [160, 0];

            p_Model = [1540, 525];
            p_LensModel = [1540, 738];
            p_ISO = [2010, 173];
            p_F = [2010, 456];
            p_S = [2010, 740];
            p_EV = [2010, 1023];
        } else {
            mom = bg2;
            p_son = [0, 270];

            p_Model = [621, 1388];
            p_LensModel = [621, 1493];
            p_ISO = [286, 1826];
            p_F = [515, 1826];
            p_S = [740, 1826];
            p_EV = [970, 1826];
        }
        // console.log({ mom, p_son, p_Model, p_LensModel, p_ISO, p_F, p_S, p_EV });
        // console.log(typeof(p_Model));
        
        return {mom, p_son, p_Model, p_LensModel, p_ISO, p_F, p_S, p_EV};
    }

    input.addEventListener('change', function (params) {
            console.log(typeof(input.files[0]));
            file = input.files[0];
            if (window.FileReader) {
                var reader = new FileReader();
                
                reader.onload = function (e) {
                    image = e.target.result;
                    var can = document.getElementById("canvas");
                    
                    var ctx = can.getContext('2d');
                    var img = new Image();
                               
                    img.onload = async function() {
                        console.log(getData(img));
                        if(img.width<img.height) {
                            can.setAttribute("width", "2208px");
                            can.setAttribute("height", "1242px");
                            ctx.drawImage(bg2, 0, 0);
                            // 图像，绘制起点xy，x缩放，y缩放
                            ctx.drawImage(img, 160, 0, img.width*1242/img.height, 1242);
                        } else {
                            can.setAttribute("width", "1242px");
                            can.setAttribute("height", "2208px");
                            ctx.drawImage(bg1, 0, 0);
                            ctx.drawImage(img, 0, 270, 1242, img.height*1242/img.width);
                        }

                        var {_Model, _LensModel, _ISO, _F, _S, _EV} = getData(img);
                        console.log(_Model);
                        
                        var {mom, p_son, p_Model, p_LensModel, p_ISO, p_F, p_S, p_EV} = judge(img);
                        console.log(p_Model);
                        
                        // font
                        ctx.fillStyle = "white";
                        // _Model
                        text = _Model || "--";
                        const DUBAI_BOLD = new FontFace('DUBAI_BOLD', 'url(./source/DUBAI_BOLD.TTF)');
                        await DUBAI_BOLD.load();
                        document.fonts.add(DUBAI_BOLD);
                        ctx.font = "52px DUBAI_BOLD";
                        text_size = ctx.measureText(text);
                        [font_width, font_height] = [text_size.width, text_size.actualBoundingBoxAscent];
                        ctx.fillText(text, p_Model[0] - font_width / 2, p_Model[1] + font_height * 1 / 3);

                        // _LensModel
                        ctx.fillStyle = "#848484";
                        text = _LensModel || "----";
                        const ARIALN = new FontFace('ARIALN', 'url(./source/ARIALN.TTF)');
                        await ARIALN.load();
                        document.fonts.add(ARIALN);
                        ctx.font = "44px ARIALN";
                        console.log(ctx.font);
                        
                        text_size = ctx.measureText(text);
                        [font_width, font_height] = [text_size.width, text_size.actualBoundingBoxAscent];
                        ctx.fillText(text, p_LensModel[0] - font_width / 2, p_LensModel[1] + font_height * 1 / 3);

                        // params
                        ctx.fillStyle = "white";
                        text = _ISO || "--";
                        const Sony_Sketch_EF = new FontFace('Sony_Sketch_EF', 'url(./source/Sony_Sketch_EF.ttf)');
                        await Sony_Sketch_EF.load();
                        document.fonts.add(Sony_Sketch_EF);
                        ctx.font = "40px Sony_Sketch_EF"
                        text_size = ctx.measureText(text);
                        [font_width, font_height] = [text_size.width, text_size.actualBoundingBoxAscent];
                        ctx.fillText(text, p_ISO[0] - font_width / 2, p_ISO[1] + font_height * 1 / 3);

                        text = _F || "--";
                        text_size = ctx.measureText(text);
                        [font_width, font_height] = [text_size.width, text_size.actualBoundingBoxAscent];
                        ctx.fillText(text, p_F[0] - font_width / 2, p_F[1] + font_height * 1 / 3);

                        try {
                            text = _S.numerator + '/' + _S.denominator;
                        } catch (error) {
                            text = "--";
                        } 
                        ctx.font = "34px Sony_Sketch_EF";
                        console.log(_S);
                        
                        text_size = ctx.measureText(text);
                        [font_width, font_height] = [text_size.width, text_size.actualBoundingBoxAscent];
                        ctx.fillText(text, p_S[0] - font_width / 2, p_S[1] + font_height * 1 / 3);

                        text = _EV || "--";
                        ctx.font = "40px Sony_Sketch_EF";
                        text_size = ctx.measureText(text);
                        [font_width, font_height] = [text_size.width, text_size.actualBoundingBoxAscent];
                        ctx.fillText(text, p_EV[0] - font_width / 2, p_EV[1] + font_height * 1 / 3);

                        img1.src = can.toDataURL('image/png');
                    }
                    img.src = image;
                }
                reader.readAsDataURL(file);
            }
    })