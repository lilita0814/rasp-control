let pump_open = null
let fan_open = null

$(function () {
    $('#fan-btn').click(toggle_fan)

    $('#pump-btn').click(toggle_pump)

    set_fan_btn_status()
    set_pump_btn_status()
})

function toggle_fan() {
    fan_open = !fan_open
    set_fan_btn_status()
}

function set_fan_btn_status() {
    let fan_on_btn = $('#fan-on-btn')
    let fan_off_btn = $('#fan-off-btn')

    if (fan_open) {
        fan_on_btn.addClass('btn-success')
        fan_on_btn.removeClass('btn-default')
        fan_off_btn.addClass('btn-default')
        fan_off_btn.removeClass('btn-danger')
    } else {
        fan_on_btn.removeClass('btn-success')
        fan_on_btn.addClass('btn-default')
        fan_off_btn.removeClass('btn-default')
        fan_off_btn.addClass('btn-danger')
    }
}

function toggle_pump() {
    pump_open = !pump_open
    set_pump_btn_status()
}

function set_pump_btn_status() {
    let pump_on_btn = $('#pump-on-btn')
    let pump_off_btn = $('#pump-off-btn')

    if (pump_open) {
        pump_on_btn.addClass('btn-success')
        pump_on_btn.removeClass('btn-default')
        pump_off_btn.addClass('btn-default')
        pump_off_btn.removeClass('btn-danger')
    } else {
        pump_on_btn.removeClass('btn-success')
        pump_on_btn.addClass('btn-default')
        pump_off_btn.removeClass('btn-default')
        pump_off_btn.addClass('btn-danger')
    }
}





