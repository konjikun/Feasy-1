const feasy = {
  buttonAppend: (buttonPosition) => {
    $(buttonPosition).append(
      '<input style="width: 10em; height:3em;" type="button" value="Feasyから入力" width=500 height=100 id="feasyModalBtn" class="feasyModalBtn">'
    )
    //$('#modalBtn').css('background-color', 'red')

    $('.feasyModalBtn').css({
      display: 'inlineblock',
      'border-color': '#99ccff #0099cc #0099cc #99ccff',
      color: '#fff',
      width: '160px',
      padding: '0.8em',
      'font-weight': 'bold',
      'border-radius': '4px',
      'box-shadow':
        '0 2px 2px 0 rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)',
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
        <iframe style="position: absolute; top: 50%; left: 50%; transform:translate(-50%,-50%); border:none; width:100%; height:100vh;" height="360" id="feasyIframe" src="https://yoshi-program.github.io/Feasy"></iframe>\
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
    $('#feasyIframe')[0].contentWindow.postMessage(
      demandData,
      'https://yoshi-program.github.io/Feasy'
    )
    $('#feasyModalArea').fadeIn()
  },
}
window.feasy = feasy
