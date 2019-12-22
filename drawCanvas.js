  function drawCanvas(num, width, height, lineWidth, bgcolor, curData, totleData, colorArr) {
            var canvas = document.getElementById('canvas'+num)
            canvas.width = width
            canvas.height = height
            canvas.style.background = 'rgba(2,3,63,1)'
            var ctx = canvas.getContext('2d')
            //获取数据
            totleData = $(canvas).parents('.c-con').find('.t-text span').text()
            curData = totleData-$(canvas).parents('.c-con').find('.b-text span').text()
        
            
            //绘制圆圈
            ctx.clearRect(0, 0, width, height)
            ctx.save()
            ctx.beginPath()
            ctx.lineWidth = lineWidth - 1
            ctx.strokeStyle = bgcolor
            ctx.arc(width / 2 + .5, height / 2 + .5, .9 * width / 2, 0, 360 * Math.PI / 180, false)
            ctx.stroke()
            ctx.closePath()
            ctx.restore()
            //绘制数据
            
            ctx.save()
            ctx.beginPath()
            ctx.lineWidth = lineWidth
            ctx.lineCap = 'round'
            var renderColor = []
            if (curData / totleData <= .6) {
                color = colorArr[0]
            } else {
                color = colorArr[1]
            }
            var gradient = ctx.createLinearGradient(0, 0, 170, 0);
            gradient.addColorStop("0", color.scolor);
            gradient.addColorStop("1.0", color.ecolor);
            ctx.strokeStyle = gradient
            ctx.arc(width / 2 + .5, height / 2 + .5, .9 * width / 2, 180 * Math.PI / 180, 180 * Math.PI / 180 - (curData / totleData) * 360 * Math.PI / 180, true)
            ctx.stroke()
            ctx.closePath()
            ctx.restore()
            //绘制中间的圆
            ctx.save()
            ctx.beginPath()
            ctx.globalAlpha = .9
            ctx.translate(width / 2,height / 2)
            var grd = ctx.createRadialGradient(.5, .5,.35* width + .5, .5, .5,.01*width  );
            grd.addColorStop(0, color.ecolor);
            grd.addColorStop(1, 'transparent');
            ctx.fillStyle = grd
            ctx.arc(.5, .5, .3 * width, 0, 360 * Math.PI / 180, false)
            ctx.fill()
            ctx.restore()
            ctx.closePath()
            //绘制数据
            ctx.save()
            ctx.beginPath()
            ctx.translate(width / 2 + .5,height / 2 +.5)
             if (curData / totleData <= .6) {
                ctx.fillStyle= color.scolor
            } else {
                 ctx.fillStyle ='#fafd11'
            }
//            ctx.fillStyle = color.ecolor
            ctx.font = '40px sans-serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(Math.round(100*curData/totleData) + '%',0,0)
            ctx.font = '14px sans-serif'
            ctx.fillText('完成率', 0,25)
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.restore()
            ctx.closePath()
        }