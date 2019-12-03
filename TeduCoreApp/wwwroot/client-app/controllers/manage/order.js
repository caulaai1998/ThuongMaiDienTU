var OrderController = function () {
    var cachedObj = {
        billStatuses: []
    }
    this.initialize = function () {
        loadBillStatus();
        loadData();
    }

    function loadData() {
        $.ajax({
            url: '/Manage/Order',
            type: 'GET',
            dataType: 'json',

            success: function (response) {
                var template = $('#listorderhistory').html();
                var template2 = $('#listorderhistory2').html();
                var temp;
                var isDuplicated;
                var render = "";
                $.each(response, function (i, item) {
                    var template3 = item.BillId;

                    if (temp == template3) {
                        isDuplicated = true;
                    }
                    else {
                        isDuplicated = false;
                        temp = template3;
                    }
                    if (isDuplicated) {
                        render += Mustache.render(template2,
                            {
                                // BillId: item.BillId,
                                ProductId: item.ProductId,
                                BillStatus: getBillStatusName(item.Billstatus),
                                SeoAlias: item.SeoAlias,
                                ProductName: item.ProductName,
                                ProductImage: item.ProductImage,
                                Quantity: item.Quantity,
                                //OrderDate: item.OrderDate,
                                Url: '/' + item.SeoAlias + "-p." + item.ProductId + ".html",
                            })
                    }
                    else {
                       
                        render += Mustache.render(template,
                            {
                                BillId: item.BillId,
                                BillStatus: getBillStatusName(item.Billstatus),
                                ProductId: item.ProductId,
                                SeoAlias: item.SeoAlias,
                                ProductName: item.ProductName,
                                ProductImage: item.ProductImage,
                                Quantity: item.Quantity,
                                //OrderDate: item.OrderDate,
                                Url: '/' + item.SeoAlias + "-p." + item.ProductId + ".html",
                            })
                    }

                });

                if (render !== "") {
                    $('#table-order-history-content').html(render);
                }
                else
                    $('#order-history').html('You have no order');

            }
        });

        return false;
    }
    function getBillStatusName(i) {
        if (i >= 0)
            return cachedObj.billStatuses[i].Name;
        else
            return '';
    }

    function loadBillStatus() {
        return $.ajax({
            type: "GET",
            url: "/Manage/GetBillStatus",
            dataType: "json",
            success: function (response) {
                cachedObj.billStatuses = response;
            }
        });
    }
}