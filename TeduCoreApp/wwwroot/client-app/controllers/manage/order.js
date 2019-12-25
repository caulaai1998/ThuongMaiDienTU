var OrderController = function () {
    var cachedObj = {
        billStatuses: []
    }
    this.initialize = function () {
        loadBillStatus();
        loadData();
        registerEvent();
    }

    function registerEvent() {
        $('body').on('click', '#btn-cancel-order', function (e) {
            e.preventDefault();
            swal({
                title: "Bạn có thực sự muốn hủy đơn hàng?",
                text: "Nếu xóa, bạn sẽ không thể phục hồi!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    swal("Okay! Đơn hàng của bạn đã được hủy!", {
                        icon: "success",
                    });

                    var that = $(this).data('id');
                    $.ajax({
                        url: '/Manage/CancelOrder',
                        type: 'PUT',
                        data: { billId: that },
                        success: function () {
                            var html = "<span>Đơn hàng số:" + that + "Đơn hàng bị hủy";
                            html += "</span>"
                            document.getElementsByClassName('display-bill-id-' + that)[0].childNodes[1].innerHTML = html;
                        },
                        error: function () {
                            console.log('hủy đơn hàng thất bại');
                        }
                    })

                } else {
                    swal("Bạn đã làm đúng rồi đấy !!!");
                }
            });
        });
    }

   



    function loadData() {
        $.ajax({
            url: '/Manage/Order',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                console.log(response);
                var template = $('#listorderhistory').html();
                var template2 = $('#listorderhistory2').html();
                var template3 = $('#cancelorder').html();
                var temp;
                var isDuplicate;
                var render = "";
                $.each(response, function (i, item) {
                    var temp2 = item.BillId;

                    if (temp != temp2) {
                        isDuplicate = false;
                        temp = temp2;
                    }
                    else {
                        isDuplicate = true;
                    }

                    console.log(isDuplicate)
                    if (!isDuplicate) {
                        if (item.Billstatus !== 4 && item.Billstatus !== 3 && item.Billstatus !== 1) {
                            console.log('render template 1')
                            render += Mustache.render(template,
                                {
                                    BillId: item.BillId,
                                    ProductId: item.ProductId,
                                    BillStatus: getBillStatusName(item.Billstatus),
                                    SeoAlias: item.SeoAlias,
                                    ProductName: item.ProductName,
                                    ProductImage: item.ProductImage,
                                    Quantity: item.Quantity,
                                    //OrderDate: item.OrderDate,
                                    Url: '/' + item.SeoAlias + "-p." + item.ProductId + ".html",
                                });
                        }
                        else {
                            console.log('render template 3');
                            render += Mustache.render(template3,
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
                                });
                        }
                    }
                    else {
                        console.log('render template 2')
                        render += Mustache.render(template2,
                            {
                                //BillId: item.BillId,
                                BillStatus: getBillStatusName(item.Billstatus),
                                ProductId: item.ProductId,
                                SeoAlias: item.SeoAlias,
                                ProductName: item.ProductName,
                                ProductImage: item.ProductImage,
                                Quantity: item.Quantity,
                                //OrderDate: item.OrderDate,
                                Url: '/' + item.SeoAlias + "-p." + item.ProductId + ".html",
                            });
                    }
                });

                if (render !== "") {
                    $('#table-order-history-content').html(render);
                }
                else
                    $('#order-history').html('Bạn không có đơn hàng');
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