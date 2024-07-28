
$(function () {

    $('#save-btn').click(function () {
        $.ajax({
            url: '/rasp-control/settings/save',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                fan_pin: $('#fan-pin').val(),
                pump_pin: $('#pump-pin').val()
            }),
            success: function (data) {
                alert(data)
            },
            error: function (x, sts, ex) {
                alert(ex)
            }
        })
    })

    $('#upload-background-btn').change(function () {
        let btn = $(this)
        let file = btn[0].files[0]
        //  limit 50 MB
        if (file.size > 50 * 1024 * 1024) {
            btn.val('')
            alert('file size must no above 50 MB')
            return
        }

        let data = new FormData()
        data.append('image', file)

        $.ajax({
            url: '/rasp-control/settings/upload-bg?is_upload=true',
            method: 'POST',
            data: data,
            processData: false,
            contentType: false,
            success: function (data) {
                refresh_bg()
            },
            error: function (x, sts, ex) {
                alert(ex)
            }
        })
    })

    $('#default-background-btn').click(function () {
        $.ajax({
            url: '/rasp-control/settings/upload-bg',
            method: 'POST',
            success: function (data) {
                refresh_bg()
            },
            error: function (x, sts, ex) {
                alert(ex)
            }
        })
    })

    function refresh_bg() {
        alert('Background image changed,\nPlease close and reopen this page to see the background image change.')
    }

})

