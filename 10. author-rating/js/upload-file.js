var fileBlock = $('.test-file').find('.file');
var fileSizeDim = ['б', 'Кб', 'Мб', 'Гб', 'Тб'];

function getFileSize(num) {
    var i = 0;
    while (num > 1024) {
        num /= 1024;
        i++;
    }
    return Math.round(num) + " " + fileSizeDim[i];
}

$(document).ready(function() {
    $('.test-file').hide();
    
    $('input[type="file"]').change(function(event) {
        var filename = $(this).val().split('\\').pop().split('/').pop();
        fileBlock.find('.file-name').html(filename);
        fileBlock.find('.file-size').find('.size').html(getFileSize(this.files[0].size));
        $('.test-file').show();
    });
    
    $('.remove-file').click(function(event) {
        $('input[type="file"]').val("");
        $('.test-file').hide();
    });
});