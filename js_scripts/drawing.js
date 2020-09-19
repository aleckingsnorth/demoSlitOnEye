function drawOnCanvas(angleOfSlit,xVal,yVal,slitHeight,slitWidth) {
    const height=400;
    const width=400;
    const rectWidth=(width/2)*(angleOfSlit+(xVal));

    //----Layer 1
    //setup canvas
    var c = document.getElementById("layer1");
    var ctx1 = c.getContext("2d");
    ctx1.clearRect(0,0, width,height)
    ctx1.globalAlpha = 1.0;
    var xShift= (width/2)*xVal;
    var yShift= (height/2)*yVal;
    //draw image
    var img = document.getElementById("eyeImage");
    ctx1.drawImage(img, width/2-100-xShift, (height/2)-100 +yShift) ;


    //----Layer 2
    var c = document.getElementById("layer2");
    var ctx2 = c.getContext("2d");
    ctx2.clearRect(0,0, width,height)


    //Clip for Slit height
    ctx2.save();
    ctx2.beginPath();
    ctx2.globalAlpha = 1.0;
    ctx2.rect(0,(height/2)*slitHeight,width,height-(height*slitHeight));
    ctx2.clip();
    console.log(slitHeight);

    //Draw curve
    ctx2.beginPath();
    ctx2.globalAlpha = 0.9;
    ctx2.lineWidth = 150*slitWidth;
    ctx2.lineCap="round";
    ctx2.strokeStyle="rgba(255,255,255,100)";
    var xAdjustment= 1.333;
    p1={x:(width/2)-rectWidth,y:0+yShift};
    p2={x:(width/2)+(rectWidth*xAdjustment)-rectWidth,y:0+yShift};
    p3={x:(width/2)+(rectWidth*xAdjustment)-rectWidth,y:height+yShift};
    p4={x:(width/2)-rectWidth,y:height+yShift};

    ctx2.moveTo(p1.x,p1.y);
    ctx2.bezierCurveTo(p2.x,p2.y,p3.x,p3.y,p4.x,p4.y);
    ctx2.stroke();
    ctx2.restore();
    
    
    
    //Draw Slit height



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