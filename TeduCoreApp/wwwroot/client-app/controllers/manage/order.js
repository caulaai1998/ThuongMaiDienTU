var OrderController = function () {
    loadData();
}

function loadHeaderCart() {
    $("#headerCart").load("/AjaxContent/HeaderCart");
}
function loadData() {
    $.ajax({
        url: '/Manage/Order',
        type: 'GET',
        dataType: 'json',

        success: function (response) {
            var template = $('#template-order').html();
            var render = "";
            $.each(response, function (i, item) {
                render += Mustache.render(template,
                    {
                        //BillId: item.BillId,
                        ProductName: item.ProductName,
                        //ProductImage: item.ProductImage,
                        //Quantity: item.Quantity,
                        //OrderDate: item.OrderDate
                    });
             
            });
            if (render !== "")
                $('#template-order').html(render);
            else
                $('#template-order').html('You have no order');
            console.log(render);
            $('#listorderhistory').html(render);
            
           
        }
    });

    return false;
}
