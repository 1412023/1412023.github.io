var allUser ={};
var allProduct = {};
var allCategory = {};
var addProductOrEdit;
var productName;
var imageSrc=null;

var token = "?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiX192IjoiaW5pdCIsInJvbGUiOiJpbml0IiwiZGF0ZV9vZl9iaXJ0aCI6ImluaXQiLCJnZW5kZXIiOiJpbml0IiwiYXZhdGFyX2xpbmsiOiJpbml0IiwiZW1haWwiOiJpbml0IiwicGFzc3dvcmQiOiJpbml0IiwidXNlcm5hbWUiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsInJvbGUiOnRydWUsImRhdGVfb2ZfYmlydGgiOnRydWUsImdlbmRlciI6dHJ1ZSwiYXZhdGFyX2xpbmsiOnRydWUsImVtYWlsIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwidXNlcm5hbWUiOnRydWUsIm5hbWUiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfX3YiOjAsInJvbGUiOiJhZG1pbiIsImRhdGVfb2ZfYmlydGgiOiIyMDE1LTAzLTI0VDE3OjAwOjAwLjAwMFoiLCJnZW5kZXIiOiJtYWxlIiwiYXZhdGFyX2xpbmsiOiJodHRwczovL3MtbWVkaWEtY2FjaGUtYWswLnBpbmltZy5jb20vNzM2eC9lYS9jOS83OS9lYWM5NzliMmZkNmE4MTJiNGJkYWMxZDdlZjQxODk0ZC5qcGciLCJlbWFpbCI6Im5kYW4uaXR1c0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzExIiwidXNlcm5hbWUiOiJBbiIsIm5hbWUiOiJOZ3V54buFbiDEkMSDbmcgQW4iLCJfaWQiOiI1OTFlN2UwNWEzMjU3MjFjYTRmNDdmYTQifSwiaWF0IjoxNDk1MjY0MTI4LCJleHAiOjE0OTUzNTA1Mjh9.OQ9hk-6-wzazbIdpL3ad75Q58sVTqDBIOWQkisCAdl4";
function show(){
		//window.location.href = "/admin/add-product.html";
		$(".product-table").addClass("col-lg-6");
		// $(".table").addClass("form-left");
		$(".form-edit").removeClass("edit-product-hidden");
		$(".form-edit").addClass("edit-product-visible");
		$(".form-edit").addClass("col-lg-6");

	};

function hide(){
		//window.location.href = "/admin/add-product.html";
		$(".product-table").removeClass("col-lg-6");
		// $(".table").addClass("form-left");
		$(".form-edit").addClass("edit-product-hidden");
		$(".form-edit").removeClass("edit-product-visible");
		$(".form-edit").removeClass("col-lg-6");
	};
