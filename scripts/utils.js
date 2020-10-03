const line = (dish,cost) =>  {
    return `
    <div class="dish">
        <div class="sno">${dish.dish_id}</div>
        <div class="name">${dish.name}</div>
        <div class="price">&#8377; ${cost}</div>
    </div>
    `
}

const card = (dish,id,sno) => {
    return `
    <div class="card fadeIn">
        <div class="counter" key="${id}" number="${sno}" id="${dish.dish_id}">
            <div class="minus" onClick="minus(${dish.dish_id})">-</div>
            <div class="count" onClick="handleClick(${dish.dish_id})">${dish.amount === undefined ? 0 : dish.amount}</div>
            <div class="plus" onClick="add(${dish.dish_id})">+</div>
        </div>
        <div class="name">${dish.name}</div>
        <div class="serving">Serves: ${dish.serving}</div>
        <div class="price">&#8377; ${dish.price}</div>
    </div>`
}

const refresh = (id) => {
    if (prev === null) {prev = id;document.getElementById(id).classList.add('active');}
    else if (prev === id) {return}
    if (box.classList.contains('show')) {
        let menu = document.getElementsByClassName('menu')[0]
        let lists = document.getElementsByClassName('card')
        for (const i of lists) { i.classList.remove('fadeIn'); i.classList.add('fadeOut') }
        menu.innerHTML = ""
        menu.nextElementSibling.innerHTML = ""
        document.getElementById(prev).classList.remove('active')
        document.getElementById(id).classList.add('active')
        prev = id
        box.classList.remove('show')
    }
    setTimeout(() => {
        box.classList.add('show')
        let menu = document.getElementsByClassName('menu')[0]
        menu.classList.remove('first')
        setTimeout(() => {
            menu.innerHTML = id.charAt(0).toUpperCase() + id.substring(1)
        }, 30)
        let desc = menu.nextElementSibling
        desc.classList.remove('second')
        desc.innerHTML = data[id].description
    }, time_delay)
    setTimeout(() => {
        let inner = ""
        let dishlist = document.getElementsByClassName('dish-list')[0]
        dishlist.innerHTML = ""
        data[id].dishes.map((i,j=0) => inner += card(i,id,j++))
        dishlist.innerHTML += inner
    }, time_delay * 2)
}

function add(id) {
    let list = document.getElementById(id).children
    let val = parseInt(list[1].innerHTML)
    if (val < 9) list[1].innerHTML = val + 1
}

function minus(id) {
    let list = document.getElementById(id).children
    let val = parseInt(list[1].innerHTML)
    if (val > 0) list[1].innerHTML = val - 1
}

function handleClick(id) {
    let list = document.getElementById(id)
    let pos = getPosition(list)
    let val = parseInt(list.children[1].innerHTML)
    let span = document.createElement('span')
    span.id = 'submit-icon'
    span.textContent = 'OK'
    span.className = ''
    span.classList.add('icon-sm')
    // span.classList.add('material-icons')
    span.scrollLeft = pos.x
    span.scrollTop = pos.y
    list.innerHTML = ''
    list.appendChild(span)
    let sid = list.getAttribute('key')
    let sno = list.getAttribute('number')
    data[sid].dishes[sno]['amount'] = val
}

function order(data) {
    let input = document.querySelector('.insert-food')
    let total = 0
    for(const i in data) {
        let cost = parseInt(data[i].price) * parseInt(data[i].amount)
        total += cost
        input.innerHTML += line(data[i],cost)
    }
    input.innerHTML += `<div class="dashed2" style="float:right;">===================</div>`
    input.innerHTML += `
    <div class="sub">
        <div class="total">TOTAL</div>
        <div class="price">&#8377; ${total}</div>
    </div>`
}

