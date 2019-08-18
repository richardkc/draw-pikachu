!function(){
    
    let code = `
/*首先需要准备皮卡丘的底图层*/

.preview{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fee433;
}
.wrapper{
    width: 100%;
    height: 165px;
    position: relative;
}

/*画一个鼻子*/

.nose{
    width: 0px;
    height: 0px;
    border-style: solid ;
    border-width: 12px;
    border-color: black transparent transparent;
    border-radius: 11px;
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
}

/*圈出眼睛*/

.eye{
    width: 49px;
    height: 49px;
    background: #2e2e2e;
    position: absolute;
    border-radius: 50%;
    border: 2px solid black;
}

/*点出眼珠子*/

.eye::before{
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background: white;
    position: absolute;
    border-radius: 50%;
    left: 6px;
    top: -1px;
    border: 2px solid black;
}

/*眼睛安上来*/

.eye.left{
    right: 50%;
    margin-right: 90px;
}
.eye.right{
    left: 50%;
    margin-left: 90px;
}

/*画腮红啦画腮红*/

.face{
    width: 68px;
    height: 68px;
    background: #fc0D1c;
    border: 2px solid black;
    border-radius: 50%;
    position: absolute;
    top: 85px;
}

/*推推推，推过来*/

.face.left{
    right: 50%;
    margin-right: 116px;
}
.face.right{
    left: 50%;
    margin-left: 116px;
}

/*卷卷的上嘴唇*/

.upperLip{
    height: 28px;
    width: 88px;
    border: 2px solid black;
    position: absolute;
    top: 48px;
    background: #fee433;
}

/*一样挪过来*/

.upperLip.left{
    border-bottom-left-radius: 35px 30px;
    border-top: none;
    border-right: none;
    transform: rotate(-25deg);
    right: 50%;
}
.upperLip.right{
    border-bottom-right-radius: 35px 30px;
    border-top: none;
    border-left: none;
    transform: rotate(25deg);
    left: 50%;
}

/*嘴巴来啦*/

.lowerLip-wrapper{
    bottom: -30px;
    left: 50%;
    margin-left: -60px;
    position: absolute;
    height: 139px;
    overflow: hidden;
    width: 300px;
}
.lowerLip-wrapper > .lowerLip{
    width: 120px;
    height: 500px;
    background: #990513;
    border-radius: 120px/500px;
    border: 2px solid black;
    bottom: 0;
    position: absolute;
    overflow: hidden;
}

/*粉粉的舌头*/

.lowerLip-wrapper > .lowerLip::after{
    content: '';
    position: absolute;
    bottom: -25px;
    width: 100px;
    height: 140px;
    background: #fc4a62;
    left: 50%;
    margin-left: -50px;
    border-radius: 48px/50px;
}
    `

    var duration = 50
    var control = false

    $('.start').on('click',() => {
        control = !control
        if(control){
            $('.start').addClass('faded')
        }else{
            $('.start').removeClass('faded')
        }
        writeCode('',code,() => {})
    })


    $('.actions').on('click','button',(e) => {
        let $button = $(e.currentTarget)
        let speed = $button.attr('data-speed')
        control = true
        $button.addClass('active')
        .siblings('.active').removeClass('active')
        switch(speed){
            case 'slow':
                duration = 100
                break
            case 'normal':
                duration = 50
                break
            case 'fast':
                duration = 10
                break
        }
    })
    $('.controlAll').on('click','button',(e) => {
        let $button = $(e.currentTarget)
        let act = $button.attr('class')
        $button.addClass('active')
        .siblings('.active').removeClass('active')
        switch(act){
            case 'clearAll':
                $('#code').html('')
                $('#styleTag').html('')
                $('.start').removeClass('faded')
                control = false
                break
            case 'theEnd':
                control = false
                $('#code').html(code)
                $('#styleTag').html(code)
                $('.start').addClass('faded')
                break
        }
        setTimeout(() => {
            $button.removeClass('active')
        },200)
    })

    /*函数区*/
    function writeCode(preText,code,fn){
        let container = document.querySelector('#code')
        let styleTag = document.querySelector('#styleTag')
        let n = 0
        let id
        id = setTimeout(function run(){
            if(!control) return
            n += 1
            container.innerHTML = preText + code.substring(0,n)
            styleTag.innerHTML = preText + code.substring(0,n)
            container.scrollTop = container.scrollHeight
            if(n < code.length){
                id = setTimeout(run,duration)
            }else{
                fn && fn.call()
            }
        },duration)
    }

}.call()