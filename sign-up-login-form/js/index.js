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

  // sign-up
  $("#submit-register").click(function(event){
    event.preventDefault();
    var response;
    var data = {
      'name': $('.first-name').val() + ' ' + $('.last-name').val(),
      'username': $('.new-username').val(),
      'email': $('.new-email').val(),
      'password': $('.new-password'),
      'role': 'member',
      'avatar_link': '',
      'data_of_birth': '1900-01-01',
      'gender': 'male'
    };
    $.ajax({
        url: 'https://localhost:8042/api/sign_up',
        type: 'POST',
        data: JSON.stringify(data),
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        success: function(result) {
           alert('success');
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert('error');
        }
    });
  });
   // $("#test").click(function(){
   //        event.preventDefault();
   //      var response;
   //      var data = {
   //        "name": "son",
   //        "username": "leminhson19965678912345",
   //        "password": "12347578789012345",
   //        "email": "abcdsdsd1234d5@gmail.com",
   //        "avatar_link": "abc.jpg",
   //        "gender": "male",
   //        "date_of_birth": "1996-04-02T17:00:00.000Z",
   //        "role": "member"
   //      };
   //      $.ajax({
   //          url: 'http://localhost:8042/api/sign_up',
   //          type: 'POST',
   //          data: JSON.stringify(data),
   //          dataType : "json",
   //          contentType: "application/json; charset=utf-8",
   //          success: function(result) {
   //              response = result;
   //              alert('success');
   //          },
   //          error: function(XMLHttpRequest, textStatus, errorThrown) {
   //              response = "err--" + XMLHttpRequest.status + " -- " + XMLHttpRequest.statusText;
   //              alert(response);
   //          }
   //      });
   //  });
});

