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
                $('#add-modal').hide()
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
                $.each(data, function (index, item) {
                    add_component(item.name, item.gpio_pin, item.icon)
                })
            } else {
                //  无数据
                components_html.append(
                    '<div class="d-flex justify-content-center">data was empty</div>'
                )
            }
        }
    })

    function add_component(name, pin, icon) {
        $('#components').append(
            '<div class="col-6">' +
            '<ul class="list-group">' +
            '<li class="list-group-item d-flex">' +
            '<div class="col-10 d-flex align-items-center">' +
            '<label class="me-3 input-group-text">' +
            `<i class="icon fa-solid ${icon}"></i>` +
            '</label>' +
            '<div class="list-group">' +
            `<label><b>${name}</b></label>` +
            `<label><b>gpio pin:</b> ${pin}</label>` +
            '</div>' +
            '</div>' +
            '<div class="col-2 d-flex justify-content-end align-items-center">' +
            '<div class="form-switch switch me-5">' +
            '<input class="form-check-input" type="checkbox" role="switch">' +
            '</div>' +
            '<button class="btn btn-danger position-absolute end-0 bottom-0 d-flex justify-content-center setting-btn">' +
            '<i class="fa-solid fa-gear"></i>' +
            '</button>' +
            '</div>' +
            '</li>' +
            '</ul>' +
            '</div>'
        )
    }
})

