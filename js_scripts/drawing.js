function drawOnCanvas(angleOfSlit,xVal,yVal,slitHeight,slitWidth) {
    const height=400;
    const width=400;
    const rectWidth=(width/2)*(angleOfSlit+(xVal));

    //----Layer 1 -- Eye Image
    //setup canvas
    var c = document.getElementById("layer1");
    var ctx1 = c.getContext("2d");
    ctx1.clearRect(0,0, width,height)
    ctx1.save();

    ctx1.globalAlpha = 1.0;
    var xShift= (width/2)*xVal;
    var yShift= (height/2)*yVal;
    //draw image
    var img = document.getElementById("eyeImage");
    ctx1.drawImage(img, width/2-100-xShift, (height/2)-100 +yShift) ;


    
    //----Layer 2 -- Slit on Iris
    var c = document.getElementById("layer2");
    var ctx2 = c.getContext("2d");
    ctx2.clearRect(0,0, width,height)
    //
    //Draw Corneal curve
    var xAdjustment= 1.333;


    //---Draw Iris Curve
    //Clip
    ctx2.globalAlpha = 0.8;

    ctx2.fillStyle="rgba(0,0,0,255)";
    ctx2.fillRect(0,0,height,width);



    ctx2.save();
    ctx2.beginPath();
    ctx2.filter = 'blur(2px)';

    ctx2.globalAlpha = 1.0;
    ctx2.rect(0,(height/2)*(1-slitHeight),width,height-((height*(1-slitHeight))));
    ctx2.clip();
    
    var irisShadowWidth=rectWidth/5;
    ctx2.beginPath();
    ctx2.lineWidth = 150*slitWidth*1.2;
    ctx2.lineCap="round";
    ctx2.globalAlpha = 1.0;

    ctx2.strokeStyle="rgb(255,255,255)";

    var shadowShift=-angleOfSlit*28;

    e1={x:(width/2)-irisShadowWidth+shadowShift,y:0+yShift};
    e2={x:(width/2)+(irisShadowWidth*xAdjustment)-irisShadowWidth+shadowShift,y:0+yShift};
    e3={x:(width/2)+(irisShadowWidth*xAdjustment)-irisShadowWidth+shadowShift,y:height+yShift};
    e4={x:(width/2)-irisShadowWidth+shadowShift,y:height+yShift};

    ctx2.globalCompositeOperation = "destination-out";

    ctx2.moveTo(e1.x,e1.y);
    ctx2.bezierCurveTo(e2.x,e2.y,e3.x,e3.y,e4.x,e4.y);
    ctx2.stroke();
    ctx2.restore();

    //----Layer 3 -- Slit on Cornea
    var c = document.getElementById("layer3");
    var ctx3 = c.getContext("2d");
    ctx3.clearRect(0,0, width,height)

    var opacity= Math.pow((1-slitWidth),10)*0.5;
    //Clip for Slit height
    //Draw Slit height
    ctx3.save();
    ctx3.beginPath();
    ctx3.globalAlpha = 1.0;
    ctx3.rect(0,(height/2)*(1-slitHeight)*1.0,width,height-((height*(1-slitHeight)*1.0)));
    ctx3.clip();

    ctx3.beginPath();
    ctx3.lineWidth = 150*slitWidth;
    ctx3.lineCap="round";
    ctx3.strokeStyle="rgba(255,255,255)";
    ctx3.globalAlpha = 0.8;
   

    var shiftForX=((ctx3.lineWidth/2)+((10*slitWidth)/2))*angleOfSlit;
    p1={x:(width/2)-rectWidth+shiftForX,y:0+yShift};
    p2={x:(width/2)+(rectWidth*xAdjustment)-rectWidth+shiftForX,y:0+yShift};
    p3={x:(width/2)+(rectWidth*xAdjustment)-rectWidth+shiftForX,y:height+yShift};
    p4={x:(width/2)-rectWidth+shiftForX,y:height+yShift};

    ctx3.moveTo(p1.x,p1.y);
    ctx3.bezierCurveTo(p2.x,p2.y,p3.x,p3.y,p4.x,p4.y);
    ctx3.stroke();
    ctx3.restore();


    //Second Slit

    ctx3.save();
    ctx3.beginPath();
    ctx3.globalAlpha = 1.0;
    ctx3.rect(0,(height/2)*(1-slitHeight)*1.0,width,height-((height*(1-slitHeight)*1.0)));
    ctx3.clip();

    var opacity2= Math.pow((1-slitWidth),1);
    if(opacity2<0.8){
        opacity2=0;
    }

    ctx3.beginPath();
    ctx3.lineWidth = 7*(1-slitWidth);
    ctx3.lineCap="round";
    ctx3.strokeStyle="white";
    ctx3.globalAlpha = opacity2;

    
    t1={x:(width/2)-rectWidth,y:0+yShift};
    t2={x:(width/2)+(rectWidth*xAdjustment)-rectWidth,y:0+yShift};
    t3={x:(width/2)+(rectWidth*xAdjustment)-rectWidth,y:height+yShift};
    t4={x:(width/2)-rectWidth,y:height+yShift};

    ctx3.moveTo(t1.x,t1.y);
    ctx3.bezierCurveTo(t2.x,t2.y,t3.x,t3.y,t4.x,t4.y);
    ctx3.stroke();
    ctx3.restore();

}



/**
         * @brief De Casteljau's algorithm splitting n-th degree Bezier curve
         */
        function bsplit(points, t0) {
            var n = points.length - 1; // number of control points
            var b = [];		   	   // coefficients as in De Casteljau's algorithm
            var res1 = [];		   // first curve resulting control points
            var res2 = [];		   // second curve resulting control points
            var t1 = 1 - t0;
            
            // multiply point with scalar factor
            var pf = function(p, f) {
                var res = [];
                for(var i = 0; i < p.length; i++) {
                    res.push(f * p[i]);
                }
                return res;
            };
            // add points as vectors
            var pp = function(p1, p2) {
                var res = [];
                for(var i = 0; i < Math.min(p1.length, p2.length); i++) {
                    res.push(p1[i] + p2[i]);
                }
                return res;
            };
            
            // set original coefficients: b[i][0] = points[i]
            for(var i = 0; i <= n; i++) {
                points[i] = (typeof points[i] == "object") ? points[i] : [points[i]];
                b.push([ points[i] ]);
            }
            // get all coefficients
            for(var j = 1; j <= n; j++) {
                for(var i = 0; i <= (n-j); i++) {
                    b[i].push( pp(
                            pf(b[i][j-1], t1),
                            pf(b[i+1][j-1], t0)
                    ));
                }
            }
            // set result: res1 & res2
            for(var j = 0; j <= n; j++) {
                res1.push(b[0][j]);
                res2.push(b[j][n-j]);
            }
            
            return [res1, res2];
        };