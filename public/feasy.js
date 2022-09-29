const feasy = {
  buttonAppend: (buttonPosition) => {
    $(buttonPosition).append(
      '<input style="width: 25px; height:40px;" type="button" value="Feasyから入力" "font size="+10" width=500 height=100 id="feasyModalBtn" class="feasyModalBtn">'
    )
    //$('#modalBtn').css('background-color', 'red')

    $('.feasyModalBtn').css({
      display: 'inlineblock',
      background: 'linear-gradient(0.15turn, #75a9ff,#4689ff,#005fff)',
      width: '150px',
      'font-size': '20px',
      color: '#ddffff',
      padding: '0,30',
      'border-color': '#99ccff #0099cc #0099cc #99ccff',
      height: '48px',
      'font-weight': 'bold',
      'border-radius': '4px',
      //'box-shadow': '0 3px 5px 2px rgb(255 105 135 / 30%)',
      '-webkit-tap-highlight-color': 'transparent',
      transition: '.3s ease-out',
    })
    $('.feasyModalBtn').hover(function () {
      $(this).css({
        cursor: 'pointer',
        'text-decoration': 'none',
        'box-shadow': '0 5px 10px 0 rgba(0,0,0,0.12), 0 3px 20px 0 rgba(0,0,0,0.12)',
        /*.fuwatto_btn_yellow:hover{ cursor: pointer; text-decoration: none; box-shadow: 0 5px 10px 0 rgba(0,0,0,0.12), 0 3px 20px 0 rgba(0,0,0,0.12), 0 5px 6px -2px rgba(0,0,0,0.2);
         */
      })
    })
    //cursor: pointer; text-decoration: none; background:#005691; transform: translate3d(0, 4px, 0); transition: .0s; border-bottom: none;
    $('#feasyModalBtn').click(function () {
      $(buttonPosition).append(
        '<section style="display: none; position: fixed; top:0;left:0;width:100%;height:100%;"id="feasyModalArea" class="feasyModalArea">\
        <iframe style="position: absolute; top: 50%; left: 50%; transform:translate(-50%,-50%); border:none; width:100%; height:100vh;" height="360" id="feasyIframe" src="http://localhost:3000"></iframe>\
        </section>'
      )
    })
  },
  fadeInModal: () => {
    $('#feasyModalArea').fadeIn()
  },
  fadeOutModal: () => {
    $('#feasyModalArea').fadeOut()
  },
  on: (func) => {
    window.addEventListener('message', (e) => {
      func(e.data)
    })
  },
  sendData: (demandData) => {
    $('#feasyIframe')[0].contentWindow.postMessage(demandData, 'http://localhost:3000')
    $('#feasyModalArea').fadeIn()
  },
}
window.feasy = feasy
