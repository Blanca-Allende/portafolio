var ancho_pantalla, alto_pantalla, alto_menu;

new WOW().init();

var acciones = {
  listo: function () {
    jQuery("#lacarta .boton-morado").click(acciones.clickbtnmorado);

    jQuery(".cabecera .menu a[href*='#']").click(acciones.irancla);
    //jQuery(".btn-enviar").click(acciones.enviar);
    jQuery(".cabecera .hamb").click(acciones.abrirmenu);
    jQuery(".cerrarimagen").click(acciones.cerrarimagen);
    jQuery(".titulo-acordion").click(acciones.abriracordion);
    jQuery(".saltarina").click(acciones.irsaltarina);

    jQuery(".owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      nav: false,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 1,
        },
        1200: {
          items: 1,
        },
      },
    });
  },

  irsaltarina: function () {
    var posicion = jQuery(this).closest("section").next("section").offset().top;

    jQuery("html,body").animate(
      {
        scrollTop: posicion,
      },
      800
    );
  },

  abriracordion: function () {
    if (jQuery(this).find("i").hasClass("fa-chevron-up")) {
      jQuery(this).find("i").removeClass("fa-chevron-up");
    } else {
      jQuery(".titulo-acordion").find("i").removeClass("fa-chevron-up");
      jQuery(this).find("i").addClass("fa-chevron-up");
    }

    jQuery(".cuerpo-acordion").stop().slideUp("slow");
    jQuery(this).next(".cuerpo-acordion").stop().slideToggle("slow");
  },

  abrirmenu: function (e) {
    e.preventDefault();

    jQuery(".cabecera .menu").toggleClass("abierto");
    jQuery("body").toggleClass("abierto");
    jQuery(this).find("i").toggleClass("fa-times");
  },

  enviar: function () {
    jQuery("#frmcontacto").validate({
      rules: {
        nombre: "required",
        email: {
          required: true,
          email: true,
        },
        asunto: "required",
        mensaje: "required",
      },
      messages: {
        nombre: "Por favor, ingresa nombre",
        email: {
          required: "Por favor, ingresa email",
          email: "Por favor, ingresa un email válido",
        },
        asunto: "Por favor, ingresa asunto",
        mensaje: "Por favor, ingresa mensaje",
      },
      submitHandler: function (form) {},
    });

    var validado = jQuery("#frmcontacto").valid();

    if (validado) {
      jQuery
        .ajax({
          method: "POST",
          url: "registro.php",
          data: jQuery("#frmcontacto").serialize(),
          dataType: "json",
        })
        .done(function (data) {
          jQuery("#respuesta").html("");
          jQuery("label.error").remove();
          jQuery(".form-input.error").removeClass("error");
          if (data.tipo == 1) {
            jQuery("#respuesta").css({ color: "green" }).html(data.mensaje);
          } else if (data.tipo == 2) {
            jQuery.each(data.errores, function (indice, elemento) {
              var html =
                "<label id='error-" +
                elemento.id +
                "' class='error'>" +
                elemento.mensaje +
                "</label>";
              jQuery("#" + elemento.id).addClass("error");
              jQuery("#" + elemento.id)
                .closest(".form-bloques")
                .append(html);
            });
          } else {
            alert(data.mensaje);
          }
        })
        .fail(function (error) {
          jQuery("#respuesta").css({ color: "red" }).html(error.responseText);
        });
    }
  },

  obtenersrc: function () {},

  cerrarmenu: function () {
    jQuery(".cabecera .menu").removeClass("abierto");
    jQuery("body").removeClass("abierto");
    jQuery(".cabecera .hamb").find("i").removeClass("fa-times");
  },

  irancla: function (e) {
    e.preventDefault();
    var ancla = this.hash;
    var url = jQuery(this).attr("href");

    if (jQuery(ancla).length > 0) {
      acciones.cerrarmenu();
      acciones.detalleancla(ancla);
    } else {
      window.location.href = url;
    }
    //alert(ancla);
  },

  detalleancla: function (ancla) {
    jQuery("html,body").animate(
      {
        scrollTop: jQuery(ancla).offset().top,
      },
      800,
      function () {}
    );
  },

  clickbtnmorado: function (e) {
    e.preventDefault();
    var src = jQuery(this)
      .closest(".conteendor-cuadrado")
      .find("img")
      .attr("src");

    jQuery(".cuerpoimagen").find("img").attr("src", src);
    jQuery(".trama").fadeIn("slow", function () {
      jQuery(".cuerpoimagen").fadeIn("fast");
    });
  },

  cerrarimagen: function (e) {
    e.preventDefault();
    jQuery(".cuerpoimagen").fadeOut("slow", function () {
      jQuery(".cuerpoimagen").find("img").attr("src", "");
      jQuery(".trama").fadeOut("fast");
    });
  },

  precarga: function () {
    jQuery(".trama-2").fadeOut("slow");
    jQuery(".logo-load").fadeOut("slow", function () {
      jQuery("body").removeClass("abierto");
    });
    setTimeout(function () {
      var ancla = window.location.hash;
      if (jQuery(ancla).length > 0) {
        acciones.detalleancla(ancla);
      }
    }, 1000);
    acciones.redimensionar();
  },

  redimensionar: function () {
    var cabecera = jQuery(".cabecera");
    var posicion_menu = cabecera.offset().top;
    alto_menu = cabecera.innerHeight();
    ancho_pantalla = jQuery(window).width();

    acciones.cerrarmenu();

    if (ancho_pantalla < 768) {
      jQuery(".cabecera .menu").css({
        "padding-top": alto_menu,
        "padding-bottom": alto_menu,
      });
    } else {
      jQuery(".cabecera .menu").css({ "padding-top": 0, "padding-bottom": 0 });
    }

    if (posicion_menu > alto_menu) {
      cabecera.addClass("fondo");
    } else {
      cabecera.removeClass("fondo");
    }
  },

  scrollventana: function () {
    if (jQuery(window).scrollTop() > alto_menu) {
      jQuery(".cabecera").addClass("fondo");
    } else {
      jQuery(".cabecera").removeClass("fondo");
    }
  },
};

jQuery(window).on("load", acciones.precarga);
jQuery(window).resize(acciones.redimensionar);
jQuery(window).scroll(acciones.scrollventana);
jQuery(document).ready(acciones.listo);

function validando(token) {
  acciones.enviar();
}