function storeLogin() {
    let pattern1 = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
    let pattern2 = new RegExp(/^[a-zA-Z]+ [a-zA-Z]+$/)
    let isEarth = /(earth)\s*([0-9]*)/
    var form = document.getElementsByClassName('details-input')[0].elements
    var name = form[0].value || null
    var email = form[1].value || null
    var place = form[2].value.toLowerCase() || null
    var checked = form[3].checked
    if (!pattern1.test(email)) document.getElementById('emailID-input').setCustomValidity('Invalid Email Address')
    if (!pattern2.test(name)) document.getElementById('name-input').setCustomValidity('Please input correct name')
    if (place !== null && place.match(isEarth) !== null) {
        place.match(isEarth)[2] === "" ? document.getElementById('planet-input').setCustomValidity('Currently not delivering to Earth') : ""
    }
    if (!checked) document.getElementById('agreeTnC-input').setCustomValidity('Please accept the T&C')
    if (document.forms[0].checkValidity()) {
        let user_data = {
            'Name': name,
            'emailID': email,
            'planet': place
        }
        sessionStorage.setItem('loggedIn', true)
        sessionStorage.setItem('userData', JSON.stringify(user_data))
        var exit_var = document.getElementsByClassName('wave')[0]
        exit_var.style.zIndex = 7
        exit_var.classList.add('scale-up')
        exit_var.addEventListener('animationend',() => window.location = "net-work/mainPage.html")
    }
    else {
        document.forms[0].classList.add("submitted")
        document.forms[0].reportValidity()
    }
}

function confirmPage(id) {
    sessionStorage.setItem('dataPresent',true)
    sessionStorage.setItem('data',JSON.stringify(data))
    let foot = document.getElementById(id)
    foot.children[0].classList.add('diminish')
    
    foot.addEventListener('animationend',() => foot.classList.add('scaleUp'))
    foot.addEventListener('animationend',() => {
        window.location = 'net-work/checkout.html'
    })
}

function backPage(id) {
    let rec = document.querySelector('.receipt')
    rec.classList.add('goRight')
    rec.addEventListener('animationend',() => {
        rec.classList.add('goRight')
        window.location = "net-work/mainPage.html"
    })
}

function getPosition(el) {
    var xPos = 0;
    var yPos = 0;

    while (el) {
        if (el.tagName == "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return {
        x: xPos,
        y: yPos
    };
}

var data = sessionStorage.getItem('dataPresent')?JSON.parse(sessionStorage.getItem('data')):
{
    'salad': {
        'description': 'Amazing green',
        'dishes': [
            {
                'dish_id': '101',
                'name': 'Bean Burrito',
                'price': '149',
                'serving': '1-2',
                'img': ''
            },
            {
                'dish_id': '102',
                'name': 'Bean Burrito',
                'price': '149',
                'serving': '1-2',
                'img': ''
            },
            {
                'dish_id': '103',
                'name': 'Bean Burrito',
                'price': '149',
                'serving': '1-2',
                'img': ''
            },
            {
                'dish_id': '102',
                'name': 'Bean Burrito',
                'price': '149',
                'serving': '1-2',
                'img': ''
            },
            {
                'dish_id': '103',
                'name': 'Bean Burrito',
                'price': '149',
                'serving': '1-2',
                'img': ''
            }
        ]
    },
    'trending': {
        'description': 'Amazing green',
        'dishes': [
            {
                'dish_id': '101',
                'name': 'Bean Burrito',
                'price': '149',
                'serving': '1-2',
                'img': ''
            },
            {
                'dish_id': '102',
                'name': 'Bean Burrito',
                'price': '149',
                'serving': '1-2',
                'img': ''
            },
            {
                'dish_id': '103',
                'name': 'Bean Burrito',
                'price': '149',
                'serving': '1-2',
                'img': ''
            }
        ]
    },
    'mocktails': {
        'description': 'Amazing green',
        'dishes': [
            {
                'dish_id': '101',
                'name': 'Bean Burrito',
                'price': '149',
                'serving': '1-2',
                'img': ''
            },
            {
                'dish_id': '102',
                'name': 'Bean Burrito',
                'price': '149',
                'serving': '1-2',
                'img': ''
            },
            {
                'dish_id': '103',
                'name': 'Bean Burrito',
                'price': '149',
                'serving': '1-2',
                'img': ''
            }
        ]
    },
    'meal': {
        'description': 'Amazing green',
        'dishes': [
            {
                'dish_id': '101',
                'name': 'Bean Burrito',
                'price': '149',
                'serving': '1-2',
                'img': ''
            },
            {
                'dish_id': '102',
                'name': 'Bean Burrito',
                'price': '149',
                'serving': '1-2',
                'img': ''
            },
            {
                'dish_id': '103',
                'name': 'Bean Burrito',
                'price': '149',
                'serving': '1-2',
                'img': ''
            }
        ]
    }
}

var prev = null;
var time_delay = 300
var box = document.getElementsByClassName('detail-tab')[0]