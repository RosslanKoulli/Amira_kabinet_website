function temp2text(degree, scale){
    var s = (scale === 'c') ? 'Celsius' : 'Fahrenheit';

    if(scale === 'c'){
        s = 'Celsius'
    } else {
        s = ' Fahrenheit'
    }
    
    return 'It is ' + degree + ' degree ' + s + '.';
    }