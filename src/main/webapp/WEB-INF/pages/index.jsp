<%@ page pageEncoding="UTF-8" %>
<%@  taglib prefix="spring" uri="http://www.springframework.org/tags"%><%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<spring:url value="/resources/" var="resources" />
<html>
<head>
    <title>Home</title>
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/css/customcss.css" rel="stylesheet">
    <link href="assets/css/dataTables.bootstrap4.min.css" rel="stylesheet">
    <link href="assets/css/responsive.dataTables.min.css" rel="stylesheet">
    <script src="assets/js/jquery.min.js"></script>


</head>
<body>
<div class="container">
    <div class="row py-5">
        <div class="col-12">
            <button type="button" class="btn btn-success" onclick="addmodal()">Ajouter</button>

            <table id="example" class="table table-hover responsive nowrap" style="width:100%">
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>

                <c:forEach items="${All}" var="v">
                 <tr>
                    <td>${v.name}</td>
                    <td>${v.lastName}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="modifmodal('${v.id}')">Modifier</button>

                        <a href="/deleteUser?id=${v.id}" style="color: white" class="btn btn-sm btn-danger" type="button" id="SupBtn" >
                                Supprimer
                            </a>

                    </td>
                </tr>
                </c:forEach>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <form method="GET" action="/add" id="formget">
            <div class="modal-body">
                <input type="hidden" class="form-control" name="id" id="idinput">

                <div class="form-group">
                    <label>Nom :</label>
                    <input type="text" class="form-control" name="nom" id="nominput">
                </div>
                <div class="form-group">
                    <label>Prénom :</label>
                    <input type="text" class="form-control" name="prenom" id="prenominput" >
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-success" id="submit" >Ajouter</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
            </form>
        </div>

    </div>
</div>


<script>
    function modifmodal(id){


        $.ajax({
            type: "GET",
            url: '/getOneUseser',
            data : 'id=' + id,
            success: function(response){

                $("#nominput").val(response.oneuser['name']);
                $("#prenominput").val(response.oneuser['lastName']);
                $("#idinput").val(response.oneuser['id']);
                $("#submit").text("Modifier");
                $('#myModal').modal('show');
            }
        });
    }
    function addmodal(){

                $('input').val("");
                $("#submit").text("Ajouter");
                $('#myModal').modal('show');
    }
</script>


</body>
<footer>

    <script src="assets/js/popper.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/jquery.dataTables.min.js"></script>
    <script src="assets/js/dataTables.responsive.min.js"></script>
    <script src="assets/js/dataTables.bootstrap4.min.js"></script>
    <script src="assets/js/customs.js"></script>

</footer>
</html>
