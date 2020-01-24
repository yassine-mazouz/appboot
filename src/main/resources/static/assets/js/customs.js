$(document).ready(function() {
    $("#example").DataTable({
        aaSorting: [],
        responsive: true,
        "searching": false,
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        "bAutoWidth": false,

        columnDefs: [
            {
                responsivePriority: 1,
                targets: 0
            },
            {
                responsivePriority: 2,
                targets: -1
            }
        ]
    });

    $(".dataTables_filter input")
        .attr("placeholder", "Search Forms...")
        .css({
            width: "300px",
            display: "inline-block"
        });

    $('[data-toggle="tooltip"]').tooltip();
});
