$(function() {
    $( document ).tooltip();
 });
    function loginsucessfull(data){
      if(data.msg.DisplayName){
            $(".div-logout").fadeIn(500);
            $(".div-login").fadeOut(500);
            $('.div-logout-name').html(data.msg.DisplayName);//square,small,normal,large
            $('.img-profile').css('background-image', 'url(' + data.msg.ProfilePic +"?type=square"+ ')');
            
        }
        
      else
        alert(data.notice || data.err);  
   }

   function logoutfbme() {
      // ### to do fb logout 
            $.post('/logout',function (d) {
                if(d.msg){
                    alert(d.msg);
                    $(".div-logout").fadeOut(500);
                    $(".div-login").fadeIn(500);
                 }
                else
                  alert(d.notice||d.err);

            });
            
   } 
function voteme(param) { 
            var objmsg = document.getElementById("votes"+param);
              $.post("/vote/"+param,function (data) {
                    if (data.msg)
                       mypopup("Thanks",data.msg);
                    else if (data.notice)
                       mypopup("Instructions",data.notice); 
                    else
                       mypopup("Apologies",data.err);

               });
    }

function mypopup(arg,text){
                       $('.popup-header-label').html(arg);
                        $('.popup-middle-info').html(text);
                        $(".popup-container").fadeIn(500);
                   
}