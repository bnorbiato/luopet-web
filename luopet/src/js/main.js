
/***
 * GERAL
 ***/

// onSubmit FaleConosco
function onSubmitFaleConosco(token) {
    $.ajax({
        url: siteurl + '/wp-admin/admin-ajax.php',
        type: 'POST',
        dataType: 'json',
        data: {
            action: 'recaptcha',
            token: token,
        }
    }).done(function(response) {
        console.log(response);

        $('#fale_conosco').find('.Button').addClass('_loading');

        if (response.success == true) {
            $('#fale_conosco').submit();
        } else {
            console.log('nao funcionou');
        }
    }); 
}

// onSubmit OndeEncontrar
function onSubmitOndeEncontrar(token) {
    $.ajax({
        url: siteurl + '/wp-admin/admin-ajax.php',
        type: 'POST',
        dataType: 'json',
        data: {
            action: 'recaptcha',
            token: token,
        }
    }).done(function(response) {
        console.log(response);

        $('#onde_encontrar').find('.Button').addClass('_loading');

        if (response.success == true) {
            $('#onde_encontrar').submit();
        } else {
            console.log('nao funcionou');
        }
    }); 
}

// onSubmit Newsletter Cat
function onSubmitNewsletterCat(token) {
    $.ajax({
        url: siteurl + '/wp-admin/admin-ajax.php',
        type: 'POST',
        dataType: 'json',
        data: {
            action: 'recaptcha',
            token: token,
        }
    }).done(function(response) {
        console.log(response);

        $('#cat_menu').find('.Button').addClass('_loading');

        if (response.success == true) {
            $('#cat_menu').submit();
        } else {
            console.log('nao funcionou');
        }
    }); 
}

// onSubmit Newsletter Dog
function onSubmitNewsletterDog(token) {
    $.ajax({
        url: siteurl + '/wp-admin/admin-ajax.php',
        type: 'POST',
        dataType: 'json',
        data: {
            action: 'recaptcha',
            token: token,
        }
    }).done(function(response) {
        console.log(response);

        $('#dog_menu').find('.Button').addClass('_loading');

        if (response.success == true) {
            $('#dog_menu').submit();
        } else {
            console.log('nao funcionou');
        }
    }); 
}

$(function() {

    App.SetToggle();
    App.SetGaleria();
    App.SetBanner();
    App.SetCarouselMobile();
    App.SetHeaderFixed(135);
    App.SetimagesLoaded();
    App.SetMaskInput();
    App.SetInputError();
    App.SetFormSuccess();
    App.SetAnimatescroll(150);
    App.SetWow(200);

    // Cidades Form
    $('#uf').on('change', function() {
        value  = $('select[name=uf]').val();
        cidade = $('select[name=cidade]');

        if (value) {
            for (var i = 0; i < cidades[value].length; i++) {
                row = cidades[value][i];
                cidade.append('<option value="'+ row.name +'" data-lat="'+ row.lat +'" data-lng="'+ row.lng +'">'+ row.name +'</option>');
            }
        }
    });

    $('.itens').on('click', '.item', function(event) {
        event.preventDefault();
        target = $(this).data('target');
        var xPos = event.pageX - $(this).offset().left;
        var yPos = event.pageY - $(this).offset().top;

        $('.itens .item').removeClass('_active');
        $(this).addClass('_active');

        $('.blocos .bloco').removeClass('_active');

        $(this).position({my: "right top"});
        $(target).addClass('_active');
        $('.Ingredientes .texto').addClass('_active');
    });

    $(window).scroll(function(event) {
        /* Act on the event */
        $('.blocos .bloco').removeClass('_active');
        $('.itens .item').removeClass('_active');
        $('.Ingredientes .texto').removeClass('_active');
    });

    // Fechar ao clicar fora do box
    $('body').click(function(evt) {  
        if($(event.target).attr('class') != undefined) {
            $('.blocos .bloco').removeClass('_active');   
            $('.itens .item').removeClass('_active');
            $('.Ingredientes .texto').removeClass('_active');
        }     
    });

    $('.Form#fale_conosco button[type=submit]').after('<button class="g-recaptcha Button" data-sitekey="6LdlqLAUAAAAAGNwE9lB0E3tBThQJH357eWYK_Qz" data-callback="onSubmitFaleConosco">Enviar</button>');
    $('.Form#onde_encontrar button[type=submit]').after('<button class="g-recaptcha Button" data-sitekey="6LdlqLAUAAAAAGNwE9lB0E3tBThQJH357eWYK_Qz" data-callback="onSubmitOndeEncontrar">Enviar</button>');
    $('.Form#cat_menu button[type=submit]').after('<button class="g-recaptcha Button" data-sitekey="6LdlqLAUAAAAAGNwE9lB0E3tBThQJH357eWYK_Qz" data-callback="onSubmitNewsletterCat">Enviar</button>');
    $('.Form#dog_menu button[type=submit]').after('<button class="g-recaptcha Button" data-sitekey="6LdlqLAUAAAAAGNwE9lB0E3tBThQJH357eWYK_Qz" data-callback="onSubmitNewsletterDog">Enviar</button>');
    $('.Form button[type=submit]').remove();
    $('.Form .Button').attr('type', 'submit');

});