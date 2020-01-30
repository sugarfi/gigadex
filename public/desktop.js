$(document).ready(function() {
    $('.taskbar-item a').click(function(e) {
        e.preventDefault();
        let newWindow;
        newWindow = $('<div class="window-wrapper"></div>');
        $(newWindow).load($(this).attr('href'));
        $('.app').append(newWindow);
    });
    let home;
    let oldX = 0;
    let oldY = 0;
    home = $('<div class="window-wrapper"></div>');
    $(home).load('default/home');
    $('.app').append(home);
    $('body').on('mousedown', '.title-bar', function (e) {
        $(this).data('mouse', true);
    });
    $('body').on('mouseup', '.title-bar', function (e) {
        $(this).data('mouse', false);
    });
    $('body').on('mousemove', '.title-bar', function (e) {
        if ($(this).data('mouse')) {
            let x = e.pageX - oldX;
            let y = e.pageY - oldY;
            oldX = e.pageX;
            oldY = e.pageY;
            let left = e.pageX - ($(this).parent().width() / 2);
            let top = e.pageY - ($(this).height() / 2);
            $(this).parent().offset({top: top, left: left});
        }
    });
    $('body').on('click', '.close-button', function (e) {
        $(this).closest('.window-wrapper').remove();
    });
})