function updateAdminList() {
	$.get("http://localhost:8042/api/users"+token,
		function(data, status) {
		console.log("Update admin list " + status);
		$("#member-list").html("");
        var memberCount=1;
        allUser = data;

		data.forEach(function(user){
			if (user.role=='admin') {
                $("#member-list").append(
                    '<tr>'+
                    '<td>'+memberCount+'</td>'+
                    '<td>'+user.username+'</td>'+
                    '<td>'+user.name+'</td>'+
                    '<td>'+user.email+'</td>'+
                    '<td><span class="label label-primary">Admin</span></td>'+
                    '<td><button class="delete-role btn btn-danger btn-sm">Delete</button>'+
                    '<td><button class="delete-admin-role btn btn-success btn-sm">Set to member</button></td></tr>');
			} else {
                $("#member-list").append(
                    '<tr>'+
                    '<td>'+memberCount+'</td>'+
                    '<td>'+user.username+'</td>'+
                    '<td>'+user.name+'</td>'+
                    '<td>'+user.email+'</td>'+
                    '<td><span class="label label-warning">Member</span></td>'+
                    '<td><button class="delete-role btn btn-danger btn-sm">Delete</button></td></tr>');
			}

            memberCount++;
		});
		updateMemberBtn();
	});
};
function updateMemberBtn() {
    $(".delete-role").click(function() {
        var thisBtn = this;
        allUser.forEach(function(user) {
            if (user.username == $(thisBtn).parent().parent().children().eq(1).text() ){
                $.ajax({
                    url: 'http://localhost:8042/api/users/'+user._id+token,
                    type: 'DELETE',
                    success: function(result) {
                        alert('Đã xóa user');
                        updateAdminList();
                        return false;
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                        return false;
                    }
                });
            }
        });
    });

    $(".delete-admin-role").click(function() {
        var username = $(this).parent().parent().children().eq(1).text();
        setMemberRole(username, "member");
    });



}
function updateProductBtn(nameNew, priceNew, categoryNew, imageSrc){
    $(".edit").click(function(){
        addProductOrEdit = false;
        show();
        productName = $(this).parent().parent().parent().children().eq(2).text();
    });
    $(".delete").click(function(){
        $(this).parent().parent().parent().hide();

        var thisBtn = this;
        allProduct.forEach(function(product) {
            if (product.name == $(thisBtn).parent().parent().parent().children().eq(2).text() ){
                $.ajax({
                    url: 'http://localhost:8042/api/remove_a_product/'+product._id+token,
                    type: 'DELETE',
                    success: function(result) {
                        alert('This product has been deleted!!!');
                        updateProductList();
                        return false;
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                        return false;
                    }
                });
            }
        });
    })
}
function finCategoryByName(name){
    var ressult;
    allCategory.forEach(function(category){
        if (category.name == name) {
            ressult = category._id;
            return;
        }
    })
    return ressult;
}
function findCategoryById(id){
    var ressult;
    allCategory.forEach(function(category){
        if (category._id == id) {
            ressult = category.name;
            return;
        }
    })
    return ressult;
}
function updateCategoryBtn(){
    $(".delete-category").click(function(){
        var id = finCategoryByName($(this).parent().parent().children().eq(1).text());
        $.ajax({
            url: 'http://localhost:8042/api/category/'+id+token,
            type: 'DELETE',
            success: function(result) {
                alert('This category has been deleted!!!');
                updateCategoryList();
                return false;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
                return false;
            }
        });
    })
}
function updateCategoryList(){
    $.get("http://localhost:8042/api/all_categories"+token,
        function(data, status) {
            console.log("Update category list " + status);
            $("#product-category").html("");
            $("#category-list").html("");
            allCategory = data;
            categoryCount = 0;
            data.forEach(function(category){
                    $("#product-category").append(
                        '<option value="'+ category.name+'">'+category.name +'</option>'
                    );
                    $("#category-list").append(
                        '<tr>'+
                        '<td>'+categoryCount+'</td>'+
                        '<td>'+category.name+'</td>'+
                        '<td>'+category.slug+'</td>'+
                        '<td>'+category.description+'</td>'+
                        '<td>'+category.count + '</td>'+
                        '<td>'+
                        '<button  class="delete-category edit-button btn btn-danger">Delete</button>'+
                        '</td>'+
                        '</tr>'
                    );
                    categoryCount++;
            });
            updateCategoryBtn();
        }
    );
}
function updateProduct(nameNew, priceNew, categoryNew, imageSrc,colorNew, sizeNew, brandNew, saleNew, desNew){

    allProduct.forEach(function(product){
        if (product.name == productName)
        {
            $.ajax({
                url: 'http://localhost:8042/api/update_a_product/'+product._id+token,
                type: 'PUT',
                data: JSON.stringify({
                    name: nameNew,
                    description: desNew,
                    _category: finCategoryByName(categoryNew),
                    image_link: imageSrc,
                    color: colorNew,
                    price: priceNew,
                    size: sizeNew,
                    brand: brandNew,
                    sale_off: saleNew
                }),
                dataType : "json",
                contentType: "application/json; charset=utf-8",
                success: function(result) {
                    alert('This product has been updated!!!');
                    updateProductList();
                    return;
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus);
                    return;
                }
            });
        }
    })
}
function setMemberRole(username, role){
	allUser.forEach(function(user){
		if (user.username == username)
		{
            $.ajax({
                url: 'http://localhost:8042/api/users/'+user._id+token,
                type: 'PUT',
                data: JSON.stringify({role: role}),
                dataType : "json",
                contentType: "application/json; charset=utf-8",
                success: function(result) {
                    alert('Đã cập nhật người dùng thành ' +role);
                    updateAdminList();
                    return;
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                    return;
                }
            });
		}
	})
	alert("Username không tồn tại");
}
function updateProductList() {
    $.get("http://localhost:8042/api/get_all_products"+token,
        function(data, status) {
            console.log("Update product list " + status);
            $("#product-list").html("");
            var productCount=1;
            allProduct = data;
            var imageSrc = null;
            allProduct.forEach(function(product){
                if (product.image_link[0]=='i')
                    imageSrc = '../'+product.image_link;
                else imageSrc = product.image_link;
                $("#product-list").append(
                    '<tr>'+
                    '<td>'+productCount+'</td>' +
                    '<td><img class="icon-row" src="'+imageSrc+'"></td>'+
                    '<td>'+product.name+'</td>'+
                    '<td>'+product.price+' VND </td>'+
                    '<td>'+findCategoryById(product._category)+'</td>' +
                    '<td>' +
                    '<div>' +
                    '<button  class="delete edit-button btn btn-danger">Delete</button>' +
                    '</div>' +
                    '<div>'+
                    '<button  class="edit edit-button btn btn-success">Edit</button>'+
                    '</div>'+

                    '</td>'+
                    '</tr>');
                productCount++;
            });
            updateProductBtn();
        });
}
function addProduct(nameNew, priceNew, categoryNew, imageSrc,colorNew, sizeNew, brandNew, saleNew, desNew){
    $.ajax({
        url: 'http://localhost:8042/api/add_new_product/'+token,
        type: 'PUT',
        data: JSON.stringify({
            name: nameNew,
            description: desNew,
            _category: finCategoryByName(categoryNew),
            image_link: imageSrc,
            color: colorNew,
            price: priceNew,
            size: sizeNew,
            brand: brandNew,
            sale_off: saleNew
        }),
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            alert('This product has been added!!!');
            updateProductList();
            return;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
            return;
        }
    });
}
function addCategory(name, slug, des){
    $.ajax({
        url: 'http://localhost:8042/api/category/'+token,
        type: 'POST',
        data: JSON.stringify({
            name: name,
            description: des,
            slug: slug,
            count: 0
        }),
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            alert('Added category!!!');
            updateCategoryList();
            return;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
            return;
        }
    });
}
$(document).ready(function(){
	updateAdminList();
    updateCategoryList();
	updateProductList();

	$(".delete-role").click(function(){
		$(this).parent().parent().hide();
	})
	$("#add-role-button").click(function(){
		$("#add-role-form").removeClass("hidden");
	})
	$("#add-role-cancel-button").click(function(){
		$("#add-role-form").addClass("hidden");
	})
	$("#add-role-form").submit(function(event){
		event.preventDefault();
		var userName=null;
		if ($("#username").val()!="")
			userName = $("#username").val();
	    if (!userName) {
			alert("Vui lòng điền username");
			return;
		}
		setMemberRole(userName,"admin");

	});
	$("#form-submit-add-category").submit(function(event){
		event.preventDefault();
		var name=null, slug=null, des=null;
		if ($('#name-category').val()!="")
						name = $('#name-category').val();
		if ($('#slug-category').val()!="")
						slug = $('#slug-category').val();
		if ($('#des-category').val()!="")
						des = $('#des-category').val();
		if (!(name&&slug&&des)) {
			alert("Vui lòng điền đầy đủ thông tin");
			return;
		}
        addCategory(name, slug, des);
	});

	$("#product-form").submit(function(event){
				event.preventDefault();
				var nameNew, priceNew, categoryNew, colorNew, sizeNew, brandNew, saleNew, desNew;
				if ($('#product-name').val()!="")
						nameNew = $('#product-name').val();
				if ($('#product-price').val()!="")
                        priceNew = $('#product-price').val();
                 if ($('#product-category').val()!="")
                        categoryNew = $('#product-category').val();
                if ($('#product-color').val()!="")
                        colorNew = $('#product-color').val();
                if ($('#product-size').val()!="")
                        sizeNew = $('#product-size').val();
                if ($('#product-brand').val()!="")
                        brandNew = $('#product-brand').val();
                if ($('#product-des').val()!="")
                        desNew = $('#product-des').val();
                if ($('#product-sale').val()!="")
                        saleNew = $('#product-sale').val();
        if (!(nameNew&&priceNew&&categoryNew&&colorNew&&sizeNew&&brandNew&&saleNew&&desNew&&imageSrc)) {
					alert("Vui lòng điền đầy đủ thông tin vào form");
					return;
				}
				if (addProductOrEdit==false) {
				    updateProduct(nameNew, priceNew, categoryNew, imageSrc,colorNew, sizeNew, brandNew, saleNew, desNew);
				} else if (addProductOrEdit==true)
				{
                    addProduct(nameNew, priceNew, categoryNew, imageSrc,colorNew, sizeNew, brandNew, saleNew, desNew);
                }
				hide();				
    });
	$("#cancel").click(hide);
	$("#upload-image").change(function(){
		  	var url = $(this).val();
		    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
		    if (this.files && this.files[0]&& (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) 
		     {
		        var reader = new FileReader();

		        reader.onload = function (e) {
		        	imageSrc=e.target.result;
		           $('#loaded-image').attr('src', e.target.result);
		        }
		       reader.readAsDataURL(this.files[0]);
		    }
		    else
		    {
                imageSrc=null;
		      $('#loaded-image').attr('src', 'images/noimagefound.jpg');
		    }
	})
	$("#add-product").click(function(){
		addProductOrEdit = true;
		show();
	})
});

