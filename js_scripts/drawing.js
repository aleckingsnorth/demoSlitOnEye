function drawOnCanvas(angleOfSlit,xVal) {
    const height=400;
    const width=400;
    const rectWidth=(width/2)*(angleOfSlit+(xVal));

    //setup canvas
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0, width,height)
    ctx.globalAlpha = 1.0;


    var xShift= (width/2)*xVal;
    //draw image
    var img = document.getElementById("eyeImage");
    ctx.drawImage(img, width/2-100-xShift, height/2-100);

    //Draw rect
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle="blue";
    ctx.strokeRect((width/2-rectWidth), 0, rectWidth,height);

    //Draw curve
    ctx.beginPath();
    ctx.globalAlpha = 0.9;
    ctx.lineWidth = 20;
    ctx.lineCap="round";
    ctx.strokeStyle="rgba(255,255,255,100)";
    var xAdjustment= 1.333;
    p1={x:(width/2)-rectWidth,y:0};
    p2={x:(width/2)+(rectWidth*xAdjustment)-rectWidth,y:0};
    p3={x:(width/2)+(rectWidth*xAdjustment)-rectWidth,y:height};
    p4={x:(width/2)-rectWidth,y:height};

    ctx.moveTo(p1.x,p1.y);
    ctx.bezierCurveTo(p2.x,p2.y,p3.x,p3.y,p4.x,p4.y);
    ctx.stroke();
    



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