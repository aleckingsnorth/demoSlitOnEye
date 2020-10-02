function drawOnCanvas(angleOfSlit,xVal,yVal,slitHeight,slitWidth,filterOption) {
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

    if(filterOption != "white"){
        //ctx1.globalAlpha = 0.9;
        ctx1.globalCompositeOperation = "color";


    ctx1.fillStyle=getColorForShadow(filterOption);
    ctx1.fillRect(0,0,500,400);
}


    
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

    ctx2.strokeStyle=filterOption;

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
    ctx3.strokeStyle=filterOption;
    ctx3.globalAlpha = 0.8;
   

    //var shiftForX=((ctx3.lineWidth/2)+((10*slitWidth)/2))*angleOfSlit;
    p1={x:(width/2)-rectWidth,y:0+yShift};
    p2={x:(width/2)+(rectWidth*xAdjustment)-rectWidth,y:0+yShift};
    p3={x:(width/2)+(rectWidth*xAdjustment)-rectWidth,y:height+yShift};
    p4={x:(width/2)-rectWidth,y:height+yShift};

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

    ctx3.beginPath();
    ctx3.lineWidth = 7;
    ctx3.lineCap="round";
    ctx3.strokeStyle=filterOption;
    ctx3.globalAlpha = 0.3*fadeBetween(0.1,0.2,slitWidth);

    //After line width between 0.2 - 0.5 fade away

    var posOrNeg=1;
    if(angleOfSlit>0){
        posOrNeg=-1;
    }

    var crossSectionShift=((ctx3.lineWidth/2)+(150*slitWidth/2))*posOrNeg;
    t1={x:(width/2)-rectWidth+crossSectionShift,y:0+yShift};
    t2={x:(width/2)+(rectWidth*xAdjustment)-rectWidth+crossSectionShift,y:0+yShift};
    t3={x:(width/2)+(rectWidth*xAdjustment)-rectWidth+crossSectionShift,y:height+yShift};
    t4={x:(width/2)-rectWidth+crossSectionShift,y:height+yShift};

    ctx3.moveTo(t1.x,t1.y);
    ctx3.bezierCurveTo(t2.x,t2.y,t3.x,t3.y,t4.x,t4.y);
    ctx3.stroke();
    ctx3.restore();

}

function getColorForShadow(filterOption){
    if(filterOption == "white"){
        return "rgba(255,255,255,40)";
    }

    if(filterOption == "green"){
        return "rgba(0,255,0,40)";
    }

    if(filterOption == "blue"){
        return "rgba(0,0,255,40)";
    }

    return "rgba(255,255,255)";
}

function getColorForFilterOption(filterOption){
    if(filterOption == "white"){
        return "rgb(255,255,255)";
    }

    if(filterOption == "green"){
        return "rgb(0,255,0)";
    }

    if(filterOption == "blue"){
        return "rgb(0,0,255)";
    }

    return "rgb(255,255,255)";
}

function getColorForFilterOptionBackground(filterOption){
    if(filterOption == "white"){
        return "rgb(0,0,0)";
    }

    if(filterOption == "green"){
        return "rgb(0,20,0)";
    }

    if(filterOption == "blue"){
        return "rgb(0,0,20)";
    }

    return "rgb(255,255,255)";
}

function fadeBetween(start, finish, number){
    if(number<=start){
        return 1;
    }

    if(number>=finish){
        return 0
    }

    const n1 =  finish-start; //Length
    const howFarIn= number-start;
    const percent = howFarIn/n1;
    return 1-percent;
}

function easeOutQuart(x){
    return pow(1 - x, 8);
}

function mapFilterAngleToBrowserAngle(filterAngle){
    // -1 to 1;
    var minAngle = 119.9;
    var maxAngle = 240.1;
    var range = maxAngle - minAngle;

    var decimalPercent = (filterAngle-minAngle)/range;
    var remap = ((decimalPercent*2)-1)*-1;
    return remap;
}

function mapArmHeightToBrowserHeight(armHeight){
    var newArmHeight=armHeight*-1;
    // -1 to 1;
    var minHeight = -2.74*-1;
    var maxHeight = -3.24*-1;
    var range = maxHeight - minHeight;
    var decimalPercent = (newArmHeight-minHeight)/range;
    var remap = ((decimalPercent*2)-1)*-1;
    return remap;
}

function mapBaseXToBrowserX(baseX){
    //-0.344 = 0;
    var minBaseX = -0.8
    var maxBaseX = 2;

    var range = minBaseX-maxBaseX;

    var val =baseX-minBaseX;
    return ((val/range)*20)+3.25;
}

function isIncreasingOrDecreasing(oldValue, newValue){
    if(newValue>oldValue+20){
        //Going from 10->360
        return true;
    }

    if(newValue<oldValue-20){
        //Going from 350->0
        return false;
    }


    if(newValue>oldValue){
        return false;
    }

    return true;
}

function findNewSlitWidth(oldSlitWidth, oldSlitWidthAngle, newSlitWidthAngle){
    if(oldSlitWidthAngle == newSlitWidthAngle){
        return oldSlitWidth;
    }

    var isIncreasing = isIncreasingOrDecreasing(oldSlitWidthAngle,newSlitWidthAngle);
    var newWidth = oldSlitWidth;
    console.log("slitWidthIncreasing?"+isIncreasing);


    if(isIncreasing){
        newWidth=oldSlitWidth+0.05;
    }
    else{
        newWidth=oldSlitWidth-0.05;
    }

    if(newWidth>1.5){
        return 1.5;
    }

    if(newWidth<0){
        return 0;
    }

    return newWidth;
}

function findNewSlitHeight(oldSlitHeight, oldSlitHeightAngle, newSlitHeightAngle){
    if(oldSlitHeightAngle == newSlitHeightAngle){
        return oldSlitHeight;
    }

    var isIncreasing = isIncreasingOrDecreasing(oldSlitHeightAngle,newSlitHeightAngle);
    var newHeight = oldSlitHeight;
    console.log("slitHeigghtIncreasing?"+isIncreasing);


    if(isIncreasing){
        newHeight=oldSlitHeight+0.05;
    }
    else{
        newHeight=oldSlitHeight-0.05;
    }

    if(newHeight>1.0){
        return 1.0;
    }

    if(newHeight<0){
        return 0;
    }

    return newHeight;
}

function getFilterOptionFromFilterAngle(angle){
    if(angle>20 && angle<32){
        return "blue";
    }

    if(angle>300 && angle<340){
        return "green";
    }

    return "white";
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