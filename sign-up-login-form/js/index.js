$(document).ready(function(){

  $('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

    if (e.type === 'keyup') {
      if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
      if( $this.val() === '' ) {
        label.removeClass('active highlight'); 
      } else {
        label.removeClass('highlight');   
      }   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
        label.removeClass('highlight'); 
      } 
      else if( $this.val() !== '' ) {
        label.addClass('highlight');
      }
    }

  });

  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });

  $('.forgot').on('click', function(){
    alert("We've just sent you an email, please check it !");
  });

  //sign-up
  $("#test").click(function(event){
    event.preventDefault();
    var response;
    var data = {
      'name': $('.first-name').val() + ' ' + $('.last-name').val(),
      'username': $('.new-username').val(),
      'email': $('.new-email').val(),
      'password': $('.new-password'),
      'role': 'member'
    }
    $.ajax({
        url: 'http://localhost:8042/api/sign_up',
        type: 'POST',
        data: data,
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            response = result;
            console.log(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            response = "err--" + XMLHttpRequest.status + " -- " + XMLHttpRequest.statusText;
            alert(response);
        }
    });
  });
});

