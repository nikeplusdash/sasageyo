function genCircle() {
    var list = ['#5353b4','#313141','#8d8d8d']
    var canva = document.getElementsByClassName('spam')[0]
    var span = document.createElement('span')
    var color = list[Math.round(Math.random() * 2)]
    var spanS = Math.round(Math.random() * 20) + 'px'
    var W = Math.random() * 90 + 'vw';
    var H = Math.random() * 90 + 'vh';
    span.className = 'circle-landing'
    span.style.position = 'absolute'
    span.style.width = spanS
    span.style.height = spanS
    span.style.background = color
    span.style.top = H
    span.style.left = W
    canva.appendChild(span)
    setTimeout(()=> canva.removeChild(span),1700)
}

setInterval(()=> genCircle(),150)