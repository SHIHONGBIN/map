window.onload = function() {
    topCanvasAnimate(1,200,200,true, 2, 50, 0.2);
    topCanvasAnimate(2,200,200,true, 2, 50, 0.2);
    topCanvasAnimate(3,200,200,true, 2, 50, 0.2);
}
    function topCanvasAnimate(num, width, height, bool, r, totle, opacity) {
        var canvas = document.getElementById('canvas'+num);

        if (canvas) {
            canvas.style.display = "block";

            var context = canvas.getContext("2d"),
                particels = [],
                posArr = [],
                startVx = 0,
                startVy = 0,
                //创建粒子总数
                mnumParticels = totle;

                canvas.width = width;
                canvas.height = height;
            
            //创建粒子
            for (var particle, i = 0; i < mnumParticels; i++) {
                var startV = Math.random() * 1;
                //控制速度 以免过快
                if (startVx >= 0.1) {
                    startVx *= .2;
                } else {
                    startVx *= -.2;
                }
                if (startVy >= 0.1) {
                    startVy *= .2;
                } else {
                    startVy *= -.2;
                }
                //对象保存到数组里面方便后面调用
                posArr.push({
                    x: Math.random() * canvas.width.toFixed(2) + 4,
                    y: Math.random() * canvas.height.toFixed(2) + 4,
                    vx: startVx,
                    vy: startVy,
                    mass: .1,
                    opacity: 0
                });

                //粒子绘制 不要阴影 资源消耗大
                particle = new Sprite("orange", {
                    paint: function(sprite, context) {
                        sprite.width = r;
                        sprite.opacity = opacity;
                        context.save();
                        context.beginPath();
                        context.arc(
                            sprite.vx + sprite.x,
                            sprite.vy + sprite.y,
                            sprite.width/4,
                            0,
                            Math.PI * 2,
                            false
                        );
                        context.lineWidth = 1;
                        context.strokeStyle = "rgba(255,255,255," + sprite.opacity + ")";
                        context.fillStyle = "rgba(255,255,255," + sprite.opacity + ")";
                        context.fill();
                        context.stroke();
                        context.rotate(45 * Math.PI / 180);
                        context.restore();
                    }
                });

                //每隔粒子给上速度以及加速度方向等属性
                particle.x = posArr[i].x;
                particle.y = posArr[i].y;
                particle.vx = posArr[i].vx;
                particle.vy = posArr[i].vy;
                particle.mass = posArr[i].mass;
                particle.opacity = posArr[i].opacity;
                particels.push(particle);
            }

            //引力函数
            function gravitate(partA, partB, j) {
                var dx = partB.x - partA.x;
                var dy = partB.y - partA.y;

                var distQ = dx * dx + dy * dy; //计算物体建的距离
                var dist = Math.sqrt(distQ); //距离的平方
                var F = partA.mass * partB.mass / distQ; //万有引力公式

                var ax = F * dx / dist; //作用力作用于加速度
                var ay = F * dy / dist;
                partA.vx += ax / partA.mass; //加速度作用于速度
                partA.vy += ay / partA.mass;
                partB.vx -= ax / partB.mass;
                partB.vy -= ay / partB.mass;
            }

            //移动函数
            function move(partA, i) {
                partA.x += partA.vx;
                partA.y += partA.vy;

                for (var partB, j = i + 1; j < mnumParticels; j++) {
                    partB = particels[j];
                    //碰撞检测
                    if (bool) {
                        checkClooision(partA, partB, i);
                    } else {
                        checkClooision2(partA, partB, i);
                    }

                    //引力
                    gravitate(partA, partB, j);

                }
            }
            //头部运动函数
            function checkClooision(partA, partB, i) {
                if (
                    partA.x >= canvas.width/2+.3*canvas.width + partA.width ||
                    partA.x <= canvas.width/2-.3*canvas.width-partA.width ||
                    partA.y >= canvas.height/2+.3*canvas.height + partA.width ||
                    partA.y <= canvas.height/2-.3*canvas.height-partA.width
                ) {
                    posArr[i].x = Math.random() * canvas.width.toFixed(2) + 4;
                    posArr[i].y = Math.random() * canvas.width.toFixed(2) + 4;
                    partA.vx = 0;
                    partA.vy = 0;
                    partA.x = posArr[i].x;
                    partA.y = posArr[i].y;
                    partA.opacity = 0;
                }
                if (
                      partB.x >= canvas.width/2+.3*canvas.width + partA.width ||
                    partB.x <= canvas.width/2-.3*canvas.width-partA.width ||
                    partB.y >= canvas.height/2+.3*canvas.height + partA.width ||
                    partB.y <= canvas.height/2-.3*canvas.height-partA.width
                ) {
                    posArr[i].x = Math.random() * canvas.width.toFixed(2) + 4;
                    posArr[i].y = Math.random() * canvas.width.toFixed(2) + 4;
                    partB.vx = 0;
                    partB.vy = 0;
                    partB.x = posArr[i].x;
                    partB.y = posArr[i].y;
                    partB.opacity = 0;
                }
            }

            //绘制光线
            var lightLength = 120;
            var startXArr = [
                (Math.random() * 80).toFixed(2) * 1,
                (Math.random() * 80).toFixed(2) * 1,
                (Math.random() * 80).toFixed(2) * 1,
                (Math.random() * 80).toFixed(2) * 1
            ];
            var rangOpacity = [
                0.02,
                0.02,
                0.02,
                0.02
            ];
            var sartOpacity = [0, 0, 0, 0];
            var addReduceArr = [true, true, true, true];
            var lastTimeArr = [true, true, true, true];
            var lastTimeFadeTime = [
                90 + parseInt(Math.random() * 60) * 1,
                90 + parseInt(Math.random() * 60) * 1,
                90 + parseInt(Math.random() * 60) * 1,
                90 + parseInt(Math.random() * 60) * 1
            ];
            var lastTimeFadeTimeStart = [0, 0, 0, 0];
            var randomTimeArr = [1000 + Math.random() * 10];
            var positionArr = [{
                    x: canvas.width / 2 - 288 - lightLength / 2,
                    y: canvas.height / 2
                },
                {
                    x: canvas.width / 2 - 142 - lightLength / 2,
                    y: canvas.height / 2 - 30
                },
                {
                    x: canvas.width / 2 + 60 - lightLength / 2,
                    y: canvas.height / 2 - 62
                },
                {
                    x: canvas.width / 2 + 227 - lightLength / 2,
                    y: canvas.height / 2 + 1
                }
            ];

            // drawLight();

            animate();
            
            
            function animate(startDeg) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                
                 //参数  
                drawCanvas(num,200, 200, 20, '#090c54', 50, 100, [{
                    scolor: '#ff5364',
                    ecolor: '#ff8261'
                }, {
                    scolor: '#4b74ea',
                    ecolor: '#10b7f8'
                }])
                
                
                
                //绘制线条元素点线
                for (i = 0; i < mnumParticels; i++) {
                    move(particels[i], i);
                    particels[i].opacity += 0.01;
                    if (particels[i].opacity >= 0.7) {
                        particels[i].opacity = 0.7;
                    }
                    //                 particels[i].left += posArr[i].vx;
                    //                 particels[i].top += posArr[i].vy;
                    particels[i].paint(context);
                }
                //绘制光效
//                drawLight();
                window.requestAnimationFrame(animate);
            }
        }
    }