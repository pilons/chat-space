$(function(){ 
    function buildHTML(message){
    var Msessageimage = (message.image) ? message.image:"";
      var html =
        `<div class="message" >
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
            <div class="lower-message__content" data-message_id=${message.id}>
              ${message.content}
            </div>
          </div>
          <img src=${Msessageimage} >
        </div>`
      return html;
  }
  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action');
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });


 var reloadMessages = function() {
   //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
   last_message_id =  $(".lower-message__content:last").data("message_id")
   $.ajax({
    url: 'api/messages',
    type: "GET",
    data: {id:last_message_id},
    dataType: 'json',
    //processData: false,
    //contentType: false
  })
  .done(function(message){
    if(message.length != 0){
    var insertHTML = '';
    $.each(message, function(i, message){
      insertHTML += buildHTML(message)
    });
    $('.messages').append(insertHTML);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
  }
  })
  .fail(function(){
    console.log('error');
  });
 };
 setInterval(reloadMessages, 7000);
});
