navigator.getBattery().then((battery) => {

    function updateAllBaterryInfo() {
        updateChargeInfo()
        updateLevelInfo()
        updateDischargingTime()

    }
    updateAllBaterryInfo()

    battery.addEventListener('chargingchange', updateChargeInfo)
    function updateChargeInfo() {
        let batteryCharge = document.querySelector('.battery-charge'),
            chargingStatus = document.querySelector('.charging-status')

        if (battery.charging) {
            batteryCharge.classList.add('battery-animation')
            chargingStatus.innerHTML = 'Заряжается!'
        } else {
            batteryCharge.classList.remove('battery-animation')
            chargingStatus.innerHTML = 'Разряжается!'
            battery.addEventListener('dischargingtimechange', updateDischargingTime)
        }
    }

    battery.addEventListener('levelchange', updateLevelInfo)
    function updateLevelInfo() {
        let batteryPrecent = document.querySelector('.battery-precent'),
            batteryCharge = document.querySelector('.battery-charge')
        batteryPrecent.innerHTML = battery.level * 100 + '%'
        batteryCharge.style.width = battery.level * 100 + '%'
    }

    function updateDischargingTime() {
        let time = document.querySelector('.time')
        if (battery.dischargingTime != Infinity) {
            hours = ('' + Math.floor(battery.dischargingTime / 60 / 60)).length < 2 ? '0' + Math.floor(battery.dischargingTime / 60 / 60) : Math.floor(battery.dischargingTime / 60 / 60),
                minutes = Math.floor((battery.dischargingTime / 60) - Math.floor(battery.dischargingTime / 60 / 60) * 60)
            minutes = ('' + minutes).length < 2 ? '0' + minutes : minutes
            time.innerHTML = `До разрядки осталось: ${hours}:${minutes}:00`
        } else {
            time.innerHTML = ' '
        }

    }
})