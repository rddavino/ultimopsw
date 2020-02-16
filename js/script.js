$(document).ready(function () {
    $('.sidenav').sidenav();
    $('#cliente').formSelect();
    $('#codVeiculo').formSelect();
    $('#obra').formSelect();

    $.ajax({
        url: "http://localhost:3000/clientes",
        data: [],
        success: function(result){
            var Options="";
            for (i = 0; i < result.length; i++) {
                const cliente = result[i];
                Options=Options+'<option value="'+ cliente.codCliente +'">' + cliente.NomeEmpresa + '</option>';
            }

            $('#cliente').append(Options);
            $("#cliente").formSelect()
        },
        dataType: 'json'
    });

    $.ajax({
        url: "http://localhost:3000/vehicle",
        data: [],
        success: function(result){
            var Options="";
            for (i = 0; i < result.length; i++) {
                const veiculo = result[i];
                Options=Options+'<option value="'+ veiculo.codVeiculo +'">' + veiculo.Modelo + '</option>';
            }

            $('#veiculo').append(Options);
            $("#veiculo").formSelect()
        },
        dataType: 'json'
    });

    $.ajax({
        url: "http://localhost:3000/construction",
        data: [],
        success: function(result){
            var Options="";
            for (i = 0; i < result.length; i++) {
                const obra = result[i];
                Options=Options+'<option value="'+ obra.codObra +'">' + obra.endereco.bairro + " - " + obra.endereco.cep + '</option>';
            }

            $('#obra').append(Options);
            $("#obra").formSelect()
        },
        dataType: 'json'
    });

    $('.datepicker').datepicker({
        i18n: {
            months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
            weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
            today: 'Hoje',
            clear: 'Limpar',
            cancel: 'Sair',
            done: 'Confirmar',
            labelMonthNext: 'Próximo mês',
            labelMonthPrev: 'Mês anterior',
            labelMonthSelect: 'Selecione um mês',
            labelYearSelect: 'Selecione um ano',
            selectMonths: true,
            selectYears: 15,
        },
        format: 'dd/mm/yyyy',
        container: 'body',
        minDate: new Date(),
    });

    $('#formulario-parte2').hide();
    $('#verificar-disponibilidade').click(function () {
        //if tem equipamento não estiver alocado nessa data
        var x = 1;
        if (x == 1) {
            $('#formulario-parte2').show();
        } else {
            swal("Equipamento indisponível", "Escolha outra data para alocar este equipamento", "error");
        }
    });

    $('#alocar').click(function () {
        let dataInicio = toDate("#data-inicio");
        let dataFim = toDate("#data-fim");

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/alocacao",
            data: {
                cliente: $("select#cliente").val(),
                valor: $("#valor-combinado").val(),
                dataInicio: dataInicio,
                dataFim: dataFim
            },
            success: function(result){
                console.log(result);
            },
            error: function(error){
                console.log(error);
            }
        });
    });

    function toDate(selector) {
        var from = $(selector).val().split("/");
        return from[2]+"/"+from[1]+"/"+from[0];
      }
});
