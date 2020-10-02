function storeLogin() {
    let pattern1 = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
    let pattern2 = new RegExp(/^[a-zA-Z]+ [a-zA-Z]+$/)
    let isEarth = /(earth)\s*([0-9]*)/
    var form = document.getElementsByClassName('details-input')[0].elements
    var name = form[0].value || null
    var email = form[1].value || null
    var place = form[2].value.toLowerCase() || null
    var checked = form[3].checked
    if(!pattern1.test(email)) document.getElementById('emailID-input').setCustomValidity('Invalid Email Address')
    if(!pattern2.test(name)) document.getElementById('name-input').setCustomValidity('Please input correct name')
    if(place !== null && place.match(isEarth) !== null) {
        place.match(isEarth)[2] === "" ?  document.getElementById('planet-input').setCustomValidity('Currently not delivering to Earth') : ""
    }
    if(!checked) document.getElementById('agreeTnC-input').setCustomValidity('Please accept the T&C')   
    if(document.forms[0].checkValidity()) {
        let user_data = {
            'Name': name,
            'emailID': email,
            'planet': place
        }
        sessionStorage.setItem('loggedIn',true)
        sessionStorage.setItem('userData',JSON.stringify(user_data))
        var exit_var = document.getElementsByClassName('wave')[0]
        exit_var.style.zIndex = 7
        exit_var.classList.add('scale-up')
        setTimeout(() => window.location = "/mainPage.html",950)
    }
    else {
        console.log("F")
        document.forms[0].classList.add("submitted")
        document.forms[0].reportValidity()
    }
}