
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
	$.get("http://localhost:8042/api/users?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiX192IjoiaW5pdCIsInJvbGUiOiJpbml0IiwiZGF0ZV9vZl9iaXJ0aCI6ImluaXQiLCJnZW5kZXIiOiJpbml0IiwiYXZhdGFyX2xpbmsiOiJpbml0IiwiZW1haWwiOiJpbml0IiwicGFzc3dvcmQiOiJpbml0IiwidXNlcm5hbWUiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsInJvbGUiOnRydWUsImRhdGVfb2ZfYmlydGgiOnRydWUsImdlbmRlciI6dHJ1ZSwiYXZhdGFyX2xpbmsiOnRydWUsImVtYWlsIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwidXNlcm5hbWUiOnRydWUsIm5hbWUiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfX3YiOjAsInJvbGUiOiJhZG1pbiIsImRhdGVfb2ZfYmlydGgiOiIyMDE1LTAzLTI0VDE3OjAwOjAwLjAwMFoiLCJnZW5kZXIiOiJtYWxlIiwiYXZhdGFyX2xpbmsiOiJodHRwczovL3MtbWVkaWEtY2FjaGUtYWswLnBpbmltZy5jb20vNzM2eC9lYS9jOS83OS9lYWM5NzliMmZkNmE4MTJiNGJkYWMxZDdlZjQxODk0ZC5qcGciLCJlbWFpbCI6Im5kYW4uaXR1c0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzExIiwidXNlcm5hbWUiOiJBbiIsIm5hbWUiOiJOZ3V54buFbiDEkMSDbmcgQW4iLCJfaWQiOiI1OTFlN2UwNWEzMjU3MjFjYTRmNDdmYTQifSwiaWF0IjoxNDk1MTcwNjg2LCJleHAiOjE0OTUyNTcwODZ9.WmBWrtc3DoV5nElYkqMF9ZSj3WTDK_8Q6JJ-xu91xXs",
		function(data, status) {
		console.log("Update admin list " + status);
		$("#member-list").html("");
        var memberCount=1;
		data.forEach(function(user){
			if (user.role=='admin') {
                $("#member-list").append(
                    '<tr>'+
                    '<td>'+memberCount+'</td>'+
                    '<td>'+user.username+'</td>'+
                    '<td>'+user.name+'</td>'+
                    '<td>'+user.email+'</td>'+
                    '<td><span class="label label-primary">Admin</span></td>'+
                    '<td><button class="delete-role btn btn-danger btn-sm">Delete</button></td></tr>');
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
	});
};

$(document).ready(function(){
	updateAdminList();
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
		var userName=null, name=null, email=null, password = null,
			avatar_link = null, gender = null, date_of_birth = null;
		if ($("#username").val()!="")
			userName = $("#username").val();
		if ($("#name").val()!="")
			name = $("#name").val();
		if ($("#email").val()!="")
			email = $("#email").val();
        if ($("#password").val()!="")
            password = $("#password").val();
        if ($("#avatar_link").val()!="")
            avatar_link = $("#avatar_link").val();
        if ($("#gender").val()!="")
            gender = $("#gender").val();
        if ($("#date_of_birth").val()!="")
            date_of_birth = $("#date_of_birth").val();

        if (!(userName&&name&&email&&password&&avatar_link&&gender&&date_of_birth)) {
			alert("Vui lòng điền đầy đủ thông tin");
			return;
		}

		// $.post("http://localhost:8042/api/sign_up", {
         //    "name": name,
		// 	"username": username,
         //    "password": password,
         //    "email": email,
         //    "avatar_link": avatar_link,
         //    "gender": gender,
         //    "date_of_birth": date_of_birth,
         //    "role": "admin"
		// }, function(data, status){
         //    console.log("Create new admin " + status);
         //    updateAdminList();
         //    $("#add-role-form").addClass("hidden");
         //    $(".delete-role").click(function() {
         //        $(this).parent().parent().hide()
         //    });
         //    alert("Đã thêm người dùng với vai trò Admin");
		// }, 'json');
	});
	var categoryCount=3;
	$(".delete").click(function(){
		$(this).parent().parent().parent().hide();
	});
	$(".delete-category").click(function(){
		$(this).parent().parent().hide();
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
		$("#category-list").append(
			 						 '<tr>'+
		                                  '<td>'+categoryCount+'</td>'+
		                                  '<td>'+name+'</td>'+
		                                  '<td>'+slug+'</td>'+                                 
		                                  '<td>'+des+'</td>'+            
		                                  '<td> 0 </td>'+
		                                  '<td>'+		                           
	                                  		'<button  class="delete-category edit-button btn btn-danger">Delete</button>'+   
	                                  	  '</td>'+
		                              '</tr>'
			);
		categoryCount++;
		alert("Added!!!");
		$(".delete-category").click(function(){
		$(this).parent().parent().hide();
	});

	})

	var name, count, price, category, imageElement, imageSrc,add;
	add-false; 
	count = 4;
	imageSrc=null;
	$("#product-form").submit(function(event){
				event.preventDefault();
				var nameNew=null, priceNew=null, categoryNew=null;
				if ($('#name').val()!="")
						nameNew = $('#name').val();
				if ($('#price').val()!="")
					priceNew = $('#price').val();
				if ($("#car").is(":checked")) {
						categoryNew = $("#car").val();
					} else if ($("#clothes").is(":checked")) {
						categoryNew = $("#clothes").val();
					}
				if (!(categoryNew&&priceNew&&nameNew&&imageSrc)) {
					alert("Vui lòng điền đầy đủ thông tin vào form");
					return;
				}

				if (add==false) {
					
					$(name).html(nameNew);
					$(price).html(priceNew);
					$(category).html(categoryNew);
					$(imageElement).html('<img class="icon-row" src="'+imageSrc+'">');
					alert("Updated!!!");
				} else if (add==true)
				{
					$("tbody").append(
												'<tr>'+
				                                  '<td>'+count+'</td>' +
				                                  '<td><img class="icon-row" src="'+imageSrc+'"></td>'+
				                                  '<td>'+nameNew+'</td>'+                                 
				                                  '<td>'+priceNew+' VND </td>'+            
				                                  '<td>'+categoryNew+'</td>' +
				                                  '<td>' +
				                                  	'<div>' +
				                                  		'<button  class="delete edit-button btn btn-danger">Delete</button>' +
				                                  	'</div>' +
				                                  	'<div>'+
				                                  		'<button  class="edit edit-button btn btn-success">Edit</button>'+
				                                  	'</div>'+
				                                  	
				                                  '</td>'+
				                              '</tr>');
					$(".edit").click(function(){
						add = false;
						show();
						name = $(this).parent().parent().parent().children().eq(2);
						price = $(this).parent().parent().parent().children().eq(3);
						category = $(this).parent().parent().parent().children().eq(4);		
						imageElement = $(this).parent().parent().parent().children().eq(1);
					});	
					$(".delete").click(function(){
						$(this).parent().parent().parent().hide();
					})
					count++;
					alert("Added!!!");

				}
				hide();				
			});
	
	$(".edit").click(function(){
		add = false;
		show();
		name = $(this).parent().parent().parent().children().eq(2);
		price = $(this).parent().parent().parent().children().eq(3);
		category = $(this).parent().parent().parent().children().eq(4);		
		imageElement = $(this).parent().parent().parent().children().eq(1);
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
		add = true;
		show();
				
	})

	$
});

