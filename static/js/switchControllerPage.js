$(function () {

    let components_data = {}

    // create
    $('#create-switch-btn').click(function () {
        let name = $('#create-name').val()
        let gpio_pin = $('#create-gpio-pin').val()
        let icon = $('#create-icon').val()

        if (name === '') {
            alert('Name unable to be empty')
            return
        }

        $.ajax({
            url: '/rasp-control/switch-controller/create-switch',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                gpio_pin: gpio_pin,
                name: name,
                icon: icon
            }),
            success: function (data) {
                alert('create success')
                components_data = data
                $('#add-modal').modal('hide')
                renew_component()
            },
            error: function (x, sts, ex) {
                alert(ex)
            }
        })
    })

    //  delete
    $('#delete-component-btn').click(function () {
        let slot = $(this).data('slot')
        $.ajax({
            url: '/rasp-control/switch-controller/delete-switch',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                slot: slot
            }),
            success: function (data) {
                components_data = data
                renew_component()
                alert('delete success')
                $('#edit-modal').modal('hide')
            },
            error: function (x, sts, ex) {
                alert(ex)
            }
        })
    })

    //  init
    $.ajax({
        url: '/rasp-control/data/get-switch-controller',
        method: 'GET',
        success: function (data) {
            let components_html = $('#components')
            components_html.empty()
            if (data.length > 0) {
                components_data = data
                //  有数据
                renew_component()
            } else {
                //  无数据
                components_html.append(
                    '<div class="d-flex justify-content-center">data was empty</div>'
                )
            }
        }
    })

    function renew_component() {
        let components_html = $('#components')
        components_html.empty()
        $.each(components_data, function (index, item) {
            add_component(item.name, item.gpio_pin, item.icon, index)
        })

        //  edit component
        $('.edit-btn').click(function () {
            let data = components_data.find(e => e.slot === $(this).data('edit-slot'))
            $('#edit-icon').val(data.icon)
            $('#edit-name').val(data.name)
            $('#edit-gpio-pin').val(data.gpio_pin)
            $('#delete-component-btn').data('slot', data.slot)
            $('#edit-switch-save-btn').data('slot', data.slot)
        })
    }

    function add_component(name, pin, icon, slot) {
        $('#components').append(
            `<div class="col-6">
            <ul class="list-group">
            <li class="list-group-item d-flex">
            <div class="col-10 d-flex align-items-center">
            <label class="me-3 input-group-text">
            <i class="icon fa-solid ${icon}"></i>
            </label>
            <div class="list-group">
            <label><b>${name}</b></label>
            <label><b>gpio pin:</b> ${pin}</label>
            </div>
            </div>
            <div class="col-2 d-flex justify-content-end align-items-center">
            <div class="form-switch switch me-5">
            <input disabled class="form-check-input" type="checkbox" role="switch">
            </div>
            <button class="btn btn-secondary position-absolute end-0 bottom-0 d-flex justify-content-center edit-btn" data-edit-slot="${slot}" data-bs-toggle="modal" data-bs-target="#edit-modal">
            <i class="fa-solid fa-gear"></i>
            </button>
            </div>
            </li>
            </ul>
            </div>`
        )
    }

    //  edit slot btn
    $('#edit-slot-btn').click(function () {
        let drag_area = $('#slot-drag-area')
        drag_area.empty()
        $.each(components_data, function (i, v) {
            drag_area.append(`
                <div class="list-group slot-drag-item" data-slot="${v.slot}">
                <div class="list-group-item d-flex col-12">
                <div class="col-1 hand-holder align-items-center d-flex justify-content-center list-group-item me-3">
                <label><div class="fa-solid fa-up-down"></div></label>
                </div>
                <div class="align-items-center d-flex justify-content-center me-3">
                <label><i class="fa-solid ${v.icon}"></i></label>
                </div>
                <div class="list-group">
                <label><b>${v.name}</b></label>
                <label><b>gpio pin:</b> ${v.gpio_pin}</label>
                </div>
                </div>
                </div>                
                `)
        })
    })
    let slot_drag_area = $('#slot-drag-area')
    slot_drag_area.sortable({
        revert: true,
        axis: 'y',
        handle: '.hand-holder',
        containment: '#slot-drag-area',
        tolerance: "pointer"
    });

    //  save sort
    $('#save-sort-btn').click(function () {
        let new_slot_data = []
        $('#slot-drag-area').children('.slot-drag-item').each(function (i, ele) {
            new_slot_data.push(components_data.find(e => e.slot === $(ele).data('slot')))
        })

        $.ajax({
            url: '/rasp-control/switch-controller/update-switch-sort',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                data: new_slot_data
            }),
            success: function (data) {
                console.log('data: ', data)
                alert('save success')
                components_data = data
                renew_component()
                $('#edit-slot-modal').modal('hide')
            },
            error: function (x, sts, ex) {
                alert(ex)
            }
        })

    })

    //  edit switch save btn
    $('#edit-switch-save-btn').click(function() {
        let name = $('#edit-name').val()
        let gpio_pin = $('#edit-gpio-pin').val()
        let icon = $('#edit-icon').val()
        let slot = $(this).data('slot')
        if (name === '') {
            alert('name cannot be empty')
            return
        }
        $.ajax({
            url: '/rasp-control/switch-controller/edit-switch',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                name: name,
                gpio_pin: gpio_pin,
                icon: icon,
                slot: slot
            }),
            success: function (data) {
                alert('edit successful')
                components_data = data
                renew_component()
                $('#edit-modal').modal('hide')
            },
            error: function (x, sts, ex) {
                alert(ex)
            }
        })
    })

})

